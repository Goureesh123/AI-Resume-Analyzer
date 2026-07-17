def extract_jd_skills(job_description):
    """
    Extract required skills from a job description.
    """

    skills_database = [
        "Python",
        "Java",
        "JavaScript",
        "FastAPI",
        "React",
        "Node.js",
        "MongoDB",
        "SQL",
        "Machine Learning",
        "Deep Learning",
        "TensorFlow",
        "PyTorch",
        "AWS",
        "Google Cloud",
        "Docker",
        "Kubernetes",
        "Git",
        "REST API",
        "Agile"
    ]

    found_skills = []

    jd_text = job_description.lower()

    for skill in skills_database:
        if skill.lower() in jd_text:
            found_skills.append(skill)

    return found_skills


def compare_skills(resume_skills, jd_skills):
    """
    Compare resume skills with job description skills.
    """

    matched_skills = []

    missing_skills = []

    for skill in jd_skills:
        if skill in resume_skills:
            matched_skills.append(skill)
        else:
            missing_skills.append(skill)

    return {
        "matched_skills": matched_skills,
        "missing_skills": missing_skills
    }


def calculate_ats_score(resume_skills, jd_skills):
    """
    Calculate ATS compatibility score.
    """

    if len(jd_skills) == 0:
        return 0

    matched = len(set(resume_skills) & set(jd_skills))

    score = (matched / len(jd_skills)) * 100

    return round(score, 2)