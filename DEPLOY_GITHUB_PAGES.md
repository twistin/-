# 🚀 Guía para Desplegar en GitHub Pages

Esta guía te ayudará a desplegar tu sitio web de artista sonoro φ en GitHub Pages de manera gratuita.

## 📋 Requisitos Previos

- Una cuenta de GitHub (gratuita)
- Git instalado en tu computadora
- Node.js y pnpm instalados (para desarrollo local)

## 🔧 Paso 1: Preparar el Repositorio en GitHub

### 1.1 Crear el repositorio
1. Ve a [GitHub](https://github.com) y haz clic en "New repository"
2. Nombra tu repositorio: `phi-sound-artist`
3. Marca como "Public" (requerido para GitHub Pages gratuito)
4. **NO** inicialices con README, .gitignore o license
5. Haz clic en "Create repository"

### 1.2 Actualizar la configuración
Antes de subir el código, actualiza esta línea en `package.json`:

```json
"homepage": "https://TU-USUARIO-GITHUB.github.io/phi-sound-artist"
```

Reemplaza `TU-USUARIO-GITHUB` con tu nombre de usuario real de GitHub.

## 📤 Paso 2: Subir el Código a GitHub

### 2.1 Desde la línea de comandos
En la carpeta del proyecto, ejecuta:

```bash
# Inicializar git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Sitio web inicial del artista sonoro φ"

# Agregar el repositorio remoto (reemplaza TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/phi-sound-artist.git

# Subir a GitHub
git branch -M main
git push -u origin main
```

### 2.2 Desde GitHub Desktop (alternativa)
1. Descarga [GitHub Desktop](https://desktop.github.com/)
2. "Add an Existing Repository from your Hard Drive"
3. Selecciona la carpeta `phi-sound-artist`
4. "Publish repository" y conecta con tu repositorio creado

## ⚙️ Paso 3: Configurar GitHub Pages

### 3.1 Habilitar GitHub Pages
1. Ve a tu repositorio en GitHub
2. Haz clic en "Settings" (pestaña superior)
3. Scroll hacia abajo hasta "Pages" (menú lateral izquierdo)
4. En "Source", selecciona **"GitHub Actions"**
5. Guarda los cambios

### 3.2 El despliegue automático
- GitHub Actions se ejecutará automáticamente cada vez que hagas push a `main`
- Puedes ver el progreso en la pestaña "Actions" de tu repositorio
- El primer despliegue puede tomar 2-5 minutos

## 🌐 Paso 4: Acceder a tu Sitio

Una vez completado el despliegue:
- Tu sitio estará disponible en: `https://TU-USUARIO.github.io/phi-sound-artist`
- GitHub te mostrará la URL en la pestaña "Actions" cuando termine
- También aparecerá en Settings > Pages

## 🔄 Paso 5: Actualizar tu Sitio

Para hacer cambios en el futuro:

1. Modifica los archivos en tu copia local
2. Guarda los cambios:
   ```bash
   git add .
   git commit -m "Descripción de los cambios"
   git push
   ```
3. GitHub Pages se actualizará automáticamente en 1-3 minutos

## 🛠️ Desarrollo Local

Para trabajar localmente:

```bash
# Instalar dependencias
pnpm install

# Ejecutar servidor de desarrollo
pnpm dev

# Construir para producción (testing)
pnpm build

# Vista previa de la versión de producción
pnpm preview
```

## 🎨 Personalización

### Modificar el contenido:
- **Blog**: Edita `src/pages/Blog.tsx`
- **Trabajos**: Edita `src/pages/Works.tsx`
- **About**: Edita `src/pages/About.tsx`
- **Animación**: Modifica `src/pages/Home.tsx`

### Cambiar estilos:
- Colores y estilos: `src/index.css`
- Componentes: archivos en `src/components/`

## 🚨 Solución de Problemas

### El sitio no carga correctamente
- Verifica que la URL en `package.json` sea correcta
- Asegúrate de que GitHub Pages esté configurado con "GitHub Actions"
- Revisa los logs en la pestaña "Actions"

### Errores de build
- Verifica que no haya errores en la consola local con `pnpm build`
- Asegúrate de que todas las dependencias estén instaladas

### La animación no funciona
- Verifica que el archivo `Home.tsx` no tenga errores de sintaxis
- La animación usa Canvas API, que debe estar soportado en navegadores modernos

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en GitHub Actions
2. Verifica que el build funcione localmente
3. Asegúrate de que todas las configuraciones estén correctas

## 🎯 Resultado Final

Tu sitio web estará disponible públicamente en internet con:
- ✅ Animación φ serpenteante única
- ✅ Secciones de Blog, Trabajos y About
- ✅ Diseño responsive
- ✅ Actualizaciones automáticas con cada cambio
- ✅ Hosting gratuito en GitHub Pages

¡Disfruta tu nuevo sitio web de artista sonoro! 🎵
