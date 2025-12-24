const ResultCard = ({ result }) => {
  const color =
    result.risk_level === "LOW"
      ? "#2ecc71"
      : result.risk_level === "MEDIUM"
      ? "#f1c40f"
      : "#e74c3c";

  return (
    <div>
      <h2>Risk Assessment</h2>
      <p><strong>Default Probability:</strong> {(result.default_probability * 100).toFixed(2)}%</p>

      <p>
        <strong>Risk Level:</strong>{" "}
        <span style={{ color, fontWeight: "bold" }}>
          {result.risk_level}
        </span>
      </p>

      <p><strong>Recommendation:</strong></p>
      <p>{result.recommended_action}</p>
    </div>
  );
};

export default ResultCard;
