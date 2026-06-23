<div align="center">

# 🎓 StudyPulse AI 🌱

<img src="https://readme-typing-svg.demolab.com?font=Inter&weight=700&size=28&duration=2500&pause=800&color=8B5CF6&center=true&vCenter=true&width=800&lines=AI-Powered+Student+Productivity+Platform;Smart+Notes+%7C+Focus+Tracking+%7C+Study+Garden;Full-Stack+%2B+AI%2FML+Portfolio+Project" alt="Typing SVG" />

<br />

![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/API-Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![FastAPI](https://img.shields.io/badge/AI_Service-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Groq](https://img.shields.io/badge/AI-Groq-F55036?style=for-the-badge)
![Python](https://img.shields.io/badge/ML-Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

<br />

**StudyPulse AI** is a full-stack student productivity and academic growth platform that helps students manage subjects, organize smart notes, track focus sessions, monitor academic performance, extract PDF study material, and generate AI-powered study summaries.

<br />

> 🌱 Study smarter. Grow better. Bloom with StudyPulse AI.

</div>

---

## 📌 Table of Contents

- [Project Vision](#-project-vision)
- [Key Features](#-key-features)
- [AI/ML Features](#-aiml-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Overview](#-api-overview)
- [AI Summary Experiment and Final Decision](#-ai-summary-experiment-and-final-decision)
- [Testing](#-testing)
- [Screenshots](#-screenshots)
- [Internship Value](#-internship-value)
- [What I Learned](#-what-i-learned)
- [Author](#-author)

---

## 🌟 Project Vision

Many students struggle with scattered notes, weak revision habits, poor focus consistency, and late awareness of academic risk.

**StudyPulse AI** solves this by combining:

- Study management
- Productivity tracking
- Academic progress monitoring
- Gamification
- Dashboard analytics
- AI/ML-powered learning support
- PDF-based study assistance

into one modern student-focused platform.

The project is designed as a **Full-Stack + AI/ML portfolio project** to demonstrate practical software engineering, backend development, database design, machine learning integration, NLP experimentation, and AI service architecture.

---

## ✨ Key Features

### 🔐 Authentication

- User registration and login.
- JWT-based authentication.
- Protected frontend routes.
- Password hashing with bcrypt.
- Authenticated users can access only their own data.

### 📘 Subject Management

- Add, update, delete, and manage academic subjects.
- Store subject name, code, credits, target grade, current standing, status, and description.
- Connect notes, focus sessions, and academic records to subjects.

### 📚 Smart Notes

- Create, edit, delete, and organize notes.
- Group notes by subject.
- Mark notes as revised.
- Reward students with Study Garden growth points after revision.

### ⏱️ FocusFlow Timer

- Pomodoro-style focus session tracking.
- Save focus sessions by subject.
- Track total study minutes and study hours.
- Support custom focus/break timer settings.
- Reward completed focus sessions with growth points.

### 📊 Academic Records

- Add academic performance records.
- Store course code, course title, credits, grade, attendance, assignments, quizzes, study hours, missed deadlines, and exam marks.
- Support academic progress tracking.
- Used as input for academic risk and subject health features.

### 🌱 Study Garden

- Gamified student progress system.
- Students earn growth points through learning actions.
- Plant stages change based on total growth points.
- Growth activity history is stored in the database.
- Supports manual garden actions such as watering and fertilizer.

### 📈 Dashboard

- View summary of focus sessions, notes, study hours, subjects, academic records, and Study Garden progress.
- Includes charts for weekly focus overview and subject health.
- Shows Study Garden preview, academic records summary, and study quest suggestions.

### 🎯 Study Quests

- Daily and weekly study tasks.
- Designed to improve consistency and study discipline.
- Rewards students with growth points after completing quests.

---

## 🤖 AI/ML Features

StudyPulse AI includes a separate **FastAPI ML service** for AI/ML-powered features.

### ✅ Completed AI/ML Features

| Feature | Method | Status |
|---|---|---|
| Academic Risk Prediction | RandomForest model | ✅ Completed |
| Subject Health Score | Rule-based scoring | ✅ Completed |
| Weak Topic Detection | RandomForest model | ✅ Completed |
| PDF Text Extraction | pdfplumber | ✅ Completed |
| Generate Summary | Groq API + TF-IDF fallback | ✅ FastAPI completed |

### 🧠 Academic Risk Prediction

Predicts whether a student may be at low, medium, or high academic risk using study and performance-related factors.

Inputs include:

```txt
attendancePercentage
assignmentAverage
quizAverage
studyHoursPerWeek
missedDeadlines
focusSessionsCompleted
previousExamMark
```

Output includes:

```txt
riskLevel
riskScore
recommendations
```

### 📊 Subject Health Score

Calculates a subject-level health score using academic and study behavior inputs. It helps students understand whether a subject is healthy, moderate, or at risk.

### 🎯 Weak Topic Detection

Detects whether a topic is strong, moderate, or weak using topic-level study performance data.

Inputs include:

```txt
topicName
quizScore
confidenceLevel
revisionCount
timeSpentHours
lastRevisionDaysAgo
wrongAnswers
skippedQuestions
```

### 📄 PDF Text Extraction

Extracts text from uploaded PDF study materials using `pdfplumber`.

The extracted text can be used for:

```txt
Summary generation
Quiz generation
Flashcard generation
Study material preview
```

### 📝 Generate Summary

The Generate Summary feature uses:

```txt
Groq API = main AI summary generator
TF-IDF extractive summarization = fallback
```

This allows StudyPulse to generate useful study summaries while still working if the external AI API fails.

---

## 🧩 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| UI/UX | Framer Motion, Lucide React, Recharts, React Hot Toast |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | JWT, bcryptjs |
| API Communication | Axios |
| AI/ML Service | Python, FastAPI |
| ML Libraries | scikit-learn, pandas, NumPy, joblib |
| PDF Processing | pdfplumber |
| AI Summary | Groq API |
| Fallback Summary | TF-IDF using scikit-learn |
| API Testing | Postman, FastAPI Swagger |
| Development Tools | VS Code / Antigravity, Git, GitHub |
| Deployment Plan | Vercel, Render/Railway, Supabase/Neon |

---

## 🏗️ System Architecture

```txt
React Frontend
│
├── Landing Page
├── Dashboard
├── Subjects
├── Smart Notes
├── Focus Timer
├── Study Garden
├── Academic Records
├── Upload PDF
├── Generate Summary
└── AI Pages
        │
        ▼
Node.js + Express Backend
│
├── JWT Authentication
├── Protected REST APIs
├── Business Logic
├── Study Garden Points
├── Dashboard Analytics
└── Prisma Database Access
        │
        ▼
PostgreSQL Database
│
├── Users
├── Subjects
├── Notes
├── Focus Sessions
├── Academic Records
├── Study Gardens
├── Growth Activities
└── Study Quests
        │
        ▼
Python FastAPI AI/ML Service
│
├── Academic Risk Prediction
├── Subject Health Score
├── Weak Topic Detection
├── PDF Text Extraction
└── Generate Summary
        │
        ▼
AI / ML Logic
│
├── RandomForest Models
├── Rule-Based Scoring
├── pdfplumber
├── Groq API
└── TF-IDF Fallback
```

---

## 📁 Folder Structure

```txt
StudyPluse_AI/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   └── study-garden/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.js
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
├── ml-service/
│   ├── app/
│   │   ├── data/
│   │   │   ├── studypulse_academic_risk_data.csv
│   │   │   └── weak_topic_training_data.csv
│   │   ├── models/
│   │   │   ├── academic_risk_model.pkl
│   │   │   ├── risk_label_encoder.pkl
│   │   │   ├── weak_topic_model.pkl
│   │   │   └── weak_topic_label_encoder.pkl
│   │   ├── services/
│   │   │   ├── pdf_service.py
│   │   │   ├── risk_service.py
│   │   │   ├── subject_health_service.py
│   │   │   ├── summary_service.py
│   │   │   └── weak_topic_service.py
│   │   ├── main.py
│   │   ├── schemas.py
│   │   └── utils.py
│   ├── .env.example
│   └── requirements.txt
│
├── notebooks/
│   └── StudyPulse_HuggingFace_Summary_Test.ipynb
│
├── docs/
│   └── screenshots/
│
├── README.md
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

Install these before running the project:

```txt
Node.js 18+
npm
PostgreSQL
Python 3.10+
Git
Postman
```

---

## 1. Clone the Repository

```bash
git clone https://github.com/PabodaFdo/StudyPluse_AI.git
cd StudyPluse_AI
```

---

## 2. Run the Backend

Go to the backend folder:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/studypulse_ai?schema=public"
JWT_SECRET="change_this_secret"
JWT_EXPIRES_IN="7d"
CLIENT_URL="http://localhost:5173"
ML_SERVICE_URL="http://localhost:8000"
```

Run Prisma commands:

```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

Start the backend:

```bash
npm run dev
```

Backend runs at:

```txt
http://localhost:5000
```

Health check:

```txt
GET http://localhost:5000/api/health
```

---

## 3. Run the Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs at:

```txt
http://localhost:5173
```

---

## 4. Run the FastAPI ML Service

Open another terminal:

```bash
cd ml-service
```

Create and activate a virtual environment:

```bash
python -m venv venv
```

For Windows PowerShell:

```bash
.\venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside `ml-service`:

```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.1-8b-instant
```

Start FastAPI:

```bash
uvicorn app.main:app --reload --port 8000
```

FastAPI runs at:

```txt
http://localhost:8000
```

FastAPI Swagger docs:

```txt
http://localhost:8000/docs
```

---

## 🔐 Demo Login

```txt
Email: demo@studypulse.ai
Password: password123
```

---

## 🔑 Environment Variables

### Server `.env`

```env
PORT=5000
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/studypulse_ai?schema=public"
JWT_SECRET="change_this_secret"
JWT_EXPIRES_IN="7d"
CLIENT_URL="http://localhost:5173"
ML_SERVICE_URL="http://localhost:8000"
```

### ML Service `.env`

```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.1-8b-instant
```

### Important Security Note

Do not commit real `.env` files to GitHub.

The Groq API key must stay inside:

```txt
ml-service/.env
```

It should never be added to the React frontend.

---

## 📡 API Overview

### Auth

```txt
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Subjects

```txt
GET    /api/subjects
POST   /api/subjects
GET    /api/subjects/:id
PUT    /api/subjects/:id
DELETE /api/subjects/:id
```

### Notes

```txt
GET    /api/notes
POST   /api/notes
GET    /api/notes/:id
PUT    /api/notes/:id
DELETE /api/notes/:id
PATCH  /api/notes/:id/revised
```

### Focus Sessions

```txt
GET  /api/focus-sessions
POST /api/focus-sessions
GET  /api/focus-sessions/analytics
```

### Academic Records

```txt
GET    /api/academic-records
POST   /api/academic-records
PUT    /api/academic-records/:id
DELETE /api/academic-records/:id
```

### Study Garden

```txt
GET  /api/study-garden
GET  /api/study-garden/activities
POST /api/study-garden/add-points
```

### Study Quests

```txt
GET  /api/quests
POST /api/quests/complete
```

### Dashboard

```txt
GET /api/dashboard/summary
GET /api/dashboard/charts
```

---

## 🤖 FastAPI ML Service Endpoints

FastAPI Swagger documentation:

```txt
http://localhost:8000/docs
```

### Academic Risk Prediction

```txt
POST /predict-risk
```

### Subject Health Score

```txt
POST /subject-health
```

### Weak Topic Detection

```txt
POST /weak-topics
```

### PDF Text Extraction

```txt
POST /extract-pdf
```

### Generate Summary

```txt
POST /generate-summary
```

Request body:

```json
{
  "text": "extracted PDF text here"
}
```

Successful Groq response example:

```json
{
  "success": true,
  "source": "groq",
  "main_summary": "Machine learning is a branch of AI that learns patterns from data...",
  "important_points": [
    "Machine learning learns patterns from data",
    "Supervised learning uses labeled data",
    "Classification predicts categories"
  ],
  "key_terms": [
    "Machine Learning",
    "Supervised Learning",
    "Classification"
  ],
  "word_count": 34,
  "message": "Generated using Groq"
}
```

Fallback response example:

```json
{
  "success": true,
  "source": "fallback",
  "main_summary": "Machine learning is a branch of artificial intelligence that learns patterns from data...",
  "important_points": [
    "Machine learning is a branch of artificial intelligence that learns patterns from data.",
    "Supervised learning uses labeled data.",
    "Accuracy, precision, recall, and F1-score are common evaluation metrics."
  ],
  "key_terms": [
    "learning",
    "data",
    "supervised"
  ],
  "word_count": 34,
  "message": "Groq unavailable. Generated using fallback summary."
}
```

---

## 🌱 Study Garden Points System

| Action | Growth Points |
|---|---:|
| Create note | +3 |
| Mark note as revised | +5 |
| Complete focus session | +10 |
| Add academic record | +3 |
| Water plant | +15 |
| Apply fertilizer | +40 |
| Complete study quest | Custom reward |

### Plant Growth Stages

| Points | Stage |
|---:|---|
| 0–20 | Seed |
| 21–50 | Small Sprout |
| 51–100 | Growing Plant |
| 101–160 | Healthy Plant |
| 161–230 | Flower Buds |
| 231+ | Blooming Flowers |

---

## 🗄️ Database Models

Current main models:

```txt
User
Subject
Note
FocusSession
AcademicRecord
StudyGarden
GrowthActivity
StudyQuest
```

Planned AI/ML-related models:

```txt
Document
Quiz
QuizQuestion
QuizAttempt
Flashcard
RiskPrediction
WeakTopic
SubjectHealthSnapshot
MoodCheckIn
BurnoutAlert
```

---

## 📊 Current Project Status

| Module | Status |
|---|---|
| Frontend UI | ✅ Completed |
| Light/Dark Theme | ✅ Completed |
| Backend Structure | ✅ Completed |
| PostgreSQL + Prisma | ✅ Completed |
| JWT Authentication Backend | ✅ Completed |
| Frontend Authentication Integration | ✅ Completed |
| Protected Routes | ✅ Completed |
| Subjects API | ✅ Completed |
| Subjects Frontend Integration | ✅ Completed |
| Notes API | ✅ Completed |
| Smart Notes Frontend Integration | ✅ Completed |
| Focus Sessions API | ✅ Completed |
| Focus Timer Frontend Integration | ✅ Completed |
| Academic Records API | ✅ Completed |
| Academic Records Frontend Integration | ✅ Completed |
| Study Garden API | ✅ Completed |
| Study Garden Frontend Integration | ✅ Completed |
| Dashboard API | ✅ Completed |
| Dashboard Frontend Integration | ✅ Completed |
| Study Quests Integration | ✅ Completed / In Progress |
| FastAPI ML Service | ✅ Completed |
| Academic Risk Prediction | ✅ Completed |
| Subject Health Score | ✅ Completed |
| Weak Topic Detection | ✅ Completed |
| PDF Text Extraction | ✅ Completed |
| AI Summary FastAPI Endpoint | ✅ Completed |
| Groq Summary Integration | ✅ Completed |
| TF-IDF Fallback Summary | ✅ Completed |
| React Generate Summary Integration | 🟡 Next Step |
| Quiz Generation | 🟡 Planned |
| Flashcard Generation | 🟡 Planned |
| Deployment | 🟡 Planned |

---

## 🧪 AI Summary Experiment and Final Decision

The Generate Summary feature went through multiple experiments before the final implementation.

### Goal

The goal was to generate student-friendly summaries from extracted PDF text.

The summary should help students quickly understand:

```txt
Main ideas
Important study points
Key terms
Definitions
Examples
Steps or processes
```

---

### Google Colab Experiment Notebook

The Hugging Face summarization experiments were tested in Google Colab before implementation.

Notebook location:

```txt
notebooks/StudyPulse_HuggingFace_Summary_Test.ipynb
```

This notebook shows the learning and testing process before selecting the final architecture.

The notebook includes:

```txt
DistilBART summarization test
Short OOP text test
Longer machine learning text test
FLAN-T5 instruction-based test
BART summarization test
Important sentence extraction test
Comparison of summary quality
Final decision notes
```

---

### Tested Approaches

| Approach | Result | Decision |
|---|---|---|
| `sshleifer/distilbart-cnn-12-6` | Generated short summaries but missed some study details | Not selected as final main method |
| `google/flan-t5-base` | Gave very general output for some tests | Not selected |
| `facebook/bart-large-cnn` | Better than DistilBART but sometimes missed details or mixed meanings | Useful for learning, not selected as final main method |
| TF-IDF extractive summarization | More reliable because it selects important original sentences | Selected as fallback |
| Groq API | Produced better instruction-based student summaries | Selected as main AI summary method |

---

### Why Hugging Face Was Not Used as the Main Final Method

Hugging Face models worked, but during testing they sometimes:

```txt
Made the summary too short
Removed important study concepts
Missed classification, regression, or evaluation metrics in test examples
Slightly mixed meanings
Needed chunking for longer PDF text
```

This showed that normal summarization models are useful for learning and experimentation, but not always reliable enough as the only method for student study summaries.

---

### Final Decision

The final summary architecture is:

```txt
Groq API = Main AI summary generator
TF-IDF extractive summarization = Fallback method
```

This design was selected because:

```txt
Groq can generate more meaningful instruction-based summaries
TF-IDF fallback keeps the system working if Groq fails
The app does not crash when API key is missing or invalid
The fallback uses original PDF sentences, so it is more reliable
```

---

### Final Summary Flow

```txt
PDF Upload
↓
PDF Text Extraction using pdfplumber
↓
Generate Summary Request
↓
FastAPI /generate-summary
↓
Try Groq AI Summary
↓
If Groq works:
    Return main summary, important study points, and key terms
↓
If Groq fails:
    Use TF-IDF fallback summary
↓
Display result in StudyPulse Generate Summary page
```

---

### Summary Feature Testing

The `/generate-summary` endpoint was tested using FastAPI Swagger.

Swagger URL:

```txt
http://localhost:8000/docs
```

#### Test 1: Groq AI Summary

When a valid `GROQ_API_KEY` was added to the `ml-service/.env` file, the endpoint returned:

```json
{
  "success": true,
  "source": "groq",
  "message": "Generated using Groq"
}
```

This confirmed that the Groq API integration worked successfully.

#### Test 2: Fallback Summary

To test reliability, the Groq API key was temporarily changed to an invalid value.

The system did not crash. Instead, it returned:

```json
{
  "success": true,
  "source": "fallback",
  "message": "Groq unavailable. Generated using fallback summary."
}
```

This confirmed that the fallback summarization method works when Groq is unavailable.

---

### Why the Fallback Is Important

External AI APIs can fail because of:

```txt
Missing API key
Invalid API key
Quota limit
Internet issue
API downtime
Rate limit
```

The fallback ensures that the app can still return a useful basic summary instead of crashing.

---

### Important Note

This feature is designed for **portfolio and interview demonstration**.

It is not intended for large-scale production use without:

```txt
API usage monitoring
Rate limit handling
Billing setup
Security review
User data privacy review
Production deployment hardening
```

---

## 🧪 Testing

### Backend API Testing

Backend APIs were tested using Postman.

Tested areas:

```txt
Authentication
Protected routes
Subject CRUD
Notes CRUD
Focus session creation
Academic record creation
Study Garden point updates
Growth activity logs
Dashboard summary
Dashboard chart data
```

### FastAPI ML Service Testing

FastAPI endpoints were tested using Swagger UI.

Tested areas:

```txt
Academic risk prediction
Subject health score
Weak topic detection
PDF text extraction
Groq summary generation
TF-IDF fallback summary
```

### Frontend Testing

Frontend testing areas:

```txt
Login and register flow
Protected route access
Subjects page API integration
Smart Notes API integration
Focus Timer save flow
Academic Records CRUD
Study Garden growth points
Dashboard summary cards
Dark/light theme readability
```

### Planned Testing

```txt
React Generate Summary page integration
Frontend error handling testing
Responsive UI testing
Jest tests
Pytest tests for ML service
Deployment testing
```

---

## 🖼️ Screenshots

Add screenshots inside:

```txt
docs/screenshots/
```

Suggested screenshots:

```txt
Landing Page
Login Page
Dashboard
Subjects Page
Smart Notes
Focus Timer
Study Garden
Academic Records
Study Quests
PDF Text Extraction
FastAPI Groq Summary Success
FastAPI Fallback Summary Success
Generate Summary Page
```

Example README image format:

```md
![Dashboard](docs/screenshots/dashboard.png)

![Groq Summary Success](docs/screenshots/summary-groq-success.png)

![Fallback Summary Success](docs/screenshots/summary-fallback-success.png)
```

Recommended screenshot file names:

```txt
dashboard.png
upload-pdf-extraction.png
summary-groq-success.png
summary-fallback-success.png
generate-summary-page.png
```

---

## 🛣️ Roadmap

### Version 1 — Full-Stack MVP

- [x] Frontend UI
- [x] Light/Dark theme
- [x] Backend setup
- [x] PostgreSQL database
- [x] Prisma schema and migrations
- [x] JWT authentication
- [x] Protected routes
- [x] Subjects CRUD
- [x] Smart Notes CRUD
- [x] Focus session tracking
- [x] Academic records tracking
- [x] Study Garden growth points
- [x] Dashboard summary and charts
- [x] Frontend/backend API integration
- [x] Study Quests frontend/backend integration
- [ ] Final responsive UI polish
- [ ] Add screenshots to README

### Version 2 — AI/ML Service

- [x] Create FastAPI ML service
- [x] Add ML service health endpoint
- [x] Add academic risk prediction model
- [x] Add subject health score
- [x] Add weak topic detection
- [x] Add PDF text extraction
- [x] Add Generate Summary endpoint
- [x] Add Groq summary integration
- [x] Add TF-IDF fallback summary
- [ ] Connect Express backend to summary endpoint
- [ ] Connect frontend Generate Summary page

### Version 3 — AI Study Assistant

- [x] PDF upload
- [x] PDF text extraction
- [x] Summary generation backend endpoint
- [ ] Summary generation frontend integration
- [ ] Quiz generation
- [ ] Flashcard generation
- [ ] Save generated summaries
- [ ] Save generated quizzes
- [ ] Save flashcards

### Version 4 — Advanced Features

- [ ] Mood check-in analytics
- [ ] Burnout warning
- [ ] Revision reminders
- [ ] Flower/badge collection
- [ ] Report export
- [ ] Admin dashboard
- [ ] Full deployment

---

## 💼 Internship Value

This project demonstrates:

```txt
Full-stack application development
REST API development
JWT authentication
Protected route handling
Database design with Prisma
PostgreSQL integration
Frontend dashboard design
API integration with Axios
Gamification logic
Study analytics
Postman API testing
FastAPI ML microservice development
scikit-learn model integration
PDF text extraction
NLP experimentation
Groq API integration
Fallback architecture
AI/ML-ready system design
Real-world problem solving
```

---

## 🧠 What I Learned

Through this project, I practiced:

```txt
Building a full-stack React + Express application
Designing database models with Prisma
Connecting PostgreSQL with a backend API
Creating protected routes with JWT
Building dashboard analytics
Designing gamification logic
Creating a separate FastAPI ML service
Training and using RandomForest models
Using pdfplumber for PDF text extraction
Testing Hugging Face summarization models in Colab
Understanding limitations of AI summarization
Using Groq API for instruction-based AI summary generation
Creating a TF-IDF fallback system
Testing both success and failure paths
Documenting project decisions for portfolio/interview explanation
```

---

## 📌 CV Bullet

Built StudyPulse AI, a full-stack student productivity and academic growth platform with JWT authentication, subject and note management, focus session tracking, academic records, dashboard analytics, and a gamified Study Garden system using React, Express.js, PostgreSQL, Prisma, Node.js, and FastAPI. Integrated AI/ML features including academic risk prediction, subject health scoring, weak topic detection, PDF text extraction, and AI-powered summary generation using Groq with a TF-IDF fallback system.

---

## 👩‍💻 Author

**Paboda Fernando**  
BSc (Hons) Information Technology Undergraduate  
Sri Lanka Institute of Information Technology

---

## 📄 License

This project is licensed under the MIT License.

See the [LICENSE](LICENSE) file for details.

---

<div align="center">

### 🌱 Study smarter. Grow better. Bloom with StudyPulse AI.

</div>
