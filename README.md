# 🌱 EcoMarket - E-commerce de Productos Ecológicos

EcoMarket es una plataforma de **e-commerce especializada en productos ecológicos y sostenibles**, diseñada con una arquitectura moderna, escalable y flexible.

---

## 🚀 Características
- Catálogo de productos ecológicos organizados por categorías.  
- Sistema de carrito de compras y checkout.  
- Panel de administración para gestión de productos.  
- Autenticación y autorización de usuarios con JWT.  
- Reseñas y valoraciones de productos.  
- Pasarela de pago integrada (Stripe Sandbox).  
- Diseño responsive para dispositivos móviles.  

---

## 👥 Distribución de Roles
- **Rol 1: Líder Técnico / Arquitecto** → Definición de arquitectura, guías de desarrollo, revisión de código.  
- **Rol 2: Backend Lead (NestJS)** → Desarrollo de módulos, entidades y API REST.  
- **Rol 3: Frontend Lead (Angular)** → Desarrollo de interfaces, servicios y guards.  
- **Rol 4: QA / DevOps** → Pruebas unitarias, integración, CI/CD y documentación.  

---

## 🛠️ Stack Tecnológico
- **Backend:** NestJS, TypeORM, JWT, PostgreSQL.  
- **Frontend:** Angular, TypeScript, SCSS.  
- **Base de datos:** PostgreSQL.  
- **Despliegue:** GitHub Actions + entornos en la nube (Azure / Vercel / Render).  
- **CI/CD:** GitHub Actions (lint, test, build, deploy).  

---

## 📋 Prerrequisitos
- Node.js 18+  
- Angular CLI 16+  
- PostgreSQL 14+  
- Docker (opcional, para entornos locales).  
- Cuenta en un servicio cloud (Azure, Vercel o Render para despliegue).  

---

## ⚙️ Flujo de trabajo en GitHub
1. **Issues** → Cada tarea se documenta con descripción, criterios de aceptación y rama asociada.  
2. **Branches** →  
   - `main`: producción estable.  
   - `develop`: integración de features.  
   - `feature/*`: desarrollo de funcionalidades.  
   - `release/*`: preparación de versiones.  
   - `hotfix/*`: correcciones urgentes.  
3. **Pull Requests** → Se enlazan a issues (`Closes #N`).  
4. **Projects** → Tablero Kanban para gestión de Sprints.  
5. **CI/CD** → Validación automática (lint, tests y build) antes de mergear a `main`.  

---

## 📦 Instalación y ejecución local
```bash
# Clonar repositorio
git clone https://github.com/usuario/ecocommerce.git
cd ecocommerce

# Backend
cd backend
npm install
npm run start:dev

# Frontend
cd frontend
npm install
ng serve -o
