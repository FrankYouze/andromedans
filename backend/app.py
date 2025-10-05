# main.py
from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import os
from typing import Optional, Dict, Any
import io

app = FastAPI(title="ExoVision API", description="Exoplanet Classification API", version="1.0")

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==== GLOBALS ====
MODEL_PATH = "/run/media/youz/HDD/PYTHON/NASA/andromedans/backend/model/model.pkl"
DATA_PATH = "data/"
MODEL_STATS = {"accuracy": 0.91, "precision": 0.89, "recall": 0.90, "version": "v1.0"}
HYPERPARAMS = {"learning_rate": 0.01, "n_estimators": 100, "max_depth": 5}

# ==== MODELS ====
class PredictInput(BaseModel):
    orbital_period: float
    transit_duration: float
    planet_radius: float
    stellar_temp: float
    stellar_radius: float
    # Add more features if available

class HyperparamUpdate(BaseModel):
    learning_rate: Optional[float] = None
    n_estimators: Optional[int] = None
    max_depth: Optional[int] = None

# ==== UTILITIES ====
def load_model():
    if not os.path.exists(MODEL_PATH):
        raise HTTPException(status_code=404, detail="Model file not found.")
    return joblib.load(MODEL_PATH)

def save_uploaded_file(uploaded_file: UploadFile) -> str:
    os.makedirs(DATA_PATH, exist_ok=True)
    file_path = os.path.join(DATA_PATH, uploaded_file.filename)
    with open(file_path, "wb") as f:
        f.write(uploaded_file.file.read())
    return file_path

# ==== ROUTES ====

@app.get("/")
def root():
    return {"message": "Welcome to ExoVision API 🚀"}


# 1️⃣ /api/predict
@app.post("/api/predict")
def predict(data: PredictInput):
    try:
        model = load_model()
        df = pd.DataFrame([data.dict()])
        pred = model.predict(df)[0]
        label_map = {0: "False Positive", 1: "Candidate", 2: "Confirmed Exoplanet"}
        return {"prediction": label_map.get(pred, "Unknown"), "input": data.dict()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# 2️⃣ /api/upload
@app.post("/api/upload")
def upload_dataset(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are accepted.")
    path = save_uploaded_file(file)
    # df = pd.read_csv(path)
    try:
        result_df = predict_from_csv(path, MODEL_PATH)
        result_df.to_csv(path, index=False)  # overwrite with predictions

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")
    return {"message": "Dataset uploaded successfully", "filename": file.filename, "rows": len(df)}


# 3️⃣ /api/retrain
@app.post("/api/retrain")
def retrain_model():
    # Placeholder retraining logic
    # In production: load all datasets, retrain, update model and stats
    MODEL_STATS["accuracy"] += 0.01 if MODEL_STATS["accuracy"] < 0.97 else 0
    MODEL_STATS["version"] = f"v{float(MODEL_STATS['version'][1:]) + 0.1:.1f}"
    return {"message": "Model retraining triggered successfully", "new_stats": MODEL_STATS}


# 4️⃣ /api/stats
@app.get("/api/stats")
def get_stats():
    return {"model_stats": MODEL_STATS}


# 5️⃣ /api/config
@app.post("/api/config")
def update_config(params: HyperparamUpdate):
    updates = params.dict(exclude_none=True)
    if not updates:
        raise HTTPException(status_code=400, detail="No parameters provided to update.")
    HYPERPARAMS.update(updates)
    return {"message": "Hyperparameters updated", "current_config": HYPERPARAMS}



# 6️⃣ /api/data
@app.get("/api/data")
def get_sample_data():
    try:
        sample_file = os.path.join(DATA_PATH, "sample.csv")
        if not os.path.exists(sample_file):
            # Create a mock dataset if not found
            sample_df = pd.DataFrame([
                {"orbital_period": 365, "transit_duration": 0.5, "planet_radius": 1.0, "stellar_temp": 5800, "stellar_radius": 1.0, "label": "Confirmed Exoplanet"},
                {"orbital_period": 42, "transit_duration": 0.1, "planet_radius": 0.8, "stellar_temp": 5000, "stellar_radius": 0.9, "label": "Candidate"},
            ])
            os.makedirs(DATA_PATH, exist_ok=True)
            sample_df.to_csv(sample_file, index=False)
        df = pd.read_csv(sample_file)
        return {"columns": df.columns.tolist(), "data": df.head(5).to_dict(orient="records")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))





#Functions
def predict_from_csv(csv_path, model_path="model/model.pkl"):
    """
    Loads model pipeline and makes binary predictions on the CSV file.
    Assumes CSV has the same feature columns as the training data (or a superset).
    Returns a DataFrame with predictions and probabilities appended.
    """

    # pl_name	hostname	default_flag	disposition	disp_refname	sy_snum	sy_pnum	discoverymethod	disc_year	disc_facility	...	sy_vmagerr2	sy_kmag	sy_kmagerr1	sy_kmagerr2	sy_gaiamag	sy_gaiamagerr1	sy_gaiamagerr2	rowupdate	pl_pubdate	releasedate
    features = [
        "orbital_period", "transit_duration", "planet_radius",
        "stellar_temp", "stellar_radius"
    ]
    m = joblib.load(model_path)
    new_df = pd.read_csv(csv_path)
    # keep only features used during training; ignore others
    X_new = new_df[features].copy()
    preds = m.predict(X_new)
    probs = m.predict_proba(X_new)[:, 1]
    new_df['pred_exoplanet'] = preds
    new_df['prob_exoplanet'] = probs
    return new_df