# 🎓 StudyPulse AI

**AI-powered student productivity platform** — manage subjects, smart notes, focus sessions, quizzes, academic risk predictions, and gamified study progress, all in one place.

---

## Tech Stack

| Layer           | Technology                                       |
| --------------- | ------------------------------------------------ |
| **Frontend**    | React 19 · Vite · Tailwind CSS · Framer Motion   |
| **Backend**     | Node.js · Express                                |
| **ML Service**  | Python · FastAPI                                 |
| **Libraries**   | Axios · Recharts · Lucide React · React Hot Toast |

---

## Folder Structure

```
studypulse-ai/
├── client/                 # React + Vite frontend
│   └── src/
│       ├── api/            # Axios instances & API helpers
│       ├── assets/         # Static images, fonts, etc.
│       ├── components/     # Reusable UI components
│       ├── context/        # React context providers
│       ├── hooks/          # Custom React hooks
│       ├── layouts/        # Page layout wrappers
│       ├── pages/          # Route-level page components
│       ├── routes/         # React Router configuration
│       └── utils/          # Helper / utility functions
├── server/                 # Express.js backend
│   └── src/
│       ├── config/         # App configuration
│       ├── controllers/    # Route controllers
│       ├── middleware/      # Express middleware
│       ├── routes/         # Route definitions
│       ├── services/       # Business logic
│       ├── utils/          # Utility functions
│       ├── app.js          # Express app setup
│       └── server.js       # Entry point
├── ml-service/             # FastAPI ML micro-service
│   ├── app/
│   │   ├── main.py         # FastAPI app & routes
│   │   ├── schemas.py      # Pydantic schemas
│   │   └── utils.py        # Utility helpers
│   └── requirements.txt
├── docs/                   # Project documentation
├── README.md
└── .gitignore
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Python** ≥ 3.10
- **npm** (comes with Node)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/studypulse-ai.git
cd studypulse-ai
```

### 2. Run the frontend

```bash
cd client
npm install
npm run dev          # → http://localhost:5173
```

### 3. Run the backend

```bash
cd server
npm install
npm run dev          # → http://localhost:5000
```

### 4. Run the ML service

```bash
cd ml-service
python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000   # → http://localhost:8000
```

---

## Health Check Endpoints

| Service     | Endpoint          | URL                              |
| ----------- | ----------------- | -------------------------------- |
| Backend     | `GET /api/health` | `http://localhost:5000/api/health`|
| ML Service  | `GET /health`     | `http://localhost:8000/health`   |

---

## License

MIT © StudyPulse AI
