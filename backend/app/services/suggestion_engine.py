def generate_suggestions(missing_skills, ats_score):
    """
    Generate resume improvement suggestions
    based on ATS score and missing skills.
    """

    suggestions = []

    # ATS score feedback
    if ats_score < 50:
        suggestions.append(
            "Your resume has a low match with the job description. "
            "Consider adding more relevant skills and keywords."
        )

    elif ats_score < 80:
        suggestions.append(
            "Your resume has a moderate match. "
            "Improve keyword alignment with the job description."
        )

    else:
        suggestions.append(
            "Your resume has a strong match with the job description."
        )


    # Missing skills feedback
    for skill in missing_skills:
        suggestions.append(
            f"Consider adding {skill} experience, projects, "
            f"or certifications if applicable."
        )


    # General improvements
    suggestions.append(
        "Highlight measurable achievements in your projects "
        "using numbers and impact statements."
    )

    suggestions.append(
        "Keep technical skills aligned with the latest industry requirements."
    )

    return suggestions