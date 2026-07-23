import ScoreCard from "./ScoreCard";
import SkillsSection from "./SkillsSection";
import ScoreBarChart from "../charts/ScoreBarChart";

function AnalysisResults({ result, onImprove }) {
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
  onClick={() => {
    console.log("Improve button clicked");
    onImprove();
  }}
  style={{
    marginTop: "30px",
    padding: "12px 20px",
    borderRadius: "8px",
    background: "#4F46E5",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  }}
>
  ✨ Improve My Resume with AI
</button>
    </div>
  );
}

export default AnalysisResults;