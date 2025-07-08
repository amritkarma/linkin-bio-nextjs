# 🌐 Link-in-Bio Frontend (Next.js)

> A modern, customizable, and fully responsive link-in-bio web app built with **Next.js**, styled using **Tailwind CSS**, and integrated with a **FastAPI** backend.

## 🌐 Frontend – Next.js

A full-featured **Link-in-Bio** platform powered by:

🖥️ **Next.js (React + TypeScript frontend)**  
⚡ Integrated with a secure and scalable [FastAPI backend](https://github.com/amritkarma/linkin-bio-fastapi)

Built for creators, influencers, and anyone who wants to manage a single profile with multiple social or promotional links.

For the full-stack version, check out the backend here:  
👉 **Backend – FastAPI**: [https://github.com/amritkarma/linkin-bio-fastapi](https://github.com/amritkarma/linkin-bio-fastapi)


---

## ✨ Features

- ✅ **Public Creator Profiles** accessible at `/username`
- ✅ **Authentication Pages**: Login & Register
- ✅ **Responsive, Mobile-First Design**
- ✅ **Smooth Animations** via Framer Motion
- ✅ **Zod + React Hook Form** for robust validation
- ✅ **Header/Footer Hidden** on public profile and link-in-bio pages
- ✅ **Dynamic Metadata Generation** for SEO
- ✅ **Per-Page Layout Customization**
- ✅ **Animated Showcase Cards** section
- ✅ **404 Error Handling** for unknown profiles
- ✅ **Dark Mode Interface** with consistent styling

---

## 🧱 Tech Stack

- [Next.js 15 (App Router)](https://nextjs.org/)
- [React 19](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Context API](https://react.dev/reference/react/useContext)

---

## 🚀 Getting Started

Follow the steps below to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/amritkarma/linkin-bio-nextjs
cd linkin-bio-nextjs
```

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install

# bun
bun install

```

```bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm dev

# bun
bun dev

```

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000 #dev
or 
NEXT_PUBLIC_API_URL=https://api.example.com #prod

```

---

## 📁 Project Highlights

- 🎨 **Minimal and Clean UI** — Focused on simplicity, usability, and modern aesthetics.
- 📱 **Fully Responsive Design** — Optimized for all devices and screen sizes.
- ⚙️ **Modern Tech Stack with Type Safety** — Built with TypeScript, Next.js 15, and Tailwind CSS 4.
- 🔗 **Dynamic Username-Based Routing** — Each profile is served via `/username`.
- 🧩 **Reusable Component Architecture** — Modular components for easy scalability and maintenance.
- 🎞️ **Framer Motion Animations** — Smooth, customizable transitions for enhanced UX.
- 📐 **Custom Layout Overrides** — Profile and public pages use unique layouts without shared headers/footers.

---

## 🔗 Backend API (FastAPI)

👉 **GitHub Repository**: [https://github.com/amritkarma/linkin-bio-fastapi](https://github.com/amritkarma/linkin-bio-fastapi)

This project uses a secure and feature-rich **FastAPI** backend with:

- 🔐 **JWT Authentication**
- 🖼️ **Profile & Avatar Management**
- 🔗 **Link CRUD** for each user
- 🌐 **Public/Private Routes** with CORS support
- 🧾 **Token-based API Authentication**

---

## 📄 License

Licensed under the [MIT License](https://github.com/amritkarma/linkin-bio-fastapi/blob/main/LICENSE.txt).  
You are free to use, modify, and distribute this project for personal or commercial purposes.

---

## 👨‍💻 Author

Crafted with care by **Amrit Vishwakarma** 🛠️  
For the full-stack version, check out:

- **Frontend**: [https://github.com/amritkarma/linkin-bio-nextjs](https://github.com/amritkarma/linkin-bio-nextjs)  
- **Backend**: [https://github.com/amritkarma/linkin-bio-fastapi](https://github.com/amritkarma/linkin-bio-fastapi)

---

## 🤝 Contributions

Pull requests and feature suggestions are welcome!  
Please open an issue to discuss any major changes beforehand.
