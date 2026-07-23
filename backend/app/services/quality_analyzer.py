import re


def analyze_resume_quality(resume_text):
    """
    Analyze resume quality and return a score with recommendations.
    """

    score = 0
    feedback = []

    # Email
    if re.search(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", resume_text):
        score += 10
    else:
        feedback.append("Add a professional email address.")

    # Phone
    if re.search(r"(\+91[\s-]?)?[6-9]\d{9}", resume_text):
        score += 10
    else:
        feedback.append("Add a contact phone number.")

    # LinkedIn
    if "linkedin" in resume_text.lower():
        score += 10
    else:
        feedback.append("Include your LinkedIn profile.")

    # GitHub
    if "github" in resume_text.lower():
        score += 10
    else:
        feedback.append("Include your GitHub profile.")

    # Education
    if "education" in resume_text.lower():
        score += 15
    else:
        feedback.append("Add an Education section.")

    # Skills
    if "skills" in resume_text.lower():
        score += 15
    else:
        feedback.append("Add a Skills section.")

    # Projects
    if "projects" in resume_text.lower():
        score += 15
    else:
        feedback.append("Add a Projects section.")

    # Experience
    if "experience" in resume_text.lower() or "internship" in resume_text.lower():
        score += 15
    else:
        feedback.append("Add Experience or Internship details.")

    return {
        "quality_score": score,
        "quality_feedback": feedback
    }