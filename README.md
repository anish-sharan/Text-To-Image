# 🎨 Text-to-Image Generator (Stable Diffusion + React + FastAPI)

## Screenshot

<p align="center">
  <img src="https://github.com/anish-sharan/Text-To-Image/blob/main/frontend/workings/Screenshot%202025-08-30%20at%203.51.19%E2%80%AFPM.png" alt="App Screenshot" width="600">
</p>


This project is a **full-stack Text-to-Image Generator** built with:

- 🖼️ **Stable Diffusion** (via Hugging Face `diffusers`)  
- ⚡ **FastAPI** backend with **ngrok** tunneling  
- 💻 **React + Tailwind** frontend  

It allows users to enter a text **prompt** and generate an AI image in real-time.

---

## 🚀 Features

- Generate high-quality AI images from text prompts  
- View generated images in history  
- Regenerate previously generated images  
- Customize image **style, quality, and dimensions**  
- Backend served via **FastAPI** + **ngrok**  
- Frontend built with **React + Tailwind CSS**  

---

## 🛠️ Tech Stack

### Backend
- [FastAPI](https://fastapi.tiangolo.com/)  
- [diffusers](https://huggingface.co/docs/diffusers/index)  
- [PyTorch](https://pytorch.org/)  
- [ngrok](https://ngrok.com/)  

### Frontend
- [React](https://react.dev/)  
- [TailwindCSS](https://tailwindcss.com/)  
- [TypeScript](https://www.typescriptlang.org/)  

---

## 📂 Project Structure

```
text-to-image/
├── backend/
│   ├── running steps in colab for cuda gpu
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.tsx
│   └── vite.config.ts
├── README.md
└── requirements.txt
```

