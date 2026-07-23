function Suggestions({ suggestions }) {
  return (
    <>
      <h3 style={{ marginTop: "30px" }}>
        Suggestions
      </h3>

      <ul>
        {suggestions.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export default Suggestions;