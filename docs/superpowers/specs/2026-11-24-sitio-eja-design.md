# Sitio del Estudio Jurídico Argentino — diseño

Fecha: 2026-11-24
Estado: para aprobación del cliente

## 1. Para qué existe

El estudio no tiene sitio. Sus consultas llegan por Instagram y WhatsApp, de a una, a mano. La web tiene que hacer tres cosas y ninguna más:

1. **Dar credibilidad** a quien ya vio el Instagram y googlea el nombre antes de escribir.
2. **Llevar al turno**: hoy coordinado por WhatsApp, mañana por una app de turnos propia que está en desarrollo.
3. **Recibir consultas por mail** cuando la persona prefiere no hablar por WhatsApp.

No es un sitio para atraer tráfico nuevo: no hay presupuesto de contenido, de SEO ni de campañas. La audiencia llega desde Instagram.

### El modelo de negocio define la página

La consulta **se cobra**. Es una reunión de trabajo: se escucha, se lee la documentación, se mira el caso y la persona se va con un plan de acción. Eso se comunica explícitamente: la página vende "salís con un plan", no "consulta gratis".

**Excepción: laboral.** Los casos laborales no pasan por el turno pago; tienen otro circuito y entran directo por WhatsApp. El sitio abre esa segunda puerta sin explicar el motivo.

## 2. Objetivos

- Que una persona que llega del Instagram entienda en 10 segundos qué es el estudio y cómo se empieza.
- Que el botón de turno (WhatsApp hoy, app mañana) sea la acción más obvia de la página, en desktop y en mobile.
- Que las consultas por formulario lleguen a la casilla del estudio sin que se pierda ninguna.

## 3. Fuera de alcance

- Blog, artículos, SEO de contenidos, campañas pagas.
- Reserva de turnos dentro del sitio (vive en la app externa).
- Cobro online del arancel de la consulta (se informa antes de coordinar, se cobra por fuera).
- Panel de administración, base de datos, backend propio.
- Multi-idioma.
- Publicar dirección, mapa o perfil de Google. **Nada de ubicación**, ni texto ni mapa.

## 4. Anti-objetivos

- Que parezca una fábrica de consultas gratuitas o un portal de "abogados 24hs".
- Estética de martillo, balanza, columna griega o foto de stock de señor de traje.
- Prometer plazos de resolución de casos.
- Tono de "abogado de confianza que pelea por vos" (ruido).
- Publicar el precio de la consulta.

## 5. Restricciones

- **Sin backend.** Sitio estático, HTML/CSS/JS sin framework ni build.
- **Hosting gratuito.** GitHub Pages o equivalente, con dominio propio `eja.com.ar`.
- **Formulario sin servidor:** Web3Forms (plan gratis, 250 envíos/mes).
  Access key del formulario: `d20b759d-1a2d-44dc-baed-7145a94df4f3` (visible en el HTML por diseño).
- **Sin fotos.** No hay fotos del staff ni del estudio; el diseño no puede depender de imágenes.
- **Sin logo todavía.** Se usa una marca tipográfica: recuadro con "EJA" en serif + nombre del estudio.
- **Idioma:** español rioplatense (vos). Tono sobrio, directo, sin jerga jurídica innecesaria.
- **Navegadores:** Baseline *widely available*; sin polyfills.

## 6. Decisiones del cliente

| Tema | Decisión |
|---|---|
| Nombre | Estudio Jurídico Argentino |
| Dominio | `eja.com.ar` |
| Dirección | **No publicar ubicación**, ni barrio, ni mapa, por ahora |
| Mail público | `contacto@eja.com.ar` (a crear; hoy la casilla es `academiajuridicaok@gmail.com`) |
| Mail que recibe | Gmail actual del estudio |
| WhatsApp | 11 7741-7442 → `wa.me/5491177417442` |
| Instagram | `@estudiojuridicoargentinook` (única red) |
| Turno | Botón "Reserve su turno aquí" → **hoy WhatsApp** con mensaje prearmado; cuando la app tenga URL, se cambia una constante |
| Precio de la consulta | No aparece |
| Laboral | No pasa por turno pago: link propio a WhatsApp |
| Quiénes somos | Genérico: "staff de profesionales", sin nombres, sin matrícula, sin fotos |
| Estructura | Una sola página |
| Paleta | Aprobada la "A": papel cálido, tinta azul-grafito, bronce. (Existe variante B blanca/verde como referencia) |

### Referencia visual (fuente de verdad del diseño)

- Mockup aprobado: `mockups/eja-mockup-v2.html` (abrir con `?p=a` o `?p=b`).
- Capturas: `mockups/v2-a-full.png`, `mockups/v2-b-full.png`, `mockups/v2-a-mobile.png`.
- Los valores de la paleta A y de la tipografía están en el CSS de ese archivo; se trasladan tal cual a `assets/estilos.css` (con variables CSS en `:root`).

## 7. La página, sección por sección

1. **Header fijo.** Marca EJA + "Estudio Jurídico Argentino". Nav: Áreas · Quiénes somos · Cómo trabajamos · Contacto. Botón "Reserve su turno".
2. **Hero.** Titular: *"Primero te escuchamos. Después decidimos qué hacer."* Bajada que explica el turno y el plan de acción. CTA primario "Reserve su turno aquí" (WhatsApp prearmado) + secundario "Cómo trabajamos".
3. **Tarjeta "La consulta".** Qué se lleva de la reunión: evaluación honesta, lectura de documentación y plazos, plan de acción escrito, arancel informado antes de coordinar. Cierre: si el caso es laboral, WhatsApp.
4. **Franja de confianza.** Consulta en CABA y a distancia · respuesta el mismo día hábil · arancel informado antes de coordinar.
5. **Áreas.** Seis fichas: Penal, Laboral, Familia, Sucesiones, Civil, Comercial. La de Laboral lleva link propio "Consultanos por WhatsApp".
6. **Quiénes somos.** Staff de profesionales, cobertura de áreas, atención personal, trabajo en CABA y a distancia. Remate: *"Preferimos decirte que no hay caso antes de que pagues por uno que no existe."*
7. **Cómo trabajamos.** Cuatro pasos: reservás el turno → hablamos → definimos el plan → trabajo en marcha.
8. **Contacto.** Botón grande de turno; formulario de respaldo (nombre, WhatsApp, email, tema, consulta); `contacto@eja.com.ar`; Instagram; aviso de confidencialidad.
9. **Pie.** Nombre, mail, iconos de Instagram y WhatsApp. Sin dirección.

Además: **botón flotante de WhatsApp** en todas las vistas (pill en desktop, círculo en mobile).

**Dos puertas de WhatsApp, con mensajes distintos** (decisión del builder): el botón de turno abre
`?text=Hola, quiero reservar un turno para una consulta.` y el de laboral `?text=Hola, tengo una consulta laboral.`
Sin analytics, es la única forma de saber por qué puerta entró cada consulta.

## 8. Formulario

- **Destino de los envíos:** la casilla que hoy existe, `academiajuridicaok@gmail.com`. Web3Forms entrega ahí (cuenta creada con ese mail).
- **Dirección pública:** `contacto@eja.com.ar` se publica recién cuando el reenvío de Cloudflare esté andando. Mientras tanto el bloque de contacto muestra el Gmail. Una dirección que rebota pierde consultas, que es justo el objetivo 3.
- Campos: nombre, WhatsApp, email, tema (Penal, Familia, Sucesiones, Civil, Comercial, Otro), consulta. **Sin opción Laboral**: se deriva al WhatsApp.
- Envío por Web3Forms (`fetch` a `https://api.web3forms.com/submit`), sin recargar la página, con estado de éxito y error visibles.
- Anti-spam: honeypot de Web3Forms + verificación de tiempo mínimo de llenado (definido por el builder).
- Al enviar: mensaje de confirmación en pantalla ("Recibimos tu consulta, te escribimos el mismo día hábil").
- Sin adjuntos.

## 9. Legal y confidencialidad

- Página `privacidad.html` con política de privacidad (datos personales, finalidad, Ley 25.326, derecho de acceso/rectificación/supresión, contacto).
- **Responsable de la base:** pendiente de decisión del cliente (nombre del estudio, CUIT, o solo el mail). La ley exige identificarlo y el cliente pidió no publicar nombres ni ubicación; el texto se escribe cuando se defina.
- El texto es un modelo de buena práctica, **no asesoramiento legal**: conviene que lo revise un abogado del estudio antes de publicarlo.
- Aviso en el formulario: no enviar documentación sensible por ese medio.
- Enlace a la política en el pie y junto al botón de envío.

## 10. Técnica

- HTML semántico, CSS moderno en un solo archivo, JS mínimo en un archivo (menú mobile si hace falta, envío del formulario, contador/validación).
- Sin dependencias externas: fuentes del sistema (serif para títulos, sans del sistema para texto). Sin Google Fonts.
- Accesibilidad: contraste AA, foco visible, labels reales, `aria-live` para el estado del formulario, `prefers-reduced-motion`.
- Performance: sin imágenes, HTML liviano, objetivo de carga < 1s en 3G rápida.
- SEO básico: `title`, `description`, Open Graph, `lang="es-AR"`. Sin datos estructurados de dirección.
- Constantes en un solo lugar: `TURNO_URL`, `WHATSAPP`, `EMAIL`, `INSTAGRAM`, `WEB3FORMS_KEY`.

## 11. Archivos previstos

```
eja-web/
  index.html
  privacidad.html
  gracias.html            (opcional, o confirmación en pantalla)
  assets/
    estilos.css
    app.js
  docs/superpowers/specs/2026-11-24-sitio-eja-design.md
```

## 12. Pendiente del cliente (bloquea el deploy, no la construcción)

1. **Quién administra `eja.com.ar`** en nic.ar: hace falta para apuntar el dominio y para crear `contacto@eja.com.ar`.
2. **Cómo se crea `contacto@eja.com.ar` sin pagar buzón:** Cloudflare Email Routing. Verificado en la documentación de Cloudflare: el enrutamiento **entrante es ilimitado y gratis** en el plan Workers Free, y el reenvío a direcciones de destino verificadas (el Gmail del estudio) también es gratis. Requiere mover el DNS de `eja.com.ar` a Cloudflare (nic.ar permite delegar nameservers).
3. **Test del formulario:** mandar un envío de prueba a la casilla real para confirmar que llega y no cae en spam. Lo pide el builder antes de dar por cerrado.

## 13. Lo que queda a criterio del builder

- Redacción final de los textos dentro del tono acordado (los del mockup son la base).
- Medidas, espaciados y detalles de la paleta A.
- Cómo se construye `contacto@eja.com.ar` cuando haya DNS.
- Elección del hosting (GitHub Pages es el default por familiaridad).
- Estructura del JS del formulario y su validación.
