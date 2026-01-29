import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./styles/RiskPages.css"

function LowRisk() {
    const navigate=useNavigate()
  return (
    <div className="risk-wrapper low">
      <div className="risk-card">
        <h1>✅ Low Heart Attack Risk</h1>

        <p className="risk-subtitle">
          Great news! Your heart health looks <strong>stable</strong>.
        </p>

        <div className="risk-points">
          <p>• Maintain a balanced diet</p>
          <p>• Exercise regularly</p>
          <p>• Keep stress levels low</p>
          <p>• Schedule routine health checkups</p>
        </div>

        <div className="risk-note">
          💙 Keep up the healthy lifestyle to stay heart-strong.
        </div>

        <button className="risk-btn" onClick={() => navigate("/dashboard")}>
          Predict Again
        </button>
      </div>
    </div>
  )
}

export default LowRisk
