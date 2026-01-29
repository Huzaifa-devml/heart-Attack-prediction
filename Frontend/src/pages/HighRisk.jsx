import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./styles/RiskPages.css"

function HighRisk() {
    const navigate=useNavigate()
  return (
    <div className="risk-wrapper high">
      <div className="risk-card">
        <h1>⚠️ High Heart Attack Risk</h1>

        <p className="risk-subtitle">
          Our AI model indicates a <strong>higher-than-normal risk</strong>.
        </p>

        <div className="risk-points">
          <p>• Please consult a cardiologist as soon as possible</p>
          <p>• Avoid heavy physical exertion</p>
          <p>• Monitor blood pressure & cholesterol regularly</p>
          <p>• Follow prescribed medication strictly</p>
        </div>

        <div className="risk-note">
          ⚕️ This is an AI-assisted prediction and not a medical diagnosis.
        </div>

        <button className="risk-btn" onClick={() => navigate("/dashboard")}>
          Predict Again
        </button>
      </div>
    </div>
  )
}

export default HighRisk
