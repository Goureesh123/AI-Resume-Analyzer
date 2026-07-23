import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is missing from the .env file.")

client = genai.Client(api_key=api_key)


def improve_resume(resume_text, job_description):
    prompt = f"""
You are an expert ATS resume writer.

Improve the following resume for the given job description.

Rules:
- Do not invent experience, projects, skills, education, or achievements.
- Improve wording and clarity.
- Add ATS-friendly keywords only when supported by the resume.
- Strengthen project and experience bullet points.
- Keep the output professional.
- Return only the improved resume text.

Resume:
{resume_text}

Job Description:
{job_description}
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
    )

    return response.text


def generate_interview_questions(resume_text, job_description):
    prompt = f"""
You are an expert technical interviewer.

Generate interview questions based only on the candidate's resume
and the provided job description.

Rules:
- Do not invent skills or experience.
- Generate exactly 10 questions.
- Include:
  - 5 technical questions
  - 3 project-based questions
  - 2 behavioral questions
- Keep questions relevant to the role.
- Return the questions in a numbered list.
- Use clear section headings.

Resume:
{resume_text}

Job Description:
{job_description}
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
    )

    return response.text