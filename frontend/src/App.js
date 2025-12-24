import LoanForm from "./components/LoanForm";
import ResultCard from "./components/ResultCard";
import RiskChart from "./components/RiskChart";
import { useState } from "react";
import "./index.css";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="container">
      <h1>CreditPathAI – Loan Risk Dashboard</h1>

      <div className="card">
        <LoanForm onResult={setResult} />
      </div>

      {result && (
        <>
          <div className="card">
            <ResultCard result={result} />
          </div>

          <div className="card">
            <RiskChart probability={result.default_probability} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
