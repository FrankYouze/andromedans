# 🚀 ExoVision — Intelligent Exoplanet Detection and Analysis Platform

## Product Requirements Document (PRD)

### 👥 Team Roles
- **Frontend Developer:** Builds the interactive web interface for users and scientists.  
- **Backend Developer:** Handles API endpoints, data flow, database, and model integration.  
- **AI/ML Engineer:** Develops, trains, and maintains the machine learning model using NASA exoplanet datasets.

---

## 🎯 1. Objective

Build an **AI-powered web platform** that:
- Trains on **NASA’s open-source exoplanet datasets** (Kepler, K2, TESS).  
- **Analyzes** and **classifies** celestial objects as *Confirmed Exoplanet*, *Candidate*, or *False Positive*.  
- Provides an **interactive web interface** for users to:
  - View data visualizations and model stats (accuracy, F1-score, etc.)
  - Upload new datasets or manually input parameters.
  - Retrain or fine-tune the model via adjustable hyperparameters.

---

## 🧑‍🚀 2. Target Users

- **Researchers and Scientists:** Want accurate classification and visualization tools.  
- **Students / Novices in Astronomy:** Want to experiment with real NASA data interactively.

---

## ⚙️ 3. Core Features

### A. AI / ML Features (AI Engineer)

1. **Data Ingestion and Preprocessing**
   - Use NASA datasets (Kepler, K2, TESS).
   - Handle missing values, normalization, and feature selection.
   - Label data into categories (Confirmed, Candidate, False Positive).

2. **Model Training**
   - Implement a supervised learning model (Random Forest, XGBoost, or Neural Network).
   - Optimize for metrics like **accuracy, recall, precision, F1-score**.
   - Provide a saved model (`.pkl` or `.h5`) for backend inference.

3. **Dynamic Model Update**
   - Support re-training with user-uploaded data.
   - Log and version models (e.g., v1.0, v1.1).

4. **Hyperparameter Tuning**
   - Allow frontend control of:
     - Learning rate  
     - Number of estimators  
     - Tree depth  
     - Batch size / Epochs (for neural nets)

5. **Model Performance Stats API**
   - Endpoint `/api/stats` returns current model metrics and metadata.

---

### B. Backend Features (Backend Developer)

1. **Architecture**
   - Framework: **FastAPI** or **Flask**
   - Database: **PostgreSQL** or **MongoDB**
   - ML Integration: Serve model using `joblib` or `TensorFlow Serving`
   - File Storage: Local storage or AWS S3 for user-uploaded datasets

2. **API Endpoints**

   | Endpoint | Method | Description |
   |-----------|--------|-------------|
   | `/api/predict` | POST | Predict classification for given input or dataset |
   | `/api/upload` | POST | Upload new datasets for retraining |
   | `/api/retrain` | POST | Trigger model retraining |
   | `/api/stats` | GET | Fetch model accuracy and metrics |
   | `/api/config` | POST | Update hyperparameters |
   | `/api/data` | GET | Return sample dataset or recent predictions |

3. **Security**
   - Validate uploads (CSV only, size limit 10MB)
   - Sanitize inputs and prevent code injection
   - Enable CORS for frontend integration
   - Implement rate limiting for public APIs

4. **Model Lifecycle**
   - Load model at startup and refresh after retraining
   - Store metadata: version, accuracy, training date

---

### C. Frontend Features (Frontend Developer)

1. **User Interface**
   - Framework: **React** (Vite or Next.js)
   - Style: **Tailwind CSS**
   - Theme: Space-themed (dark blue, white, gray tones)

2. **Core Pages**
   - **Dashboard:**  
     Displays current model stats, recent predictions, and accuracy chart.  
   - **Data Upload Page:**  
     Upload CSVs or input single object data manually.  
   - **Model Performance Page:**  
     Interactive charts for accuracy, recall, and confusion matrix.  
   - **Model Tuning Page:**  
     Slider controls for hyperparameters with retrain trigger.  
   - **Prediction Page:**  
     Input fields for exoplanet parameters → instant classification result.

3. **Components**
   - Stat cards for accuracy and model version
   - Data tables for dataset previews
   - Chart.js or Recharts visualizations
   - Loading and status modals for retraining progress

4. **Integration**
   - Consume backend APIs using **Axios**
   - WebSocket support for real-time retraining progress (optional)

---

## 🧱 4. Technical Stack Summary

| Layer | Technology | Purpose |
|-------|-------------|----------|
| Frontend | React + Tailwind CSS | Web UI |
| Backend | FastAPI / Flask | REST API |
| Database | PostgreSQL / MongoDB | Store datasets, logs, and configs |
| AI Model | Scikit-learn / TensorFlow | Classification engine |
| Deployment | Docker + AWS / Render | Cloud hosting |
| Version Control | GitHub | Team collaboration |

---

## 🔄 5. Data Flow Overview

1. **Frontend** uploads dataset or input parameters  
2. **Backend** validates and forwards data to ML model  
3. **AI Model** performs inference or retraining  
4. **Backend** returns results and metrics  
5. **Frontend** visualizes predictions and stats dynamically  

---

## 📅 6. Milestones & Deliverables

| Week | Deliverable | Responsible |
|------|--------------|-------------|
| 1 | Dataset collection, schema design, and model prototype | AI Engineer |
| 2 | Backend API structure and endpoints | Backend Developer |
| 3 | Frontend mockups and dashboard UI | Frontend Developer |
| 4 | Integrate frontend with backend + model | All |
| 5 | Hyperparameter tuning & retraining feature | AI + Backend |
| 6 | Final testing, documentation, and deployment | All |

---

## 📊 7. Success Metrics

- Model Accuracy ≥ **90%**  
- Retraining Time < **2 minutes**  
- API Latency < **500ms**  
- Page Load < **3 seconds**  
- Users can upload and retrain models autonomously  

---

## 🌌 8. Future Enhancements

- Implement **AutoML** for automatic hyperparameter optimization  
- Integrate **real-time NASA exoplanet feed**  
- Add **Explainable AI (XAI)** visualizations (e.g., SHAP values)  
- Enable **multi-user collaboration** and version control of models  

---

## 🪐 9. References

- NASA Exoplanet Archive: [https://exoplanetarchive.ipac.caltech.edu](https://exoplanetarchive.ipac.caltech.edu)  
- Kepler/K2 Datasets: [https://www.kaggle.com/nasa/kepler-exoplanet-search-results](https://www.kaggle.com/nasa/kepler-exoplanet-search-results)  
- TESS Mission Data: [https://archive.stsci.edu/tess/](https://archive.stsci.edu/tess/)  

---

**Author:** Frank Youze  
**Version:** 1.0  
**Last Updated:** 4th October 2025
