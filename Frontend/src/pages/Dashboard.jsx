import { useState ,useLayoutEffect,useRef} from "react";
import gsap from "gsap"
import heartimg from "../assets/heartattack.webp"

import './styles/Dashboard.css'
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config";


const Dashboard = () => {
const navigate=useNavigate()
const textRef = useRef(null);


useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const messages = [
      "Personal Heart Guidance",
      "AI-Powered Risk Analysis",
      "Medical-Grade Prediction",
      "Your Heart, Our Priority",
    ];

    let index = 0;

    const animate = () => {
      gsap.to(textRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power1.out",
        onComplete: () => {
          textRef.current.textContent = messages[index];
          index = (index + 1) % messages.length;

          gsap.to(textRef.current, {
            opacity: 1,
            duration: 0.6,
            ease: "power1.inOut",
          });

          gsap.delayedCall(2, animate);
        },
      });
    };

    animate();
  });

  return () => ctx.revert();
}, []);






  const[result,setResult]=useState("")
  const [formData, setFormData] = useState({
    Age: "",
    RestingBP: "",
    Cholesterol: "",
    FastingBS: 0,
    MaxHR: "",
    Oldpeak: "",
    Sex_M: 0,
    ChestPainType_ATA: 0,
    ChestPainType_NAP: 0,
    ChestPainType_TA: 0,
    RestingECG_Normal: 0,
    RestingECG_ST: 0,
    ExerciseAngina_Y: 0,
    ST_Slope_Flat: 0,
    ST_Slope_Up: 0,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const handleSubmit =  async(e) => {
    e.preventDefault();
    const payload={}
    Object.keys(formData).forEach((key)=>{
      payload[key]=Number(formData[key])
    })
    try{
      const response=await fetch(`${BASE_URL}/api/predict`,{
        method:"POST",
        credentials:"include",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(payload)
      })
      const data=await response.json()
      console.log(data.prediction)
      setResult(data.prediction);
      
    }catch(error){
      console.error("prediction error:",error)
    }
    
  };
  const handlelogout=async()=>{
    try{
      await fetch(`${BASE_URL}/api/auth/logout`,{
        method:"POST",
        credentials:"include",
      })
      navigate("/",{replace:true})
    }catch(err){
      console.error("logout failed",err)
    }

  }

  return (
    <div className="dashboard-wrapper">
  {/* LEFT SIDE */}
  <div className="dashboard-left">
    <h1>
      Predict Your <br />
      <span>Heart Health</span>
    </h1>

    <p className="animated-text" ref={textRef}>
      personal Heart Guidance
    </p>

    {/* Image placeholder */}
    <div className="heart-image">
      <img src={heartimg} alt="" />
      
    </div>
  </div>

  {/* RIGHT SIDE */}
  <div className="dashboard-right">
    <div className="logout-container">
      <button className="logout-btn" onClick={handlelogout}>
        LOGOUT
      </button>
    </div>
    <form className="dashboard-form" onSubmit={handleSubmit}>
      <h2>Heart Attack Prediction</h2>

      <div className="input-group">
        <input type="number" name="Age" placeholder="Age" onChange={handleChange} />
        <input type="number" name="RestingBP" placeholder="Resting BP" onChange={handleChange} />
        <input type="number" name="Cholesterol" placeholder="Cholesterol" onChange={handleChange} />
        <input type="number" name="MaxHR" placeholder="Max Heart Rate" onChange={handleChange} />
        <input type="number" step="0.1" name="Oldpeak" placeholder="Oldpeak" onChange={handleChange} />
      </div>

      <div className="checkbox-group">
        <label><input type="checkbox" name="FastingBS" onChange={handleChange} /> Fasting BS &gt; 120</label>
        <label><input type="checkbox" name="Sex_M" onChange={handleChange} /> Male</label>
        <label><input type="checkbox" name="ExerciseAngina_Y" onChange={handleChange} /> Exercise Angina</label>
      </div>

      <div className="section">
        <h4>Chest Pain Type</h4>
        <label><input type="checkbox" name="ChestPainType_ATA" onChange={handleChange} /> ATA</label>
        <label><input type="checkbox" name="ChestPainType_NAP" onChange={handleChange} /> NAP</label>
        <label><input type="checkbox" name="ChestPainType_TA" onChange={handleChange} /> TA</label>
      </div>

      <div className="section">
        <h4>Resting ECG</h4>
        <label><input type="checkbox" name="RestingECG_Normal" onChange={handleChange} /> Normal</label>
        <label><input type="checkbox" name="RestingECG_ST" onChange={handleChange} /> ST</label>
      </div>

      <div className="section">
        <h4>ST Slope</h4>
        <label><input type="checkbox" name="ST_Slope_Flat" onChange={handleChange} /> Flat</label>
        <label><input type="checkbox" name="ST_Slope_Up" onChange={handleChange} /> Up</label>
      </div>

      <button type="submit" className="predict-btn">
        Predict
      </button>
    </form>
  </div>
</div>

  );
};

export default Dashboard;
