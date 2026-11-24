/* ==========================================================================
   Estudio Jurídico Argentino — comportamiento del sitio
   1. Menú mobile
   2. Puente entre la validación nativa y ARIA
   3. Envío del formulario a Web3Forms
   ========================================================================== */

/* 1. Menú mobile: se cierra al elegir una opción ------------------------- */

const menu = document.querySelector('.menu');
if (menu) {
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) menu.open = false;
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary')?.focus();
    }
  });
}

/* 2. Validación: que lo visual y lo que anuncia el lector de pantalla
      coincidan. :user-invalid es Baseline ampliamente disponible (2023). */

const anunciador = document.createElement('div');
anunciador.setAttribute('aria-live', 'polite');
anunciador.className = 'visually-hidden';
document.body.append(anunciador);

const textoHablado = (nodo) => {
  const copia = nodo.cloneNode(true);
  copia.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
  return copia.textContent.replace(/\s+/g, ' ').trim();
};

let temporizadorAnuncio;
let campoAnunciado;

const enlazarError = (el, visible) => {
  const errorId = el.dataset.error;
  if (!errorId) return;
  const ids = (el.getAttribute('aria-describedby') || '')
    .split(/\s+/)
    .filter((id) => id && id !== errorId);
  if (visible) ids.push(errorId);
  if (ids.length) el.setAttribute('aria-describedby', ids.join(' '));
  else el.removeAttribute('aria-describedby');
};

const anunciarError = (el) => {
  const error = document.getElementById(el.dataset.error);
  if (!error) return;
  const etiqueta = el.labels?.[0] ? `${textoHablado(el.labels[0])}: ` : '';
  clearTimeout(temporizadorAnuncio);
  anunciador.textContent = '';
  campoAnunciado = el;
  temporizadorAnuncio = setTimeout(() => {
    anunciador.textContent = etiqueta + textoHablado(error);
  }, 500);
};

const marcados = new WeakSet();
const yaAnunciados = new WeakSet();

const sincronizarAria = (el, anunciar = false) => {
  if (!el.matches?.('input, select, textarea')) return;
  if (el.type === 'hidden' || el.type === 'checkbox') return;
  const invalido = el.matches(':user-invalid');

  if (invalido) {
    if (anunciar && !yaAnunciados.has(el)) {
      anunciarError(el);
      yaAnunciados.add(el);
    }
    el.setAttribute('aria-invalid', 'true');
    enlazarError(el, true);
    marcados.add(el);
  } else if (marcados.has(el) || el.getAttribute('aria-invalid') !== 'true') {
    el.setAttribute('aria-invalid', 'false');
    enlazarError(el, false);
    marcados.delete(el);
    yaAnunciados.delete(el);
    if (campoAnunciado === el) {
      clearTimeout(temporizadorAnuncio);
      anunciador.textContent = '';
    }
  }
};

const form = document.getElementById('form-consulta');

if (form) {
  const campos = form.querySelectorAll('input, select, textarea');
  campos.forEach((el) => sincronizarAria(el));

  document.addEventListener('blur', (e) => sincronizarAria(e.target, true), true);
  document.addEventListener('input', (e) => {
    if (e.target.hasAttribute('aria-invalid')) sincronizarAria(e.target);
  }, true);
  document.addEventListener('change', (e) => sincronizarAria(e.target, true), true);
  document.addEventListener('invalid', (e) => {
    yaAnunciados.add(e.target);
    sincronizarAria(e.target);
  }, true);
  document.addEventListener('reset', (e) => {
    setTimeout(() => [...e.target.elements].forEach((el) => sincronizarAria(el)));
  }, true);
}

/* 3. Envío a Web3Forms ---------------------------------------------------- */

if (form) {
  const estado = document.getElementById('form-status');
  const boton = form.querySelector('button[type="submit"]');
  const textoBoton = boton?.textContent ?? 'Enviar consulta';

  const decir = (mensaje, tipo) => {
    if (!estado) return;
    estado.textContent = mensaje;
    estado.dataset.state = tipo;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Trampa para bots: si el campo oculto viene marcado, fingimos éxito.
    if (form.elements.botcheck?.checked) {
      decir('Recibimos tu consulta. Te escribimos el mismo día hábil.', 'ok');
      return;
    }

    if (!form.checkValidity()) {
      const primerInvalido = form.querySelector(':invalid');
      primerInvalido?.focus();
      decir('Revisá los campos marcados.', 'error');
      return;
    }

    const datos = Object.fromEntries(new FormData(form).entries());
    delete datos.botcheck;

    boton.disabled = true;
    boton.textContent = 'Enviando…';
    decir('Enviando tu consulta…', 'ok');

    try {
      const respuesta = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(datos)
      });
      const resultado = await respuesta.json().catch(() => ({}));

      if (respuesta.ok && resultado.success !== false) {
        form.reset();
        [...form.elements].forEach((el) => sincronizarAria(el));
        decir('Recibimos tu consulta. Te escribimos el mismo día hábil.', 'ok');
        estado?.focus?.();
      } else {
        throw new Error(resultado.message || 'Respuesta inesperada');
      }
    } catch (error) {
      decir('No pudimos enviar la consulta. Probá de nuevo o escribinos por WhatsApp al 11 7741-7442.', 'error');
    } finally {
      boton.disabled = false;
      boton.textContent = textoBoton;
    }
  });
}
