import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "../assets/Register.css"

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    direccion: ""
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const validate = () => {
    if (!form.nombre || !form.apellido || !form.email || !form.password) {
      return "Completa los campos obligatorios."
    }
    if (form.password.length < 6) return "La contraseña debe tener al menos 6 caracteres."
    if (form.password !== form.confirmPassword) return "Las contraseñas no coinciden."
    // agrega más validaciones según tu DB
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    const v = validate()
    if (v) { setError(v); return }
    setLoading(true)
    try {
      // Ajusta la URL al endpoint real de tu backend
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          apellido: form.apellido,
          email: form.email,
          password: form.password,
          telefono: form.telefono,
          direccion: form.direccion
        })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.message || "Error en el registro")
      } else {
        // registro OK -> redirigir a login o home
        navigate("/Login")
      }
    } catch (err) {
      setError("Error de conexión al servidor.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page d-flex align-items-center justify-content-center">
      <form className="register-form p-4 shadow-sm" onSubmit={handleSubmit}>
        <h3 className="mb-3">Registrar usuario</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row">
          <div className="col-sm-6 mb-3">
            <label className="form-label">Nombre*</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-sm-6 mb-3">
            <label className="form-label">Apellido*</label>
            <input name="apellido" value={form.apellido} onChange={handleChange} className="form-control" />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Email*</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="form-control" />
        </div>

        <div className="row">
          <div className="col-sm-6 mb-3">
            <label className="form-label">Contraseña*</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-sm-6 mb-3">
            <label className="form-label">Confirmar contraseña*</label>
            <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} className="form-control" />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input name="telefono" value={form.telefono} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input name="direccion" value={form.direccion} onChange={handleChange} className="form-control" />
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <small>¿Ya tienes cuenta? <Link to="/Login">Inicia sesión</Link></small>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </div>
      </form>
    </div>
  )
}