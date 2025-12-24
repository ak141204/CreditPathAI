from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import joblib

from api.schema import LoanApplication
from api.utils import risk_to_action

app = FastAPI(
    title="CreditPathAI – Loan Risk Scoring API",
    version="1.0"
)

# ✅ ADD CORS (THIS FIXES YOUR ERROR)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model
model = joblib.load("models/lightgbm_model.pkl")


@app.get("/")
def home():
    return {"message": "CreditPathAI API is running successfully 🚀"}


@app.post("/predict")
def predict_risk(data: LoanApplication):
    df = pd.DataFrame([data.dict()])
    prob = model.predict_proba(df)[0][1]
    decision = risk_to_action(prob)

    return {
        "default_probability": round(prob, 4),
        **decision
    }
