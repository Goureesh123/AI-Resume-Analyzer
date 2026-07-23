import { useState } from "react";
import jsPDF from "jspdf";

import ScoreCard from "./ScoreCard";
import SkillsSection from "./SkillsSection";
import ScoreBarChart from "../charts/ScoreBarChart";

function AnalysisResults({
  result,
  onImprove,
  improvedResume = "",
}) {
  const [copied, setCopied] = useState(false);

  const copyResume = async () => {
    if (!improvedResume) return;

    try {
      await navigator.clipboard.writeText(improvedResume);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
      alert("Unable to copy the improved resume.");
    }
  };

  const downloadPdfReport = () => {
    const pdf = new jsPDF();
    let y = 20;

    const addPageIfNeeded = (requiredSpace = 10) => {
      if (y + requiredSpace > 280) {
        pdf.addPage();
        y = 20;
      }
    };

    pdf.setFontSize(18);
    pdf.text("AI Resume Analyzer Report", 20, y);
    y += 15;

    pdf.setFontSize(12);
    pdf.text(
      `Overall Score: ${result.analysis.overall_score}%`,
      20,
      y
    );
    y += 8;

    pdf.text(
      `ATS Score: ${result.analysis.keyword_match_score}%`,
      20,
      y
    );
    y += 8;

    pdf.text(
      `Semantic Similarity: ${result.analysis.semantic_similarity}%`,
      20,
      y
    );
    y += 8;

    pdf.text(
      `Resume Quality: ${result.analysis.resume_quality_score}%`,
      20,
      y
    );
    y += 15;

    pdf.setFontSize(14);
    pdf.text("Matched Skills", 20, y);
    y += 8;

    pdf.setFontSize(11);

    const matchedSkills =
      result.comparison?.matched_skills?.join(", ") || "None";

    const matchedLines = pdf.splitTextToSize(matchedSkills, 170);
    pdf.text(matchedLines, 20, y);
    y += matchedLines.length * 6 + 10;

    addPageIfNeeded(20);

    pdf.setFontSize(14);
    pdf.text("Missing Skills", 20, y);
    y += 8;

    pdf.setFontSize(11);

    const missingSkills =
      result.comparison?.missing_skills?.join(", ") || "None";

    const missingLines = pdf.splitTextToSize(missingSkills, 170);
    pdf.text(missingLines, 20, y);
    y += missingLines.length * 6 + 10;

    addPageIfNeeded(20);

    pdf.setFontSize(14);
    pdf.text("Quality Feedback", 20, y);
    y += 8;

    pdf.setFontSize(11);

    result.quality_feedback?.forEach((feedback) => {
      const lines = pdf.splitTextToSize(`- ${feedback}`, 170);

      addPageIfNeeded(lines.length * 6 + 5);

      pdf.text(lines, 20, y);
      y += lines.length * 6 + 4;
    });

    addPageIfNeeded(20);

    pdf.setFontSize(14);
    pdf.text("Suggestions", 20, y);
    y += 8;

    pdf.setFontSize(11);

    result.suggestions?.forEach((suggestion) => {
      const lines = pdf.splitTextToSize(`- ${suggestion}`, 170);

      addPageIfNeeded(lines.length * 6 + 5);

      pdf.text(lines, 20, y);
      y += lines.length * 6 + 4;
    });

    if (improvedResume) {
      addPageIfNeeded(30);

      y += 8;

      pdf.setFontSize(14);
      pdf.text("AI Improved Resume", 20, y);
      y += 10;

      pdf.setFontSize(10);

      const improvedLines = pdf.splitTextToSize(
        improvedResume,
        170
      );

      improvedLines.forEach((line) => {
        addPageIfNeeded(7);

        pdf.text(line, 20, y);
        y += 5;
      });
    }

    pdf.save("AI_Resume_Analyzer_Report.pdf");
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Analysis Result</h2>

      <div className="results-container">
        <ScoreCard
          title="Overall Score"
          score={result.analysis.overall_score}
        />

        <ScoreCard
          title="ATS Score"
          score={result.analysis.keyword_match_score}
        />

        <ScoreCard
          title="Semantic Similarity"
          score={result.analysis.semantic_similarity}
        />

        <ScoreCard
          title="Resume Quality"
          score={result.analysis.resume_quality_score}
        />
      </div>

      <ScoreBarChart analysis={result.analysis} />

      <SkillsSection
        title="✅ Matched Skills"
        skills={result.comparison?.matched_skills || []}
        color="success"
      />

      <SkillsSection
        title="⚠️ Missing Skills"
        skills={result.comparison?.missing_skills || []}
        color="error"
      />

      <button
        type="button"
        onClick={onImprove}
        style={{
          marginTop: "30px",
          padding: "12px 20px",
          borderRadius: "8px",
          background: "#4f46e5",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        ✨ Improve My Resume with AI
      </button>

      {improvedResume && (
        <div className="section-card" style={{ marginTop: "30px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "15px",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            <h2 style={{ margin: 0 }}>
              ✨ AI Improved Resume
            </h2>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                onClick={copyResume}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  background: "#4f46e5",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                {copied ? "✅ Copied!" : "📋 Copy"}
              </button>

              <button
                type="button"
                onClick={downloadPdfReport}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  background: "#0f766e",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                📄 Download PDF
              </button>
            </div>
          </div>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontFamily: "inherit",
              lineHeight: "1.7",
              margin: 0,
            }}
          >
            {improvedResume}
          </pre>
        </div>
      )}
    </div>
  );
}

export default AnalysisResults;