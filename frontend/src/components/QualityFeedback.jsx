function QualityFeedback({ feedback }) {
  return (
    <>
      <h3 style={{ marginTop: "30px" }}>
        Quality Feedback
      </h3>

      <ul>
        {feedback.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export default QualityFeedback;