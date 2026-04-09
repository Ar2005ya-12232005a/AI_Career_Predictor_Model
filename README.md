<div align="center">

# 🎯 AI Career Predictor
### Intelligent Response Orchestrator

<p>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini_API-4285F4?style=for-the-badge&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/HuggingFace-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black" />
</p>

> An AI-powered career guidance system combining a **trained ML model**, an **orchestrator service**, and the **Gemini API** to deliver refined, human-friendly career recommendations.

</div>

---

## 🚀 Overview

This project is an intelligent orchestration pipeline — it takes a user's skills, interests, and preferences, then delivers polished, professional career guidance through a multi-stage AI workflow.

```
User Input → Frontend → Orchestrator → Model Service → Gemini API → Final Response
```

---

## 🧠 How It Works

| Step | Service | Action |
|:----:|---------|--------|
| 1 | **User** | Enters skills, interests, and career preferences |
| 2 | **Frontend** | Sends request to the Orchestrator |
| 3 | **Orchestrator** | Manages workflow, routes to Model Service |
| 4 | **Model Service** | Runs trained AI model, predicts career/domain |
| 5 | **Orchestrator** | Forwards raw prediction to Gemini API |
| 6 | **Gemini API** | Refines output into a polished, human-friendly response |
| 7 | **User** | Receives a professional career recommendation ✅ |

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

## 🐳 Docker Architecture

Each service runs in its own isolated container, orchestrated via Docker Compose.

```
       ┌──────────────────────────────────────┐
       │           Docker Compose             │
       └────────────┬─────────────────────────┘
                    │
          ┌─────────┼──────────┐
          ▼         ▼          ▼
      Frontend  Orchestrator  Model
      Container  Container   Service
```

| Container | Responsibilities |
|-----------|-----------------|
| **Frontend** | Next.js / React UI rendering |
| **Orchestrator** | API routing, request management, Gemini integration |
| **Model Service** | Trained AI model, tokenizer, inference & prediction |

✅ Isolated services &nbsp;·&nbsp; ✅ Easy deployment &nbsp;·&nbsp; ✅ Production-ready &nbsp;·&nbsp; ✅ Horizontally scalable

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

## ⚙️ Getting Started

### ▶️ Run with Docker *(Recommended)*

```bash
docker-compose up --build
```

### 🛠️ Run Locally

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

### 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
MODEL_SERVICE_URL=http://model_service:5000
ORCHESTRATOR_URL=http://orchestrator:8000
```

---

## 🌟 Key Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Career Prediction** | Fine-tuned transformer model for domain classification |
| 🔀 **Orchestrator Architecture** | Clean separation of concerns with a dedicated routing layer |
| ✨ **Gemini Enhancement** | Raw predictions polished into professional, human-friendly guidance |
| 🐳 **Containerized Deployment** | Full Docker Compose setup, production-ready out of the box |
| 📦 **Modular Microservices** | Each service independently deployable and scalable |

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

*AI & Computer Vision Enthusiast · Full Stack + AI Developer · Open Source Contributor*

---

## 📄 License

This project is open source. Feel free to fork, contribute, and build on it.

---

<div align="center">
  <strong>⭐ Star this repo if you found it helpful!</strong><br/>
  <sub>Made by Arya Sankar Ram TS</sub>
</div>