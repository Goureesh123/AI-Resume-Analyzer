from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from backend.app.services.semantic_matcher import (
    calculate_semantic_similarity,
)
from backend.app.utils.pdf_reader import extract_text_from_pdf
from backend.app.services.quality_analyzer import analyze_resume_quality
from backend.app.services.resume_analyzer import analyze_resume
from backend.app.services.gemini_service import (
    improve_resume,
    generate_interview_questions,
)
from backend.app.services.jd_analyzer import (
    extract_jd_skills,
    compare_skills,
    calculate_ats_score,
)
from backend.app.services.suggestion_engine import generate_suggestions


app = FastAPI(
    title="AI Resume Analyzer API",
    description="Backend API for AI-powered resume analysis",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://ai-resume-analyzer-five-liard.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
        "service": "AI Resume Analyzer Backend",
    }


@app.post("/improve-resume")
async def improve_resume_endpoint(
    file: UploadFile = File(...),
    job_description: str = Form(...),
):
    try:
        resume_text = extract_text_from_pdf(file.file)

        if not resume_text.strip():
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from the uploaded PDF.",
            )

        improved_resume = improve_resume(
            resume_text,
            job_description,
        )

        if not improved_resume:
            raise HTTPException(
                status_code=500,
                detail="Gemini returned an empty response.",
            )

        return {
            "filename": file.filename,
            "improved_resume": improved_resume,
        }

    except HTTPException:
        raise

    except Exception as error:
        print("Gemini improvement error:", repr(error))

        raise HTTPException(
            status_code=500,
            detail=f"Failed to improve resume: {str(error)}",
        )

@app.post("/generate-interview-questions")
async def generate_interview_questions_endpoint(
    file: UploadFile = File(...),
    job_description: str = Form(...),
):
    try:
        resume_text = extract_text_from_pdf(file.file)

        if not resume_text.strip():
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from the uploaded PDF.",
            )

        questions = generate_interview_questions(
            resume_text,
            job_description,
        )

        if not questions:
            raise HTTPException(
                status_code=500,
                detail="Gemini returned an empty response.",
            )

        return {
            "filename": file.filename,
            "interview_questions": questions,
        }

    except HTTPException:
        raise

    except Exception as error:
        print("Interview question generation error:", repr(error))

        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate interview questions: {str(error)}",
        )

@app.post("/analyze-resume")
async def analyze_resume_with_jd(
    file: UploadFile = File(...),
    job_description: str = Form(...),
):
    try:
        resume_text = extract_text_from_pdf(file.file)

        if not resume_text.strip():
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from the uploaded PDF.",
            )

        resume_analysis = analyze_resume(resume_text)
        resume_skills = resume_analysis["skills"]

        jd_skills = extract_jd_skills(job_description)

        comparison = compare_skills(
            resume_skills,
            jd_skills,
        )

        ats_score = calculate_ats_score(
            resume_skills,
            jd_skills,
        )

        semantic_similarity = calculate_semantic_similarity(
            resume_text,
            job_description,
        )

        quality_analysis = analyze_resume_quality(resume_text)
        quality_score = quality_analysis["quality_score"]

        overall_score = round(
            (ats_score * 0.4)
            + (semantic_similarity * 0.4)
            + (quality_score * 0.2),
            2,
        )

        suggestions = generate_suggestions(
            comparison["missing_skills"],
            ats_score,
        )

        return {
            "filename": file.filename,
            "analysis": {
                "overall_score": overall_score,
                "keyword_match_score": ats_score,
                "semantic_similarity": semantic_similarity,
                "resume_quality_score": quality_score,
            },
            "resume_skills": resume_skills,
            "job_description_skills": jd_skills,
            "comparison": comparison,
            "quality_feedback": quality_analysis["quality_feedback"],
            "suggestions": suggestions,
        }

    except HTTPException:
        raise

    except Exception as error:
        print("Resume analysis error:", repr(error))

        raise HTTPException(
            status_code=500,
            detail=f"Failed to analyze resume: {str(error)}",
        )