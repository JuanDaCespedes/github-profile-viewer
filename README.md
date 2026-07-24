# GitHub Profile Viewer Monorepo

Solución técnica para el reto de selección construida con **NestJS 11** y **Next.js 15 App Router** utilizando **pnpm Workspaces** y **Tailwind CSS v4 (CSS-first engine)**.

---

## 📌 Perfil por Defecto

Al cargar la aplicación, el sistema consulta y visualiza automáticamente el perfil de GitHub:

```text
JuanDaCespedes
```

El usuario puede ingresar cualquier otro `username` de GitHub en la barra de búsqueda para explorar sus datos públicos y repositorios recientes.

---

## 🏛️ Arquitectura y Principios

- **Clean Architecture Ligera**: Desacoplamiento por capas (`Controller` -> `Application Service` -> `GitHub Client` -> `Mapper`).
- **Contratos de Datos Estrictos**: El backend mapea y sanitiza la respuesta pública de GitHub hacia DTOs internos (`UserProfileDto`) antes de enviarla al frontend.
- **Aislamiento del Frontend**: Next.js consume **EXCLUSIVAMENTE** el endpoint expuesto por el backend (`GET /user/:username`). Nunca consulta directamente la API de GitHub.
- **Motor Tailwind CSS v4**: Configuración CSS-first directa en `globals.css` mediante `@import "tailwindcss";` y `@custom-variant dark`.
- **Diseño Mobile-First**: Layout adaptativo responsivo con soporte para modo Claro ☀️ y Oscuro 🌙 (detección de preferencias del sistema).
- **Internacionalización (i18n)**: Soporte bilingüe (ES/EN) con detección del idioma del navegador y selector manual.

---

## 📁 Estructura del Monorepo

```text
github-profile-viewer/
├── apps/
│   ├── backend/               # Aplicación NestJS 11 (Puerto 3000)
│   │   ├── src/
│   │   │   ├── common/        # Exception Filters & Interceptors
│   │   │   ├── config/        # Configuración de variables de entorno
│   │   │   ├── modules/
│   │   │   │   └── profile/   # Controller, Service, Client, DTOs, Mappers
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── frontend/              # Aplicación Next.js 15 App Router (Puerto 3001)
│       ├── src/
│       │   ├── app/           # App Router pages & Layout
│       │   ├── components/    # Componentes de UI (ProfileCard, RepoList, SearchBar)
│       │   ├── services/      # Cliente HTTP que consume exclusivamente el Backend
│       │   ├── types/         # Contratos TypeScript Estrictos
│       │   ├── theme/         # Detección y toggle de Tema Claro/Oscuro
│       │   └── i18n/          # Diccionario e i18n Provider (ES/EN)
│       ├── Dockerfile
│       └── package.json
│
├── docker-compose.yml
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

---

## 🚀 Inicio Rápido (Desarrollo Local)

### Requisitos

- Node.js 24 LTS
- pnpm (`corepack enable`)

### 1. Instalación de Dependencias

```bash
pnpm install
```

### 2. Ejecución Local Concurrente

```bash
# Backend NestJS (Puerto 3000)
pnpm dev:backend

# Frontend Next.js (Puerto 3001)
pnpm dev:frontend
```

---

## 🐳 Despliegue con Docker

Ejecuta el monorepo completo usando Docker Compose:

```bash
docker-compose up --build
```

- **Backend API**: `http://localhost:3000/user/JuanDaCespedes`
- **Frontend App**: `http://localhost:3001`

---

## 🛡️ Controles de Seguridad Activos

- **Helmet**: Inserción de cabeceras HTTP seguras.
- **Throttler Guard**: Límite de peticiones a nivel global (30 req/min por IP).
- **Global ValidationPipe**: Filtrado de DTOs con `whitelist: true` y `forbidNonWhitelisted: true`.
- **Global Exception Filter**: Sanitización de respuestas de error sin exponer detalles internos del servidor.
