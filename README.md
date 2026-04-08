# Employee Management System - Full Stack Challenge 🚀

Este proyecto es una aplicación **Full Stack** diseñada para la gestión y visualización de colaboradores, desarrollada como parte de un desafío técnico. La solución destaca por una arquitectura desacoplada, escalable y con un fuerte enfoque en la experiencia de usuario (UX).

---

## 🛠️ Tech Stack

### Frontend
* **Next.js 15 (App Router)**: Renderizado eficiente y routing moderno.
* **TypeScript**: Tipado estático para un código robusto y mantenible.
* **Zustand**: Gestión de estado global ligera y performante.
* **Ant Design (v5)**: Sistema de diseño enterprise para componentes de UI consistentes.
* **Tailwind CSS**: Estilizado rápido y responsive para layouts.

### Backend
* **Node.js & Express**: API REST escalable.
* **Arquitectura Semántica**: Organización basada en Routes & Controllers para separar la lógica de negocio de los endpoints.
* **Middleware**: Manejo de seguridad (CORS) y parseo de datos.

---

## 🏛️ Arquitectura del Proyecto
El proyecto se divide en dos entornos independientes para simular un escenario de microservicios:

### 📁 `/backend`
Implementa una API REST con persistencia en **JSON**.
* **Controllers**: Lógica de filtrado y búsqueda de empleados.
* **Routes**: Definición semántica de los recursos `/api/employees`.
* **Dev Mode**: Utiliza el flag nativo `--watch` de **Node.js 22**.

### 📁 `/frontend`
Una **SPA** (Single Page Application) moderna.
* **Store (Zustand)**: Centraliza la lógica de comunicación con la API, manejando estados de carga (*loading*), éxito y errores.
* **UI Dinámica**: Implementación de *Skeletons* para carga asíncrona y modales detallados con **Ant Design**.
* **Responsive Design**: Adaptado para una visualización óptima en diversos dispositivos.

---

## 🚀 Instalación y Uso

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/nombre-del-repo.git
cd nombre-del-repo