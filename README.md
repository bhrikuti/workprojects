# React + Express + PostgreSQL + JWT login

## 1. Database
createdb loginapp
psql loginapp -f backend/schema.sql

## 2. Backend
cd backend && cp .env.example .env   # edit DATABASE_URL and JWT_SECRET
npm install && npm run dev           # http://localhost:4000

## 3. Frontend
cd frontend && npm install && npm run dev   # http://localhost:5173
(Vite proxies /api to the backend, so no CORS setup is needed in dev.)
