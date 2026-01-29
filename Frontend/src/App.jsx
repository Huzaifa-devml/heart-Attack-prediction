import { useState } from 'react'
import{BrowserRouter,Routes,Route} from "react-router-dom"


import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import Login from './pages/Login1'
import LowRisk from './pages/LowRisk'
import HighRisk from './pages/HighRisk'


function App() {
  

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/low-risk" element={<LowRisk/>}/>
      <Route path='/high-risk' element={<HighRisk/>}/>

     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
