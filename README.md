# Welcome to global-medicine-frontend 👋

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)
![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwind-css&logoColor=white)

> Frontend moderno y responsivo para sistema de gestión de cursos de medicina, construido con Next.js, React 19, TypeScript y TailwindCSS.

## 📋 Descripción

Aplicación frontend de alta performance para la gestión de cursos y estudiantes, implementando las últimas tecnologías de React y Next.js. Ofrece una interfaz de usuario intuitiva, completamente responsiva y optimizada para SEO con renderizado del lado del servidor (SSR).

## 🚀 Tecnologías Utilizadas

### Framework y Bibliotecas Core
- **Next.js 16.0.1** - Framework de React para producción con SSR, SSG y optimizaciones automáticas
  - App Router para enrutamiento moderno
  - Server Components y Client Components
  - Optimización automática de imágenes y fuentes
  - API Routes integradas
- **React 19.2.0** - Biblioteca de JavaScript para construir interfaces de usuario interactivas
  - Últimas características y mejoras de rendimiento
  - Concurrent Features
  - Automatic Batching
- **React DOM 19.2.0** - Package para la manipulación del DOM con React

### Lenguaje y Tipado
- **TypeScript 5.x** - Superset de JavaScript con tipado estático
  - Detección de errores en tiempo de desarrollo
  - IntelliSense mejorado
  - Código más mantenible y escalable

### Estilos
- **TailwindCSS 4.x** - Framework CSS utility-first para diseño rápido y responsivo
  - Diseño mobile-first
  - Sistema de diseño consistente
  - Clases utilitarias optimizadas
  - Dark mode support
  - PostCSS integrado

### Gestión de Formularios
- **React Hook Form 7.66.0** - Biblioteca performante para manejo de formularios
  - Validación eficiente
  - Mínimos re-renders
  - Integración fácil con esquemas de validación
- **Yup 1.7.1** - Schema validator para JavaScript
  - Validación declarativa de formularios
  - Mensajes de error personalizables
  - Validaciones sincrónicas y asíncronas
- **@hookform/resolvers 5.2.2** - Resolvers para integrar React Hook Form con Yup

### HTTP Client
- **Axios 1.13.2** - Cliente HTTP basado en promesas
  - Interceptores para request/response
  - Manejo automático de transformación de datos
  - Protección contra CSRF

### UI Components
- **Lucide React 0.552.0** - Biblioteca de iconos moderna y ligera
  - Más de 1000 iconos consistentes
  - Totalmente personalizables
  - Tree-shakeable para bundle óptimo

### Desarrollo y Calidad
- **ESLint 9.x** - Linter para identificar y reportar patrones en código
- **eslint-config-next 16.0.1** - Configuración de ESLint optimizada para Next.js

## 📦 Instalación

```sh
npm install
# or
yarn install
# or
pnpm install
```

## 🏃 Ejecución

### Modo Desarrollo

```sh
npm run dev
# or
yarn dev
# or
pnpm dev
```

El servidor de desarrollo se iniciará en [http://localhost:3001](http://localhost:3001). La aplicación se recargará automáticamente cuando edites los archivos.

### Build de Producción

```sh
npm run build
# or
yarn build
# or
pnpm build
```

Genera una build optimizada para producción.

### Ejecutar Build de Producción

```sh
npm run start
# or
yarn start
# or
pnpm start
```

Inicia el servidor en modo producción (requiere ejecutar `build` primero).

### Linter

```sh
npm run lint
# or
yarn lint
# or
pnpm lint
```

Ejecuta ESLint para verificar la calidad del código.

## 📁 Estructura del Proyecto

```
frontend/
├── app/
│   ├── layout.tsx          # Layout principal de la aplicación
│   ├── page.tsx            # Página principal
│   ├── globals.css         # Estilos globales con Tailwind
│   ├── courses/            # Módulo de cursos
│   ├── auth/               # Módulo de autenticación
│   └── api/                # API Routes de Next.js
├── components/
│   ├── ui/                 # Componentes de UI reutilizables
│   ├── forms/              # Componentes de formularios
│   └── layout/             # Componentes de layout
├── lib/
│   ├── axios.ts            # Configuración de Axios
│   ├── validations/        # Esquemas de validación Yup
│   └── utils.ts            # Utilidades generales
├── types/
│   └── index.ts            # Tipos TypeScript compartidos
├── public/                 # Archivos estáticos
├── tailwind.config.ts      # Configuración de TailwindCSS
├── tsconfig.json           # Configuración de TypeScript
└── next.config.js          # Configuración de Next.js
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/graphql
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### TailwindCSS

El proyecto utiliza TailwindCSS 4.x con PostCSS. La configuración está en `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Personalizaciones del tema
    },
  },
  plugins: [],
}
export default config
```

## 🎨 Características Principales

- ✅ **Server-Side Rendering (SSR)** para mejor SEO y rendimiento
- ✅ **Static Site Generation (SSG)** para páginas estáticas
- ✅ **Incremental Static Regeneration (ISR)** para actualización de contenido
- ✅ **App Router** con layouts anidados y loading states
- ✅ **TypeScript** para desarrollo type-safe
- ✅ **TailwindCSS** para estilos modernos y responsivos
- ✅ **React Hook Form + Yup** para formularios validados
- ✅ **Axios** configurado con interceptores
- ✅ **Lucide Icons** para iconografía consistente
- ✅ **Optimización automática** de imágenes con next/image
- ✅ **Optimización de fuentes** con next/font (Geist)
- ✅ **ESLint** para calidad de código
- ✅ **Responsive Design** mobile-first
- ✅ **Dark Mode** support con TailwindCSS

## 🎯 Funcionalidades

### Autenticación
- Login con JWT
- Registro de usuarios
- Recuperación de contraseña
- Rutas protegidas con middleware

### Gestión de Cursos
- Listado de cursos con filtros
- Detalle de curso
- Inscripción a cursos
- Panel de usuario con cursos inscritos

### UI/UX
- Interfaz moderna y limpia
- Animaciones suaves con TailwindCSS
- Feedback visual en todas las acciones
- Loading states y skeleton screens
- Manejo de errores con mensajes claros

## 📱 Responsive Design

La aplicación está optimizada para todos los dispositivos:

- 📱 Mobile (320px - 768px)
- 📱 Tablet (768px - 1024px)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1440px+)

## 🚀 Deploy en Vercel

La forma más fácil de desplegar tu aplicación Next.js es usando [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

### Pasos para Deploy:

1. Push tu código a GitHub
2. Importa tu repositorio en Vercel
3. Vercel detectará Next.js automáticamente
4. Configura las variables de entorno
5. ¡Deploy! 🎉

Para más detalles, consulta la [documentación de deploy de Next.js](https://nextjs.org/docs/app/building-your-application/deploying).

## 📚 Recursos de Aprendizaje

- [Documentación de Next.js](https://nextjs.org/docs) - aprende sobre características y API
- [Tutorial Interactivo de Next.js](https://nextjs.org/learn) - tutorial práctico
- [Documentación de React](https://react.dev) - conceptos fundamentales de React
- [Documentación de TailwindCSS](https://tailwindcss.com/docs) - guía completa de utilidades
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - referencia de TypeScript

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 🐛 Reportar Bugs

Si encuentras un bug, por favor abre un issue en GitHub con:
- Descripción del problema
- Pasos para reproducirlo
- Comportamiento esperado vs actual
- Screenshots (si aplica)
- Información del navegador/dispositivo

## 👤 Autor

**neodevone**

* Website: https://portfolio.alyneos.com/
* Github: [@neodevone](https://github.com/neodevone)

## 📝 Licencia

Este proyecto es privado.

## ⭐ Show your support

Give a ⭐️ if this project helped you!

