# 🌐 Comuni.dev (server)

**Comuni.dev** is a platform designed (non-production; **just for portifolio**) to connect developers through communities, events, and collaborative projects. It started as a portfolio project to learn and apply modern technologies such as **Terraform** and fullstack development practices.

> ⚠️ **Disclaimer:** This project is still under development and **has not been completed**. Some features may be missing or not fully functional. **Comuni.dev** server was deployed previouly but since I got charged, I decided to finish the project first then deploy it.
 
## ✨ Project Goals

- Learn and apply **Infrastructure as Code** using **Terraform**
- Build a fullstack web application
- Showcase practical skills for DevOps and fullstack development
- Provide a space where developers can:
  - Create and join communities
  - Organize tech events (meetups, hackathons, etc.)

---

## 🧱 Tech Stack

### Infrastructure

- **Terraform** – for managing cloud infrastructure (deploys everything together almost automatically)
- **Render** - for server deployment
- **Vercel** - for web-client deployment
- **Aiven** - free MySQL database

Everything is created with terraform.

### Backend

- **NestJS** – modular and Node.js framework
- **MySQL** – relational database
- **BetterAuth** – authentication system (Google & GitHub OAuth)

### Frontend

- **Next.js** – modern frontend framework with SSR and API routes
- **Tailwind CSS** – utility-first CSS for fast UI development
- **BetterAuth** – OAuth authentication on the frontend

---
