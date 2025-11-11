import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from "react"
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Freelancer from './pages/Freelancer'
import FreelanceProfile from './pages/FreelanceProfile'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <div className="content-wrapper">
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/Login' element={<Login />}/>
            <Route path='/Register' element={<Register />}/>
            <Route path='/Freelancer' element={<Freelancer />}/>
            <Route path='/FreelanceProfile' element={<FreelanceProfile />}/>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App