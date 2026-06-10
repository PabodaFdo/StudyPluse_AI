from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

app = FastAPI(
    title="StudyPulse ML Service",
    description="Machine learning micro-service for StudyPulse AI",
    version="0.1.0",
)

# --------------- CORS ---------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------- Health Check ---------------
@app.get("/health")
async def health_check():
    return {
        "success": True,
        "message": "StudyPulse ML service is healthy 🟢",
        "timestamp": datetime.utcnow().isoformat(),
    }
