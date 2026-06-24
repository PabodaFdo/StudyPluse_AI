<div align="center">

# 🎓 StudyPulse AI 🌱

<img src="https://readme-typing-svg.demolab.com?font=Inter&weight=700&size=28&duration=2500&pause=800&color=8B5CF6&center=true&vCenter=true&width=850&lines=AI-Powered+Student+Productivity+Platform;Smart+Notes+%7C+AI+Summaries+%7C+Quiz+Generator+%7C+Flashcards;Saved+PDF+Materials+%7C+My+AI+Library;Full-Stack+%2B+AI%2FML+Portfolio+Project" alt="Typing SVG" />

<br />

![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/API-Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=for-the-badge\&logo=postgresql\&logoColor=white)
![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748?style=for-the-badge\&logo=prisma\&logoColor=white)
![FastAPI](https://img.shields.io/badge/AI_Service-FastAPI-009688?style=for-the-badge\&logo=fastapi\&logoColor=white)
![Groq](https://img.shields.io/badge/AI-Groq-F55036?style=for-the-badge)
![Python](https://img.shields.io/badge/ML-Python-3776AB?style=for-the-badge\&logo=python\&logoColor=white)

<br />

**StudyPulse AI** is a full-stack, AI-powered student productivity and academic growth platform. It helps students manage subjects, create smart notes, track focus sessions, monitor academic performance, upload PDF study materials, generate AI summaries, create AI quizzes, generate flashcards, and save generated learning content inside their personal **My AI Library**.

<br />

> 🌱 Study smarter. Grow better. Bloom with StudyPulse AI.

</div>

---

## 📌 Table of Contents

* [Project Vision](#-project-vision)
* [Key Features](#-key-features)
* [AI/ML Features](#-aiml-features)
* [Tech Stack](#-tech-stack)
* [System Architecture](#-system-architecture)
* [Folder Structure](#-folder-structure)
* [Getting Started](#-getting-started)
* [Demo Login](#-demo-login)
* [Environment Variables](#-environment-variables)
* [API Overview](#-api-overview)
* [AI Study Assistant](#-ai-study-assistant)
* [My AI Library](#-my-ai-library)
* [Database Models](#-database-models)
* [Testing](#-testing)
* [Screenshots](#-screenshots)
* [Roadmap](#-roadmap)
* [Internship Value](#-internship-value)
* [What I Learned](#-what-i-learned)
* [CV Highlight](#-cv-highlight)
* [Author](#-author)
* [License](#-license)

---

## 🚀 Project Vision

Many students struggle with scattered notes, inconsistent revision habits, weak focus routines, and late awareness of academic risk.

**StudyPulse AI** solves this by combining study management, productivity tracking, academic progress monitoring, gamification, dashboard analytics, and AI-powered learning support into one student-focused platform.

The project is designed as a **Full-Stack + AI/ML portfolio project** to demonstrate practical skills in frontend development, backend API development, database design, authentication, AI service integration, PDF processing, machine learning logic, and real-world feature planning.

---

## ✨ Key Features

### 🔐 Authentication & Security

* User registration and login.
* JWT-based authentication.
* Protected frontend routes.
* Secure password hashing with bcrypt.
* Logout button with session clearing.
* Authenticated users can access only their own data.

### 📘 Subject & Study Management

* Add, update, delete, and manage academic subjects.
* Store subject details such as subject name, code, credits, target grade, and current standing.
* Connect notes, focus sessions, and academic records with subjects.

### 📚 Smart Notes

* Create, edit, delete, and organize notes.
* Group notes by subject.
* Mark notes as revised.
* Use saved Smart Notes as sources for AI summaries, quizzes, and flashcards.

### ⏱️ FocusFlow Timer

* Track focused study sessions.
* Save focus sessions by subject.
* Monitor total study time.
* Support better study consistency through focus tracking.

### 📊 Academic Records

* Add academic performance records.
* Store attendance, assignment marks, quiz marks, study hours, missed deadlines, and exam marks.
* Use academic data for risk prediction and subject health analysis.

### 🌱 Study Garden & Quests

* Gamified learning experience.
* Students earn growth points through study actions.
* Study quests encourage consistent learning habits.
* Plant progress motivates students to continue studying.

### 📈 Dashboard Analytics

* View summaries of subjects, notes, focus sessions, academic records, and study progress.
* Includes visual analytics using charts.
* Helps students understand their learning behavior.

### 🌙 Dark/Light Theme

* Supports both dark and light themes.
* Designed with a modern, responsive user interface.

---

## 🤖 AI/ML Features

StudyPulse AI includes a separate **FastAPI AI/ML service** that works together with the Node.js backend.

| Feature                   | Method                              | Status      |
| ------------------------- | ----------------------------------- | ----------- |
| Academic Risk Prediction  | Machine learning model              | ✅ Completed |
| Subject Health Score      | Rule-based scoring                  | ✅ Completed |
| Weak Topic Detection      | Machine learning / rule-based logic | ✅ Completed |
| PDF Text Extraction       | pdfplumber                          | ✅ Completed |
| Saved PDF Study Materials | PostgreSQL + Prisma                 | ✅ Completed |
| AI Summary Generation     | Groq API + fallback logic           | ✅ Completed |
| Smart Notes AI Summary    | Groq API + fallback logic           | ✅ Completed |
| AI Quiz Generation        | Groq API + fallback logic           | ✅ Completed |
| AI Flashcard Generation   | Groq API + fallback logic           | ✅ Completed |
| My AI Library             | Saved AI content in PostgreSQL      | ✅ Completed |

### 📄 PDF Text Extraction

Students can upload PDF study materials. The FastAPI service extracts text from the PDF using `pdfplumber`, and the extracted text is saved as a **Study Material** in PostgreSQL.

Saved PDF materials can be reused for:

```text
AI summary generation
AI quiz generation
AI flashcard generation
Study material preview
My AI Library
```

### 📝 AI Summary Generation

The summary generator creates structured summaries from saved PDF materials or Smart Notes.

It can return:

```text
Main summary
Important points
Key terms
Section summaries
Word count
```

### 🧠 AI Quiz Generation

The quiz generator creates interactive quizzes from saved PDF materials or Smart Notes.

It supports:

```text
Multiple-choice questions
Difficulty selection
Answer selection
Correct/wrong feedback
Answer explanations
Score tracking
Save to My AI Library
```

### 🃏 AI Flashcard Generation

The flashcard generator creates active recall flashcards from saved PDF materials or Smart Notes.

It supports:

```text
Front/back flashcards
Difficulty selection
Category labels
Flip interaction
Next/previous navigation
Shuffle mode
Known / still learning / important status
Save to My AI Library
```

### 🛡️ Fallback Support

If the Groq API is unavailable, rate-limited, or fails, the system uses fallback logic for summaries, quizzes, and flashcards. This helps the app continue working even when the external AI service is not available.

---

## 🛠️ Tech Stack

| Layer             | Technologies                                           |
| ----------------- | ------------------------------------------------------ |
| Frontend          | React, Vite, Tailwind CSS, React Router                |
| UI/UX             | Framer Motion, Lucide React, Recharts, React Hot Toast |
| Backend           | Node.js, Express.js                                    |
| Database          | PostgreSQL                                             |
| ORM               | Prisma                                                 |
| Authentication    | JWT, bcrypt                                            |
| API Communication | Axios                                                  |
| AI/ML Service     | Python, FastAPI                                        |
| AI/ML Libraries   | scikit-learn, pandas, NumPy, joblib                    |
| PDF Processing    | pdfplumber                                             |
| AI Integration    | Groq API                                               |
| Testing Tools     | Postman, FastAPI Swagger                               |
| Development Tools | VS Code / Antigravity, Git, GitHub                     |

---

## 🏗️ System Architecture

StudyPulse AI follows a multi-service architecture:

```text
React Frontend
      ↓
Node.js Express Backend
      ↓
FastAPI AI/ML Service
      ↓
PostgreSQL Database
```

The React frontend does **not** directly call the FastAPI service.

Instead:

```text
React sends request to Node.js backend
Node.js backend validates and forwards request to FastAPI
FastAPI returns AI/ML result
Node.js backend sends result back to React
```

This keeps the architecture cleaner and safer because API keys and AI service logic are not exposed to the frontend.

---

## 📂 Folder Structure

```text
StudyPluse_AI/
├── client/        # React + Vite frontend
├── server/        # Node.js + Express backend
├── ml-service/    # FastAPI AI/ML service
├── notebooks/     # Colab / Hugging Face experiment notebooks
├── docs/          # Screenshots and documentation
├── README.md
├── LICENSE
└── .gitignore
```

### Main Frontend Files

```text
client/src/pages/GenerateSummary.jsx
client/src/pages/QuizGenerator.jsx
client/src/pages/Flashcards.jsx
client/src/pages/UploadPDF.jsx
client/src/pages/AILibrary.jsx
client/src/components/Sidebar.jsx
client/src/routes/AppRoutes.jsx
```

### Main Backend Files

```text
server/src/controllers/
server/src/routes/
server/src/services/
server/prisma/schema.prisma
server/src/app.js
server/src/server.js
```

### Main AI/ML Service Files

```text
ml-service/app/main.py
ml-service/app/schemas.py
ml-service/app/services/
```

---

## 🚀 Getting Started

### Prerequisites

Install these before running the project:

```text
Node.js 18+
npm
PostgreSQL
Python 3.10+
Git
Postman
```

---

### 1. Clone the Repository

```bash
git clone https://github.com/PabodaFdo/StudyPluse_AI.git
cd StudyPluse_AI
```

---

### 2. Backend Setup

```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

If PowerShell blocks `npx`, use:

```bash
npx.cmd prisma generate
npx.cmd prisma migrate dev
npx.cmd prisma db seed
```

Backend runs at:

```text
http://localhost:5000
```

---

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

### 4. FastAPI AI/ML Service Setup

```bash
cd ml-service
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

FastAPI runs at:

```text
http://localhost:8000
```

Swagger documentation:

```text
http://localhost:8000/docs
```

---

## 🔐 Demo Login

```text
Email: demo@studypulse.ai
Password: password123
```

---

## 🔐 Environment Variables

Create `.env` files inside both the `server` and `ml-service` folders.

### `server/.env`

```env
PORT=5000
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/studypulse_ai?schema=public"
JWT_SECRET="change_this_secret"
JWT_EXPIRES_IN="7d"
CLIENT_URL="http://localhost:5173"
ML_SERVICE_URL="http://localhost:8000"
```

### `ml-service/.env`

```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.1-8b-instant
```

### Security Note

Never commit `.env` files to GitHub.

The Groq API key must stay inside:

```text
ml-service/.env
```

It should never be added to the React frontend.

---

## 🔌 API Overview

### Node.js Express Endpoints

#### Auth

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

#### Subjects

```text
GET    /api/subjects
POST   /api/subjects
GET    /api/subjects/:id
PUT    /api/subjects/:id
DELETE /api/subjects/:id
```

#### Notes

```text
GET    /api/notes
POST   /api/notes
GET    /api/notes/:id
PUT    /api/notes/:id
DELETE /api/notes/:id
```

#### AI Generation

```text
POST /api/summary/generate
POST /api/quiz/generate
POST /api/flashcards/generate
```

#### Study Materials

```text
POST   /api/study-materials
GET    /api/study-materials
GET    /api/study-materials/:id
DELETE /api/study-materials/:id
```

#### My AI Library

```text
POST   /api/ai-library/summaries
GET    /api/ai-library/summaries
GET    /api/ai-library/summaries/:id
DELETE /api/ai-library/summaries/:id

POST   /api/ai-library/quizzes
GET    /api/ai-library/quizzes
GET    /api/ai-library/quizzes/:id
DELETE /api/ai-library/quizzes/:id

POST   /api/ai-library/flashcards
GET    /api/ai-library/flashcards
GET    /api/ai-library/flashcards/:id
DELETE /api/ai-library/flashcards/:id
```

---

### FastAPI AI/ML Endpoints

```text
GET  /health
POST /predict-risk
POST /subject-health
POST /predict-weak-topic
POST /extract-pdf-text
POST /generate-summary
POST /generate-quiz
POST /generate-flashcards
```

---

## 🧠 AI Study Assistant

### Summary Flow

```text
Saved PDF Material / Smart Note
        ↓
React Generate Summary Page
        ↓
Node.js /api/summary/generate
        ↓
FastAPI /generate-summary
        ↓
Groq AI or fallback summary logic
        ↓
Display summary in React
        ↓
Save summary to My AI Library
```

### Quiz Flow

```text
Saved PDF Material / Smart Note
        ↓
React Quiz Generator Page
        ↓
Node.js /api/quiz/generate
        ↓
FastAPI /generate-quiz
        ↓
Groq AI or fallback quiz logic
        ↓
Display interactive quiz in React
        ↓
Save quiz to My AI Library
```

### Flashcard Flow

```text
Saved PDF Material / Smart Note
        ↓
React Flashcards Page
        ↓
Node.js /api/flashcards/generate
        ↓
FastAPI /generate-flashcards
        ↓
Groq AI or fallback flashcard logic
        ↓
Display interactive flashcards in React
        ↓
Save flashcard deck to My AI Library
```

---

## 📚 My AI Library

**My AI Library** is a centralized study content library where students can save and manage generated AI learning materials.

Saved content includes:

```text
Saved Summaries
Saved Quizzes
Saved Flashcard Decks
Saved PDF Study Materials
```

### My AI Library Features

```text
View saved summaries
View saved quizzes
View saved flashcard decks
View saved PDF materials
Delete saved items
Search saved content
Filter by date
Sort saved content
Dark/light theme support
```

### Filter Examples

```text
Search summaries by title, source, topic, or key term
Search quizzes by title, source, or question text
Search flashcards by title, source, category, front, or back
Search PDF materials by title, file name, or extracted content
Filter items by today, last 7 days, last 30 days, or this month
```

---

## 💾 Database Models

The PostgreSQL database is managed using Prisma ORM.

Main models include:

```text
User
Subject
Note
FocusSession
AcademicRecord
StudyGarden
GrowthActivity
StudyQuest
StudyMaterial
SavedSummary
SavedQuiz
SavedFlashcardDeck
```

### AI Library Models

#### StudyMaterial

Stores extracted PDF text and allows students to reuse uploaded PDF content for AI tools.

#### SavedSummary

Stores generated AI summaries with source type, source title, content, and word count.

#### SavedQuiz

Stores generated quiz questions, options, correct answers, explanations, source type, and word count.

#### SavedFlashcardDeck

Stores generated flashcard decks with front/back cards, categories, difficulty, source type, and word count.

---

## 🧪 Testing

### Backend Testing

The Node.js backend APIs were tested using Postman.

Tested areas include:

```text
Authentication
Protected routes
Subject CRUD
Notes CRUD
Study materials
AI Library summaries
AI Library quizzes
AI Library flashcards
Summary generation
Quiz generation
Flashcard generation
```

### FastAPI Testing

FastAPI endpoints were tested using Swagger UI.

Swagger URL:

```text
http://localhost:8000/docs
```

Tested areas include:

```text
Academic risk prediction
Subject health score
Weak topic detection
PDF text extraction
Summary generation
Quiz generation
Flashcard generation
Fallback responses
```

### Frontend Testing

Frontend testing covered:

```text
Login and logout
Protected route access
PDF upload and extraction
Saved PDF materials dropdown
Summary generation
Quiz generation
Flashcard generation
Saving generated content
My AI Library view/delete actions
My AI Library filters
Dark/light theme readability
```

---

## 🖼️ Screenshots

Add screenshots inside:

```text
docs/screenshots/
```

Recommended screenshots:

```text
dashboard.png
upload-pdf-extraction.png
generate-summary-page.png
quiz-generator-page.png
flashcards-page.png
my-ai-library.png
```

Example:

```md
![Dashboard](docs/screenshots/dashboard.png)

![Upload PDF](docs/screenshots/upload-pdf-extraction.png)

![Generate Summary](docs/screenshots/generate-summary-page.png)

![Quiz Generator](docs/screenshots/quiz-generator-page.png)

![Flashcards](docs/screenshots/flashcards-page.png)

![My AI Library](docs/screenshots/my-ai-library.png)
```

If screenshots are not added yet, this section can be updated later.

---

## 📌 Roadmap

* [x] Full-stack MVP
* [x] Authentication and protected routes
* [x] Dashboard and study management features
* [x] FastAPI AI/ML service
* [x] PDF text extraction
* [x] AI summary generation
* [x] AI quiz generation
* [x] AI flashcard generation
* [x] Saved PDF study materials
* [x] My AI Library
* [ ] Final responsive UI polish
* [ ] Deployment

---

## 💼 Internship Value

This project demonstrates practical skills in:

```text
Full-stack application development
REST API development
JWT authentication
Protected route handling
Logout/session management
PostgreSQL database design
Prisma ORM
React frontend development
Tailwind CSS UI design
Dashboard analytics
AI/ML service integration
FastAPI microservice development
PDF text extraction
Groq API integration
Fallback architecture
AI summary generation
AI quiz generation
AI flashcard generation
Saved AI content management
Search/filter/sort UI logic
Postman and Swagger testing
Git and GitHub workflow
```

---

## 🧠 What I Learned

Through this project, I practiced:

```text
Building a full-stack React + Express application
Designing database models with Prisma
Connecting PostgreSQL with a backend API
Creating protected routes with JWT
Building reusable frontend pages and services
Creating a separate FastAPI AI/ML service
Using pdfplumber for PDF text extraction
Integrating Groq API for AI-powered learning tools
Creating fallback logic for AI features
Saving extracted PDF text permanently in PostgreSQL
Saving generated summaries, quizzes, and flashcards
Building a searchable My AI Library page
Improving dark/light theme readability
Debugging frontend and backend integration issues
Documenting a full-stack AI project for portfolio use
```

---

## 📌 CV Highlight

Built **StudyPulse AI**, a full-stack AI-powered student productivity platform using React, Express.js, PostgreSQL, Prisma, and FastAPI. Integrated AI/ML features including academic risk prediction, subject health scoring, weak topic detection, PDF text extraction, Groq-powered summary, quiz, and flashcard generation, saved PDF study materials, and a searchable My AI Library for storing generated learning content.

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
