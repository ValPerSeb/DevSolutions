import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "../assets/Register.css"
import { useAuth } from "../context/AuthContext"

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [role, setRole] = useState("client") // "client" or "freelance"
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dni: "",
    city: "",
    country: "",
    dateOfBirth: "",
    // Client-specific
    company: "",
    industry: "",
    language: "",
    // Freelancer-specific
    profile: "",
    title: "",
    skills: "",
    languages: "",
    hourlyRate: ""
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (e) => {
    setRole(e.target.value)
    setError("")
  }

  const validate = () => {
    // Required fields
    if (!form.username) return "Username es obligatorio."
    if (form.username.length < 3) return "Username debe tener al menos 3 caracteres."
    if (!form.firstName) return "Nombre es obligatorio."
    if (!form.lastName) return "Apellido es obligatorio."
    if (!form.email) return "Email es obligatorio."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Email no es válido."
    if (!form.password) return "Contraseña es obligatoria."
    if (form.password.length < 6) return "Contraseña debe tener al menos 6 caracteres."
    if (form.password !== form.confirmPassword) return "Las contraseñas no coinciden."

    // Role-specific validation
    if (role === "client") {
      if (!form.company) return "Nombre de empresa es obligatorio para clientes."
    } else if (role === "freelance") {
      if (!form.title) return "Título profesional es obligatorio para freelancers."
    }

    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    const v = validate()
    if (v) {
      setError(v)
      return
    }

    setLoading(true)
    try {
      // Prepare profile data based on role
      const profileData = role === "client" 
        ? {
            company: form.company,
            industry: form.industry,
            language: form.language
          }
        : {
            profile: form.profile,
            title: form.title,
            skills: form.skills,
            languages: form.languages,
            hourlyRate: form.hourlyRate ? parseFloat(form.hourlyRate) : null
          }

      const userData = {
        username: form.username,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        phone: form.phone || undefined,
        dni: form.dni || undefined,
        city: form.city || undefined,
        country: form.country || undefined,
        dateOfBirth: form.dateOfBirth || undefined,
        role,
        profile: profileData
      }

      const result = await register(userData)
      setSuccess("¡Registro exitoso! Redirigiendo...")
      
      setTimeout(() => {
        navigate("/login")
      }, 3000)
    } catch (err) {
      console.error("Register error:", err)
      if (err.response?.status === 409) {
        setError("Usuario ya existe con ese username, email o DNI.")
      } else if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else if (err.response?.data?.details) {
        // Handle validation errors from backend
        const messages = err.response.data.details
          .map((e) => `${e.path}: ${e.message}`)
          .join(", ")
        setError(messages)
      } else {
        setError("Error al conectar con el servidor.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page d-flex align-items-center justify-content-center">
      <form className="register-form p-4 shadow-sm" onSubmit={handleSubmit}>
        <h3 className="mb-4">Crear Cuenta</h3>

        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        {success && <div className="alert alert-success" role="alert">{success}</div>}

        {/* Role Selection */}
        <div className="mb-4">
          <label className="form-label fw-bold">Tipo de Cuenta*</label>
          <div className="btn-group w-100" role="group">
            <input 
              type="radio" 
              className="btn-check" 
              name="role" 
              id="roleClient" 
              value="client"
              checked={role === "client"}
              onChange={handleRoleChange}
            />
            <label className="btn btn-outline-primary" htmlFor="roleClient">
              Cliente / Empresa
            </label>

            <input 
              type="radio" 
              className="btn-check" 
              name="role" 
              id="roleFreelance" 
              value="freelance"
              checked={role === "freelance"}
              onChange={handleRoleChange}
            />
            <label className="btn btn-outline-primary" htmlFor="roleFreelance">
              Freelancer
            </label>
          </div>
        </div>

        {/* Basic Information */}
        <h5 className="mt-4 mb-3">Información Básica</h5>

        <div className="row">
          <div className="col-sm-6 mb-3">
            <label className="form-label">Usuario*</label>
            <input 
              name="username" 
              value={form.username} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="Nombre de usuario"
              required
            />
          </div>
          <div className="col-sm-6 mb-3">
            <label className="form-label">Correo*</label>
            <input 
              name="email" 
              type="email" 
              value={form.email} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="tu@email.com"
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 mb-3">
            <label className="form-label">Nombre*</label>
            <input 
              name="firstName" 
              value={form.firstName} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="Juan"
            />
          </div>
          <div className="col-sm-6 mb-3">
            <label className="form-label">Apellido*</label>
            <input 
              name="lastName" 
              value={form.lastName} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="Pérez"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 mb-3">
            <label className="form-label">Contraseña*</label>
            <input 
              name="password" 
              type="password" 
              value={form.password} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="Mínimo 6 caracteres"
            />
          </div>
          <div className="col-sm-6 mb-3">
            <label className="form-label">Confirmar Contraseña*</label>
            <input 
              name="confirmPassword" 
              type="password" 
              value={form.confirmPassword} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="Repite tu contraseña"
            />
          </div>
        </div>

        {/* Additional Information */}
        <h5 className="mt-4 mb-3">Información Adicional</h5>

        <div className="row">
          <div className="col-sm-6 mb-3">
            <label className="form-label">Teléfono</label>
            <input 
              name="phone" 
              value={form.phone} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="+573113113131"
            />
          </div>
          <div className="col-sm-6 mb-3">
            <label className="form-label">Número de documento</label>
            <input 
              name="dni" 
              value={form.dni} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="12345678"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 mb-3">
            <label className="form-label">Ciudad</label>
            <input 
              name="city" 
              value={form.city} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="Medellín"
            />
          </div>
          <div className="col-sm-6 mb-3">
            <label className="form-label">País</label>
            <input 
              name="country" 
              value={form.country} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="Colombia"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha de Nacimiento</label>
          <input 
            name="dateOfBirth" 
            type="date" 
            value={form.dateOfBirth} 
            onChange={handleChange} 
            className="form-control" 
          />
        </div>

        {/* Client-Specific Fields */}
        {role === "client" && (
          <>
            <h5 className="mt-4 mb-3">Información de Empresa</h5>

            <div className="mb-3">
              <label className="form-label">Nombre de Empresa*</label>
              <input 
                name="company" 
                value={form.company} 
                onChange={handleChange} 
                className="form-control" 
                placeholder="Mi Empresa S.A."
              />
            </div>

            <div className="row">
              <div className="col-sm-6 mb-3">
                <label className="form-label">Industria</label>
                <input 
                  name="industry" 
                  value={form.industry} 
                  onChange={handleChange} 
                  className="form-control" 
                  placeholder="Tecnología, Finanzas, etc."
                />
              </div>
              <div className="col-sm-6 mb-3">
                <label className="form-label">Idioma</label>
                <input 
                  name="language" 
                  value={form.language} 
                  onChange={handleChange} 
                  className="form-control" 
                  placeholder="Español, Inglés, etc."
                />
              </div>
            </div>
          </>
        )}

        {/* Freelancer-Specific Fields */}
        {role === "freelance" && (
          <>
            <h5 className="mt-4 mb-3">Información Profesional</h5>

            <div className="mb-3">
              <label className="form-label">Título Profesional*</label>
              <input 
                name="title" 
                value={form.title} 
                onChange={handleChange} 
                className="form-control" 
                placeholder="Ej: Desarrollador Full Stack"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Perfil</label>
              <textarea 
                name="profile" 
                value={form.profile} 
                onChange={handleChange} 
                className="form-control" 
                rows="3"
                placeholder="Ej: Desarrollador con 5 años de experiencia en..."
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Habilidades</label>
              <textarea 
                name="skills" 
                value={form.skills} 
                onChange={handleChange} 
                className="form-control" 
                rows="3"
                placeholder="Ej: JavaScript, React, Node.js, MongoDB"
              />
            </div>

            <div className="row">
              <div className="col-sm-6 mb-3">
                <label className="form-label">Idiomas</label>
                <input 
                  name="languages" 
                  value={form.languages} 
                  onChange={handleChange} 
                  className="form-control" 
                  placeholder="Español, Inglés, etc."
                />
              </div>
              <div className="col-sm-6 mb-3">
                <label className="form-label">Tarifa Horaria (COP)</label>
                <input 
                  name="hourlyRate" 
                  type="number" 
                  step="0.01"
                  min="0"
                  value={form.hourlyRate} 
                  onChange={handleChange} 
                  className="form-control" 
                  placeholder="50.00"
                />
              </div>
            </div>
          </>
        )}

        {/* Form Actions */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <small>¿Ya tienes cuenta? <Link to="/Login">Inicia sesión</Link></small>
          <button 
            className="btn btn-primary" 
            type="submit" 
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </div>
      </form>
    </div>
  )
}