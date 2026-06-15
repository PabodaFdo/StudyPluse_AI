<div align="center">

# 🎓 StudyPulse AI 🌱

<img src="https://readme-typing-svg.demolab.com?font=Inter&weight=700&size=28&duration=2500&pause=800&color=8B5CF6&center=true&vCenter=true&width=800&lines=AI-Powered+Student+Productivity+Platform;Smart+Notes+%7C+Focus+Tracking+%7C+Study+Garden;Full-Stack+%2B+AI%2FML+Portfolio+Project" alt="Typing SVG" />

<br />

![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/API-Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=for-the-badge\&logo=postgresql\&logoColor=white)
![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748?style=for-the-badge\&logo=prisma\&logoColor=white)
![FastAPI](https://img.shields.io/badge/Planned_AI-FastAPI-009688?style=for-the-badge\&logo=fastapi\&logoColor=white)

<br />

**StudyPulse AI** is a full-stack student productivity and academic growth platform that helps students manage subjects, organize smart notes, track focus sessions, monitor academic records, view learning analytics, and grow a gamified **Study Garden** through consistent study habits.

<br />

> 🌱 Study smarter. Grow better. Bloom with StudyPulse AI.

</div>

---

## 🌟 Project Vision

Many students struggle with scattered notes, weak revision habits, poor focus consistency, and late awareness of academic risk. StudyPulse AI solves this by combining:

* Study management
* Productivity tracking
* Academic progress monitoring
* Gamification
* Dashboard analytics
* Planned AI/ML-powered learning features

into one modern student-focused platform.

---

## ✨ Key Features

### 🔐 Authentication

* User registration and login.
* JWT-based authentication.
* Protected frontend routes.
* Password hashing with bcrypt.
* Authenticated users can access only their own data.

### 📘 Subject Management

* Add, update, delete, and manage academic subjects.
* Store subject name, code, credits, target grade, current standing, status, and description.
* Connect notes, focus sessions, and academic records to subjects.

### 📚 Smart Notes

* Create, edit, delete, and organize notes.
* Group notes by subject.
* Mark notes as revised.
* Reward students with Study Garden growth points after revision.

### ⏱️ FocusFlow Timer

* Pomodoro-style focus session tracking.
* Save focus sessions by subject.
* Track total study minutes and study hours.
* Support custom focus/break timer settings.
* Reward completed focus sessions with growth points.

### 📊 Academic Records

* Add academic performance records.
* Store course code, course title, credits, grade, attendance, assignments, quizzes, study hours, missed deadlines, and exam marks.
* Support projected GPA/CGPA style calculations.
* Designed to support future academic risk prediction.

### 🌱 Study Garden

* Gamified student progress system.
* Students earn growth points through learning actions.
* Plant stages change based on total growth points.
* Growth activity history is stored in the database.
* Supports manual garden actions such as watering and fertilizer.

### 📈 Dashboard

* View summary of focus sessions, notes, study hours, subjects, academic records, and Study Garden progress.
* Includes charts for weekly focus overview and subject health.
* Shows Study Garden preview, academic records summary, and study quest suggestions.

### 🎯 Study Quests

* Planned/ongoing feature for daily and weekly study tasks.
* Designed to reward students with growth points.
* Intended to improve consistency and study discipline.

### 🤖 Planned AI/ML Features

* Academic risk prediction.
* Subject health score.
* Weak topic detection.
* PDF text extraction.
* Summary generation.
* Quiz generation.
* Flashcard generation.

---

## 🧩 Tech Stack

| Layer                    | Technology                                             |
| ------------------------ | ------------------------------------------------------ |
| Frontend                 | React, Vite, Tailwind CSS                              |
| UI/UX                    | Framer Motion, Lucide React, Recharts, React Hot Toast |
| Backend                  | Node.js, Express.js                                    |
| Database                 | PostgreSQL                                             |
| ORM                      | Prisma                                                 |
| Authentication           | JWT, bcryptjs                                          |
| API Communication        | Axios                                                  |
| API Testing              | Postman                                                |
| Planned AI/ML Service    | Python, FastAPI                                        |
| Planned ML/NLP Libraries | scikit-learn, pandas, NumPy, pdfplumber                |
| Deployment Plan          | Vercel, Render/Railway, Supabase/Neon                  |

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
├── Study Quests
└── Planned AI Pages
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
Planned Python FastAPI AI/ML Service
│
├── Academic Risk Prediction
├── PDF Text Extraction
├── Summary Generation
├── Quiz Generation
├── Flashcard Generation
├── Weak Topic Detection
└── Subject Health Score
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
│   └── planned FastAPI AI/ML service
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
Git
Postman
```

Python 3.10+ will be required later for the planned AI/ML service.

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

## 🔐 Demo Login

```txt
Email: demo@studypulse.ai
Password: password123
```

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

## 🌱 Study Garden Points System

| Action                 | Growth Points |
| ---------------------- | ------------: |
| Create note            |            +3 |
| Mark note as revised   |            +5 |
| Complete focus session |           +10 |
| Add academic record    |            +3 |
| Water plant            |           +15 |
| Apply fertilizer       |           +40 |
| Complete study quest   | Custom reward |

### Plant Growth Stages

|  Points | Stage            |
| ------: | ---------------- |
|    0–20 | Seed             |
|   21–50 | Small Sprout     |
|  51–100 | Growing Plant    |
| 101–160 | Healthy Plant    |
| 161–230 | Flower Buds      |
|    231+ | Blooming Flowers |

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

| Module                                | Status                   |
| ------------------------------------- | ------------------------ |
| Frontend UI                           | ✅ Completed              |
| Light/Dark Theme                      | ✅ Completed              |
| Backend Structure                     | ✅ Completed              |
| PostgreSQL + Prisma                   | ✅ Completed              |
| JWT Authentication Backend            | ✅ Completed              |
| Frontend Authentication Integration   | ✅ Completed              |
| Protected Routes                      | ✅ Completed              |
| Subjects API                          | ✅ Completed              |
| Subjects Frontend Integration         | ✅ Completed              |
| Notes API                             | ✅ Completed              |
| Smart Notes Frontend Integration      | ✅ Completed              |
| Focus Sessions API                    | ✅ Completed              |
| Focus Timer Frontend Integration      | ✅ Completed              |
| Academic Records API                  | ✅ Completed              |
| Academic Records Frontend Integration | ✅ Completed              |
| Study Garden API                      | ✅ Completed              |
| Study Garden Frontend Integration     | ✅ Completed              |
| Dashboard API                         | ✅ Completed              |
| Dashboard Frontend Integration        | ✅ Completed              |
| Postman API Testing                   | ✅ Completed              |
| Study Quests Integration              | 🟡 In Progress / Planned |
| Dashboard Interactivity Polish        | 🟡 In Progress           |
| AI/ML Service                         | 🟡 Planned               |
| Academic Risk Prediction              | 🟡 Planned               |
| PDF Study Assistant                   | 🟡 Planned               |
| Deployment                            | 🟡 Planned               |

---

## 🛣️ Roadmap

### Version 1 — Full-Stack MVP

* [x] Frontend UI
* [x] Light/Dark theme
* [x] Backend setup
* [x] PostgreSQL database
* [x] Prisma schema and migrations
* [x] JWT authentication
* [x] Protected routes
* [x] Subjects CRUD
* [x] Smart Notes CRUD
* [x] Focus session tracking
* [x] Academic records tracking
* [x] Study Garden growth points
* [x] Dashboard summary and charts
* [x] Frontend/backend API integration
* [ ] Study Quests frontend/backend integration
* [ ] Final responsive UI polish
* [ ] Add screenshots to README

### Version 2 — AI/ML Service

* [ ] Create FastAPI ML service
* [ ] Add ML service health endpoint
* [ ] Add rule-based academic risk prediction
* [ ] Train academic risk prediction model
* [ ] Save model using joblib
* [ ] Connect Express backend to FastAPI service
* [ ] Connect frontend Risk Prediction page
* [ ] Store risk prediction history

### Version 3 — AI Study Assistant

* [ ] PDF upload
* [ ] PDF text extraction
* [ ] Summary generation
* [ ] Quiz generation
* [ ] Flashcard generation
* [ ] Weak topic detection
* [ ] Subject health score

### Version 4 — Advanced Features

* [ ] Mood check-in analytics
* [ ] Burnout warning
* [ ] Revision reminders
* [ ] Flower/badge collection
* [ ] Report export
* [ ] Admin dashboard
* [ ] Full deployment

---

## 🤖 Planned ML Service

StudyPulse AI will use a separate Python FastAPI service for AI/ML tasks.

Planned ML architecture:

```txt
React Frontend
      ↓
Express Backend
      ↓
FastAPI ML Service
      ↓
scikit-learn / NLP Logic
```

Planned ML service folder:

```txt
ml-service/
├── app/
│   ├── main.py
│   ├── schemas.py
│   ├── services/
│   │   ├── risk_service.py
│   │   ├── pdf_service.py
│   │   ├── summary_service.py
│   │   ├── quiz_service.py
│   │   └── flashcard_service.py
│   ├── models/
│   └── data/
├── notebooks/
├── requirements.txt
└── README.md
```

### Planned Academic Risk Prediction Inputs

```txt
attendancePercentage
assignmentAverage
quizAverage
studyHoursPerWeek
missedDeadlines
focusSessionsCompleted
previousExamMark
```

### Planned Risk Output

```txt
Low Risk
Medium Risk
High Risk
```

Example response:

```json
{
  "riskLevel": "Medium Risk",
  "confidence": 0.76,
  "reasons": [
    "Attendance is below recommended level",
    "Study hours are low"
  ],
  "recommendations": [
    "Complete at least 3 focus sessions this week",
    "Revise weak subjects using flashcards"
  ]
}
```

---

## 🧪 Testing

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

Planned testing:

```txt
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
```

Example README image format:

```md
![Dashboard](docs/screenshots/dashboard.png)
```

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
AI/ML-ready architecture
Real-world problem solving
```

After completing the ML service, the project will also demonstrate:

```txt
FastAPI ML microservice development
scikit-learn model training
Academic risk prediction
PDF/NLP processing
Full Stack + AI system architecture
```

---

## 📌 CV Bullet

Built StudyPulse AI, a full-stack student productivity and academic growth platform with JWT authentication, subject and note management, focus session tracking, academic records, dashboard analytics, and a gamified Study Garden system using React, Express.js, PostgreSQL, Prisma, and Node.js, with planned FastAPI-based AI/ML features for academic risk prediction and PDF-based study assistance.

---

## 👩‍💻 Author

**Paboda Fernando**
BSc (Hons) Information Technology Undergraduate
Sri Lanka Institute of Information Technology

---

## 📄 License

This project is licensed under the MIT License.

---

### 🌱 Study smarter. Grow better. Bloom with StudyPulse AI.
