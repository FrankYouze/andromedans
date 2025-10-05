from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
import joblib
import pandas as pd
from sklearn.base import BaseEstimator, TransformerMixin

# ======================================================
#  Define FrequencyEncoder (must match training version)
# ======================================================


class FrequencyEncoder(BaseEstimator, TransformerMixin):
    def __init__(self):
        self.freqs = {}

    def fit(self, X, y=None):
        if isinstance(X, pd.DataFrame):
            for col in X.columns:
                self.freqs[col] = X[col].value_counts(normalize=True)
        return self

    def transform(self, X):
        X = X.copy()
        if isinstance(X, pd.DataFrame):
            for col in X.columns:
                if col in self.freqs:
                    X[col] = X[col].map(self.freqs[col]).fillna(0)
        return X.values


# ======================================================
#  Initialize FastAPI app
# ======================================================
app = FastAPI(
    title="Exoplanet Classifier API",
    description="AI/ML model for automatic exoplanet detection.",
    version="1.0"
)

# ======================================================
#  Load model
# ======================================================
MODEL_PATH = "model.pkl"

try:
    model_info = joblib.load(MODEL_PATH)
    if isinstance(model_info, dict) and "model" in model_info:
        model = model_info["model"]
        features = model_info.get("features", None)
    else:
        model = model_info
        features = None
    print(" Model loaded successfully.")
except Exception as e:
    raise RuntimeError(f"Failed to load model: {e}")

# ======================================================
#  Input schema
# ======================================================


class PredictRequest(BaseModel):
    rows: List[Dict[str, Any]]

# ======================================================
#  Prediction endpoint
# ======================================================


@app.post("/predict")
def predict(req: PredictRequest):
    try:
        df = pd.DataFrame(req.rows)

        if features is not None:
            missing = [f for f in features if f not in df.columns]
            if missing:
                raise HTTPException(
                    status_code=400, detail=f"Missing required features: {missing}")
            X = df[features]
        else:
            X = df

        preds = model.predict(X)

        if hasattr(model, "predict_proba"):
            probs = model.predict_proba(X)[:, 1]
        else:
            probs = [None] * len(preds)

        results = [
            {"prediction": int(preds[i]), "probability": float(
                probs[i]) if probs[i] is not None else None}
            for i in range(len(preds))
        ]
        return {"results": results}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
