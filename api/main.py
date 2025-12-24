from fastapi import FastAPI
import pandas as pd
import joblib
import os

# IMPORTANT: relative imports (this fixes your error)
from schema import LoanApplication
from utils import risk_to_action


# -------------------------------
# Initialize FastAPI app
# -------------------------------
app = FastAPI(
    title="CreditPathAI – Loan Risk Scoring API",
    version="1.0",
    description="Predicts loan default risk and provides actionable recommendations"
)


# -------------------------------
# Load trained model
# -------------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "lightgbm_model.pkl")

model = joblib.load(MODEL_PATH)


# -------------------------------
# Health check endpoint
# -------------------------------
@app.get("/")
def home():
    return {"message": "CreditPathAI API is running successfully 🚀"}


# -------------------------------
# Prediction endpoint
# -------------------------------
@app.post("/predict")
def predict_risk(data: LoanApplication):
    """
    Takes borrower data and returns:
    - default probability
    - risk category
    - recommended action
    """

    # Convert request body to DataFrame
    df = pd.DataFrame([data.dict()])

    # Predict probability of default
    prob = model.predict_proba(df)[0][1]

    # Convert probability to action
    decision = risk_to_action(prob)

    return {
        "default_probability": round(float(prob), 4),
        **decision
    }
