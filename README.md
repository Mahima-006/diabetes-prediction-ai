# 🩺 Diabetes Prediction AI

> AI-powered early diabetes risk screening using machine learning and a premium web interface.

![DiabetesAI](https://img.shields.io/badge/ML-Random%20Forest-667EEA?style=for-the-badge)
![Accuracy](https://img.shields.io/badge/Accuracy-82.4%25-10B981?style=for-the-badge)
![React](https://img.shields.io/badge/Frontend-React%2018-61dafb?style=for-the-badge&logo=react)
![Flask](https://img.shields.io/badge/Backend-Flask-000000?style=for-the-badge&logo=flask)

---

## ✨ Features

- 🤖 **5 ML algorithms** compared — Random Forest wins with **82.4% accuracy**
- ⚡ **Instant risk prediction** with animated probability score and risk meter
- 🎨 **Premium glassmorphism UI** with dark/light mode toggle
- 📄 **PDF health report** generated in-browser with personalised recommendations
- 🧮 **Built-in BMI calculator** that auto-fills the form
- 📱 **Fully responsive** — mobile-first design
- 🕒 **Prediction history** stored locally in the browser (last 10 records)
- 🎉 **Confetti animation** on low-risk result
- 🔒 **100% private** — no personal data is stored on any server

---

## 🛠 Tech Stack

| Layer      | Technology                                    |
|------------|-----------------------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS, Framer Motion   |
| Backend    | Python Flask, Flask-CORS                      |
| ML Models  | scikit-learn (RF, LR, DT, KNN, SVM)          |
| PDF        | jsPDF (client-side generation)                |
| Deployment | Render (API) + Vercel (Frontend)              |

---

## 📊 Model Performance

| Model               | Accuracy |
|---------------------|----------|
| 🏆 Random Forest    | **82.4%** |
| SVM                 | 78.9%    |
| Logistic Regression | 77.3%    |
| KNN                 | 75.0%    |
| Decision Tree       | 73.1%    |

---

## 🚀 Running Locally

### Prerequisites

- Python 3.9+
- Node.js 18+

### 1. Backend Setup

```bash
cd backend
pip install -r requirements.txt
python model_training.py   # trains model & saves .pkl files
python app.py              # starts Flask on http://localhost:5000
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev    # starts Vite dev server on http://localhost:3000
```

The Vite dev server proxies `/api` requests to `http://localhost:5000` automatically.

---

## 🌐 Deployment

### Backend → Render.com

1. Create a new **Web Service** on Render
2. Connect your GitHub repo and point to `backend/`
3. Set **Build Command**: `pip install -r requirements.txt && python model_training.py`
4. Set **Start Command**: `gunicorn app:app`
5. Set env var: `PORT=10000`

### Frontend → Vercel

1. Create a new project on Vercel, connect your GitHub repo
2. Set **Root Directory**: `frontend`
3. Add env variable: `VITE_API_URL=https://your-render-url.onrender.com`
4. Deploy!

---

## 📁 Project Structure

```
diabetes-predictor/
├── backend/
│   ├── app.py                 Flask REST API
│   ├── model_training.py      Full ML pipeline
│   ├── diabetes_model.pkl     Saved Random Forest model
│   ├── scaler.pkl             Saved StandardScaler
│   ├── model_stats.json       Model evaluation metrics
│   ├── requirements.txt
│   └── Procfile
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── PredictionForm.jsx
    │   │   ├── ResultCard.jsx
    │   │   ├── BMICalculator.jsx
    │   │   ├── ModelStats.jsx
    │   │   └── RiskMeter.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Predict.jsx
    │   │   ├── About.jsx
    │   │   └── History.jsx
    │   └── utils/
    │       ├── api.js
    │       └── formatters.js
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

---

## 🔗 Live Demo

> Coming soon after deployment to Render + Vercel

---

## 📝 LinkedIn Caption

```
🩺 Just built a Diabetes Prediction System using Machine Learning + React + Flask!

✅ 5 ML algorithms compared
✅ 82.4% accuracy with Random Forest
✅ Live web app with animated UI
✅ PDF report generation
✅ Fully deployed

This was part of my internship project with @Internpe

👇 Live demo & GitHub in comments

#MachineLearning #Python #React #DataScience #HealthTech #Flask #Internship #Internpe #WebDevelopment #AI
```

---

## ⚠️ Disclaimer

This application is for **informational and educational purposes only**. 
It is **NOT a medical diagnosis**. Always consult a qualified healthcare professional for medical advice.

---

## 🙏 Acknowledgements

- Dataset: [Pima Indians Diabetes Dataset](https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database) — UCI ML Repository
- Built as part of the InternPe machine learning internship programme
