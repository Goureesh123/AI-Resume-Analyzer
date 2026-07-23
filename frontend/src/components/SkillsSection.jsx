function SkillsSection({ title, skills = [], color }) {
  return (
    <div className="section-card">
      <h2>{title}</h2>

      <div>
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <span
              key={index}
              className={`skill-tag ${
                color === "success" ? "matched" : "missing"
              }`}
            >
              {skill}
            </span>
          ))
        ) : (
          <p>No skills available.</p>
        )}
      </div>
    </div>
  );
}

export default SkillsSection;