from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def calculate_semantic_similarity(
    resume_text: str,
    job_description: str,
) -> float:
    """
    Calculate text similarity using TF-IDF and cosine similarity.
    Returns a percentage from 0 to 100.
    """

    if not resume_text.strip() or not job_description.strip():
        return 0.0

    vectorizer = TfidfVectorizer(
        stop_words="english",
        ngram_range=(1, 2),
    )

    vectors = vectorizer.fit_transform(
        [resume_text, job_description]
    )

    similarity = cosine_similarity(
        vectors[0:1],
        vectors[1:2],
    )[0][0]

    return round(float(similarity) * 100, 2)