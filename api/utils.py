def risk_to_action(probability: float) -> dict:
    if probability < 0.30:
        return {
            "risk_level": "LOW",
            "recommended_action": "Standard approval. Regular EMI reminders."
        }

    elif probability < 0.60:
        return {
            "risk_level": "MEDIUM",
            "recommended_action": "Offer restructuring, shorter tenure, or higher interest."
        }

    else:
        return {
            "risk_level": "HIGH",
            "recommended_action": "Reject loan or require collateral / guarantor."
        }
