from utils.pdf_reader import extract_text_from_pdf
import streamlit as st

# -----------------------------
# Page Configuration
# -----------------------------
st.set_page_config(
    page_title="AI Resume Analyzer",
    page_icon="📄",
    layout="wide"
)

# -----------------------------
# Header
# -----------------------------
st.title("📄 AI Resume Analyzer")

st.write(
    "Upload your resume and compare it with a Job Description using AI."
)

st.divider()

# -----------------------------
# Resume Upload
# -----------------------------
resume_file = st.file_uploader(
    "📄 Upload Resume (PDF)",
    type=["pdf"]
)

# -----------------------------
# Job Description
# -----------------------------
job_description = st.text_area(
    "📋 Paste Job Description",
    height=200
)
# -----------------------------
# Analyze Button
# -----------------------------
analyze = st.button("🚀 Analyze Resume")

if analyze:
    if resume_file is None:
        st.warning("Please upload a resume.")

    elif job_description.strip() == "":
        st.warning("Please paste a Job Description.")

    else:
        resume_text = extract_text_from_pdf(resume_file)

        st.success("Resume uploaded successfully!")

        st.subheader("Extracted Resume Text")

        st.text_area(
            "Resume Content",
            resume_text,
            height=300
        )