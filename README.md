# Fuengirola ⇆ Algarve

Web del viaje: ruta día a día, hoteles/furgonetas y una lista de pendientes. Pensada para instalarla como "app" en el iPhone.

## Subir a GitHub Pages

1. Crea un repositorio nuevo en GitHub (puede ser privado o público).
2. Sube todos los archivos de esta carpeta (`index.html`, `styles.css`, `app.js`, `data.js`, `manifest.json`, la carpeta `icons/`) a la raíz del repo.
3. En el repo: **Settings → Pages → Branch** selecciona `main` (carpeta `/root`) y guarda.
4. En un par de minutos GitHub te da una URL tipo `https://tu-usuario.github.io/tu-repo/`.

## Añadirla al iPhone como app

1. Abre esa URL en **Safari** (tiene que ser Safari, no Chrome).
2. Toca el icono de compartir (el cuadrado con la flecha hacia arriba).
3. Elige **"Añadir a pantalla de inicio"**.
4. Listo: te aparece un icono como el de cualquier app, y al abrirla no se ve la barra de Safari.

## Editar datos del viaje

Todo el contenido (ruta, hoteles, furgonetas, sitios para comer/ver, checklist) está en `data.js`, con comentarios. Puedes editarlo directamente en GitHub (botón del lápiz sobre el archivo) sin tocar el resto del código.

## Notas

- El checklist se guarda en el propio teléfono (localStorage), no se sincroniza entre dispositivos.
- Los botones de Waze abren `waze://` si tienes la app instalada; si no, abren la web de Waze.
- Las fotos de las furgonetas se cargan directamente desde Milanuncios: si algún anuncio se cae o cambia, habrá que actualizar la URL de la imagen en `data.js`.
