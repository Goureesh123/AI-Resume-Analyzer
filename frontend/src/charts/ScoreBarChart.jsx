import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";

function ScoreBarChart({ analysis }) {
  const data = [
    {
      subject: "Overall",
      score: analysis.overall_score,
    },
    {
      subject: "ATS",
      score: analysis.keyword_match_score,
    },
    {
      subject: "Semantic",
      score: analysis.semantic_similarity,
    },
    {
      subject: "Quality",
      score: analysis.resume_quality_score,
    },
  ];

  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "18px",
        marginTop: "30px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Resume Score Comparison
      </h3>

      <ResponsiveContainer width="100%" height={420}>
        <RadarChart data={data}>
          <PolarGrid />

          <PolarAngleAxis dataKey="subject" />

          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
          />

          <Radar
            name="Score"
            dataKey="score"
            stroke="#4F46E5"
            fill="#4F46E5"
            fillOpacity={0.6}
          />

          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ScoreBarChart;