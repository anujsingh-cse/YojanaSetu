# YojanaSetu 🇮🇳

YojanaSetu is a comprehensive GovTech platform designed to bridge the gap between Indian citizens and government welfare schemes. Powered by vernacular AI and smart discovery algorithms, it simplifies the complex landscape of government initiatives.

## 🌟 Key Features

- **Smart Discovery Engine:** Scans 1000+ state and central schemes to find precise matches based on demographic and financial profiles.
- **Vernacular AI Assistant:** Context-aware chatbot supporting Hindi, Tamil, Marathi, and Telugu to explain legal jargon simply.
- **Secure Document Vault:** Upload documents once and use OCR for automated, secure application form filling.
- **Application Tracking:** Real-time tracking and offline CSC (Common Service Center) locator.

## 🏗️ Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, Framer Motion
- **Backend:** FastAPI, Python, SQLAlchemy, SQLite (for local demo)
- **AI/ML:** OpenAI Integration for Vernacular Chat

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.10+)

### 1. Backend Setup (FastAPI)
Navigate to the backend directory, install dependencies, seed the database, and start the server.

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python seed.py
uvicorn main:app --reload --port 8000
```

### 2. Frontend Setup (Next.js)
Navigate to the frontend directory, install packages, and start the development server.

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000` (or `3001` if running alongside another Next.js app), and it will communicate automatically with the backend on port `8000`.

## 📄 License
This project is for portfolio demonstration purposes.
