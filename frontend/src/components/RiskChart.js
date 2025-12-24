import Plot from "react-plotly.js";

const RiskChart = ({ probability }) => {
  return (
    <Plot
      data={[
        {
          type: "indicator",
          mode: "gauge+number",
          value: probability * 100,
          title: { text: "Default Risk (%)" },
          gauge: {
            axis: { range: [0, 100] },
            bar: { color: "#764ba2" },
            steps: [
              { range: [0, 30], color: "#2ecc71" },
              { range: [30, 60], color: "#f1c40f" },
              { range: [60, 100], color: "#e74c3c" }
            ],
          },
        },
      ]}
      layout={{ width: 450, height: 300 }}
    />
  );
};

export default RiskChart;
