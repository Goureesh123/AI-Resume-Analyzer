function ScoreCard({ title, score }) {
  let colorClass = "overall";

  if (title.includes("ATS")) colorClass = "ats";
  else if (title.includes("Semantic")) colorClass = "semantic";
  else if (title.includes("Quality")) colorClass = "quality";

  return (
    <div className={`score-card ${colorClass}`}>
      <h3>{title}</h3>

      <div className="score-value">
        {score}%
      </div>

      <div className="progress">
        <div
          className="progress-fill"
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ScoreCard;