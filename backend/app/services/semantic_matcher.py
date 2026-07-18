from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# Load the model only once when the application starts
model = SentenceTransformer("all-MiniLM-L6-v2")


def calculate_semantic_similarity(resume_text, job_description):
    """
    Calculate semantic similarity between resume and job description.
    Returns a similarity percentage between 0 and 100.
    """

    embeddings = model.encode([resume_text, job_description])

    similarity = cosine_similarity(
        [embeddings[0]],
        [embeddings[1]]
    )[0][0]

    return round(float(similarity) * 100, 2)