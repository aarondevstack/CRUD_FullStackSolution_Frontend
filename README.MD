# CRUD Solution Frontend

This is the frontend application for the CRUD Fullstack Solution, built with **Refine**, **Vite**, and **Material UI**. It provides a comprehensive admin panel for managing Users, Blogs, and Comments.

## Features

- **Refine Framework**: Headless react-based framework for rapid internal tool development.
- **Material UI**: Premium component library for a consistent and professional look.
- **Resource Management**: flexible CRUD views for `users`, `blogs`, and `comments`.
- **Authentication**: Integrated with the backend JWT authentication.
- **RBAC Control**: UI elements adapt based on user roles (Admin vs User).

## Prerequisites

- **Node.js**: LTS version
- **pnpm**: Package manager

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Run Development Server

```bash
pnpm dev
```

The application will start at `http://localhost:3000`. 
API requests are proxied to the backend at `http://localhost:8888` to avoid CORS issues.

### 3. Build for Production

```bash
pnpm build
```

The output will be generated in the `dist/` directory.

## Directory Structure

- `src/pages`: Feature pages (Login, Dashboard, User/Blog/Comment lists).
- `src/components`: Reusable UI components.
- `src/providers`: Refine data and auth providers.
- `src/interfaces`: TypeScript interfaces shared with the backend DTOs.

