# 🎯 AI Career Predictor & Intelligent Response Orchestrator

> An AI-powered career guidance system combining a **trained ML model**, an **orchestrator service**, and the **Gemini API** to deliver refined, human-friendly career recommendations.

---

## 🚀 Overview

This project is built as an intelligent orchestration pipeline that takes a user's skills, interests, and preferences — then delivers polished, professional career guidance through a multi-stage AI workflow.

```
User Input → Frontend → Orchestrator → Model Service → Gemini API → Final Response
```

---

## 🧠 How It Works

| Step | Service | Action |
|------|---------|--------|
| 1 | **User** | Enters skills, interests, and career preferences |
| 2 | **Frontend** | Sends request to the Orchestrator |
| 3 | **Orchestrator** | Manages workflow, routes to Model Service |
| 4 | **Model Service** | Runs trained AI model, predicts career/domain |
| 5 | **Orchestrator** | Forwards prediction to Gemini API |
| 6 | **Gemini API** | Refines raw output into a polished response |
| 7 | **User** | Receives a professional career recommendation |

---

## 🏗️ System Architecture

```
                ┌─────────────────────┐
                │      Frontend       │
                │   Next.js / React   │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │    Orchestrator     │
                │   Request Routing   │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │   Model Service     │
                │ Career Predictor AI │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │     Gemini API      │
                │  Response Polishing │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │   Final Response    │
                └─────────────────────┘
```

---

## 📁 Folder Structure

```
VOICE-AGENT/
│
├── app/                          # Next.js app router pages
├── components/                   # Reusable UI components
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions
│
├── Python Backend/
│   ├── model_service/            # ML inference microservice
│   │   ├── career_prediction_model/
│   │   │   ├── config.json
│   │   │   ├── tokenizer.json
│   │   │   ├── tokenizer_config.json
│   │   │   ├── vocab.txt
│   │   │   ├── special_tokens_map.json
│   │   │   ├── training_args.bin
│   │   │   └── model.safetensors
│   │   ├── app.py                # Model inference API
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   │
│   └── orchestrator/             # Workflow controller service
│       ├── app.py
│       ├── Dockerfile
│       └── requirements.txt
│
├── .env                          # Environment variables
├── .gitignore
├── docker-compose.yaml           # Multi-container setup
├── Dockerfile                    # Frontend container
├── package.json
├── tailwind.config.js
└── README.md
```

---

## 🐳 Docker Architecture

Each service runs in its own isolated container, orchestrated via Docker Compose.

```
┌──────────────────────────────────────┐
│           Docker Compose             │
└────────────┬─────────────────────────┘
             │
   ┌─────────┼──────────┐
   ▼         ▼          ▼
Frontend  Orchestrator  Model Service
Container  Container    Container
```

**Container responsibilities:**

- **Frontend** — Next.js / React UI rendering
- **Orchestrator** — API routing, request management, Gemini integration
- **Model Service** — Trained AI model, tokenizer, inference logic

**Benefits:** Isolated services · Easy deployment · Production-ready · Horizontally scalable

---

## 🚀 Getting Started

### Run with Docker (Recommended)

```bash
docker-compose up --build
```

### Run Locally

**Frontend**
```bash
npm install
npm run dev
```

**Backend**
```bash
cd "Python Backend"
pip install -r requirements.txt
python app.py
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
MODEL_SERVICE_URL=http://model_service:5000
```

---

## 🌟 Key Features

- 🤖 **AI Career Prediction** — Fine-tuned transformer model for domain classification
- 🔀 **Orchestrator Architecture** — Clean separation of concerns with a dedicated routing layer
- ✨ **Gemini Response Enhancement** — Raw predictions polished into professional guidance
- 🐳 **Containerized Deployment** — Full Docker Compose setup, ready for production
- 📦 **Modular Microservices** — Each service independently deployable and scalable

---

## 🔮 Roadmap

- [ ] Voice input support
- [ ] Resume-based prediction
- [ ] AI recruiter assistant
- [ ] Personalized learning roadmap generator
- [ ] Real-time analytics dashboard

---

## 👩‍💻 Author

**Arya Sankar Ram TS**
AI & Computer Vision Enthusiast · Full Stack + AI Developer · Open Source Contributor

---

## 📄 License

This project is open source. Feel free to fork, contribute, and build on it.

---

<div align="center">
  <strong>⭐ Star this repo if you found it helpful!</strong>
</div>