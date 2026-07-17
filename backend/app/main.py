from fastapi import FastAPI, UploadFile, File, Form

from backend.app.utils.pdf_reader import extract_text_from_pdf

from backend.app.services.resume_analyzer import analyze_resume

from backend.app.services.jd_analyzer import (
    extract_jd_skills,
    compare_skills,
    calculate_ats_score
)
from backend.app.services.suggestion_engine import generate_suggestions
app = FastAPI(
    title="AI Resume Analyzer API",
    description="Backend API for AI-powered resume analysis",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "message": "AI Resume Analyzer API is running 🚀"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "AI Resume Analyzer Backend"
    }

@app.post("/analyze-resume")
async def analyze_resume_with_jd(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):

    # Extract resume text
    resume_text = extract_text_from_pdf(file.file)

    # Analyze resume
    resume_analysis = analyze_resume(resume_text)

    resume_skills = resume_analysis["skills"]

    # Extract JD skills
    jd_skills = extract_jd_skills(job_description)

    # Compare skills
    comparison = compare_skills(
        resume_skills,
        jd_skills
    )

    # Calculate ATS score
    ats_score = calculate_ats_score(
        resume_skills,
        jd_skills
    )
    suggestions = generate_suggestions(
    comparison["missing_skills"],
    ats_score
)

    return {
    "filename": file.filename,
    "ats_score": ats_score,
    "resume_skills": resume_skills,
    "job_description_skills": jd_skills,
    "comparison": comparison,
    "suggestions": suggestions
}