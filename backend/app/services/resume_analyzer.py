import re

from backend.app.data.skills import SKILLS


def extract_email(text):
    """
    Extract email address from resume text.
    """

    email_pattern = r'[\w\.-]+@[\w\.-]+'

    match = re.search(email_pattern, text)

    if match:
        return match.group()

    return None


def extract_phone(text):
    """
    Extract phone number from resume text.
    """

    phone_pattern = r'\+?\d[\d\s-]{9,}'

    match = re.search(phone_pattern, text)

    if match:
        return match.group().strip()

    return None


def extract_skills(text):
    """
    Extract technical skills from resume text.
    """

    found_skills = []

    text_lower = text.lower()

    for skill in SKILLS:
        if skill.lower() in text_lower:
            found_skills.append(skill)

    return found_skills


def analyze_resume(text):
    """
    Main resume analysis function.
    """

    return {
        "email": extract_email(text),
        "phone": extract_phone(text),
        "skills": extract_skills(text)
    }