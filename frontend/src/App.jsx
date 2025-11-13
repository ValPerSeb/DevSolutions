import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from "react"
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import FreelanceOffers from './pages/FreelanceOffers'
import FreelanceProfile from './pages/FreelanceProfile'
import EmpresaProfile from './pages/EmpresaProfile'
import CrearOferta from './pages/CrearOferta'
import Contratos from './pages/Contratos'
import './App.css'
import Proposals from './pages/Proposals'
import PaymentSuccess from './pages/paymentStatus/PaymentSuccess.jsx'
import PaymentFailure from './pages/paymentStatus/PaymentFailure.jsx'
import PaymentPending from './pages/paymentStatus/PaymentPending.jsx'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-wrapper">
          <Header />
          <div className="content-wrapper">
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/Login' element={<Login />}/>
              <Route path='/Register' element={<Register />}/>
              <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
              <Route path="/PaymentFailure" element={<PaymentFailure />} />
              <Route path="/PaymentPending" element={<PaymentPending />} />
              <Route 
                path='/FreelanceOffers' 
                element={
                  <ProtectedRoute requiredRole={'freelance'}>
                    <FreelanceOffers />
                  </ProtectedRoute>
                }
              />
              <Route 
                path='/FreelanceProfile' 
                element={
                  <ProtectedRoute requiredRole={'freelance'}>
                    <FreelanceProfile />
                  </ProtectedRoute>
                }
              />
              <Route 
                path='/EmpresaProfile' 
                element={
                  <ProtectedRoute requiredRole={'client'}>
                    <EmpresaProfile />
                  </ProtectedRoute>
                }
              />
              <Route 
                path='/CrearOferta' 
                element={
                  <ProtectedRoute requiredRole={'client'}>
                    <CrearOferta />
                  </ProtectedRoute>
                }
              />
              <Route 
                path='/Proposals' 
                element={
                  <ProtectedRoute requiredRole={'client'}>
                    <Proposals />
                  </ProtectedRoute>
                }
              />
              <Route 
                path='/Contratos' 
                element={
                  <ProtectedRoute>
                    <Contratos />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App