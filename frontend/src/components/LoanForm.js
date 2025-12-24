import React, { useState } from "react";
import { predictRisk } from "../services/api";

const LoanForm = ({ onResult }) => {
  const [form, setForm] = useState({
    Age: 35,
    Income: 60000,
    LoanAmount: 15000,
    CreditScore: 680,
    MonthsEmployed: 48,
    NumCreditLines: 3,
    InterestRate: 12.5,
    LoanTerm: 36,
    DTIRatio: 0.28,
    Education: "Bachelor",
    EmploymentType: "Salaried",
    MaritalStatus: "Single",
    HasMortgage: "No",
    HasDependents: "No",
    LoanPurpose: "Car",
    HasCoSigner: "No"
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await predictRisk(form);
    onResult(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(form).map(key => (
        <div key={key}>
          <label>{key}</label>
          <input name={key} value={form[key]} onChange={handleChange} />
        </div>
      ))}
      <button type="submit">Predict Risk</button>
    </form>
  );
};

export default LoanForm;
