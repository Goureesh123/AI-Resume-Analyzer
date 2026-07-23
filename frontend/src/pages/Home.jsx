import { useEffect, useState } from "react";
import axios from "axios";
import { Upload, FileText, Sparkles } from "lucide-react";

import LoadingScreen from "../components/LoadingScreen";
import AnalysisResults from "../components/AnalysisResults";
import QualityFeedback from "../components/QualityFeedback";
import Suggestions from "../components/Suggestions";

import "../App.css";
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://ai-resume-analyzer-api-09d2.onrender.com";

function Home() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [improvedResume, setImprovedResume] = useState("");
  const [interviewQuestions, setInterviewQuestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    if (!loading) return;

    let step = 0;

    const interval = setInterval(() => {
      step += 1;
      setLoadingStep(step);

      if (step >= 5) {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [loading]);

  const analyzeResume = async () => {
    if (!file || !jobDescription.trim()) {
      alert("Please upload a resume and enter a job description.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jobDescription);

    try {
      setLoading(true);
      setLoadingStep(0);
      setResult(null);
      setImprovedResume("");
      setInterviewQuestions("");

      const response = await axios.post(
        `${API_URL}/analyze-resume`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("API Response:", response.data);
      setResult(response.data);
    } catch (error) {
      console.error("Error analyzing resume:", error);

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Response:", error.response.data);
      }

      alert("Error analyzing resume.");
    } finally {
      setLoading(false);
    }
  };

  const improveResume = async () => {
    if (!file || !jobDescription.trim()) {
      alert("Please upload a resume and enter a job description.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jobDescription);

    try {
      const response = await axios.post(
        `${API_URL}/improve-resume`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setImprovedResume(response.data.improved_resume || "");
    } catch (error) {
      console.error("Failed to improve resume:", error);
      alert("Failed to improve resume.");
    }
  };

  const generateInterviewQuestions = async () => {
    if (!file || !jobDescription.trim()) {
      alert("Please upload a resume and enter a job description.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jobDescription);

    try {
      const response = await axios.post(
        `${API_URL}/generate-interview-questions`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setInterviewQuestions(
        response.data.interview_questions || ""
      );
    } catch (error) {
      console.error(
        "Failed to generate interview questions:",
        error
      );
      alert("Failed to generate interview questions.");
    }
  };

  if (loading) {
    return <LoadingScreen loadingStep={loadingStep} />;
  }

  return (
    <div className="container">
      <h1>
        AI Resume Analyzer <Sparkles size={30} />
      </h1>

      <p className="subtitle">
        Analyze your resume against any job description using AI
      </p>

      <div className="card">
        <h2>
          <FileText size={22} />
          Upload Resume
        </h2>

        <label className="upload-box">
          <Upload size={35} />

          <span>
            {file ? file.name : "Choose PDF Resume"}
          </span>

          <input
            type="file"
            accept=".pdf"
            onChange={(event) => {
              const selectedFile = event.target.files?.[0] || null;

              setFile(selectedFile);
              setResult(null);
              setImprovedResume("");
              setInterviewQuestions("");
            }}
          />
        </label>

        <h2>Job Description</h2>

        <textarea
          placeholder="Paste job description here..."
          value={jobDescription}
          onChange={(event) => {
            setJobDescription(event.target.value);
            setResult(null);
            setImprovedResume("");
            setInterviewQuestions("");
          }}
        />

        <button
          type="button"
          onClick={analyzeResume}
          disabled={loading}
        >
          Analyze Resume
        </button>

        {result && (
          <div style={{ marginTop: "30px" }}>
            <AnalysisResults
              result={result}
              onImprove={improveResume}
              improvedResume={improvedResume}
              onGenerateInterview={generateInterviewQuestions}
              interviewQuestions={interviewQuestions}
            />

            <QualityFeedback
              feedback={result.quality_feedback || []}
            />

            <Suggestions
              suggestions={result.suggestions || []}
            />

            <details style={{ marginTop: "20px" }}>
              <summary>
                <strong>View Raw JSON</strong>
              </summary>

              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontSize: "12px",
                  marginTop: "10px",
                }}
              >
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;