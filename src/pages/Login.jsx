import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./css/Login.css"

function Login() {
  const [form, setForm] = useState({ email: "", password: "" })
  const navigate = useNavigate()
  const [loding, setLoding] = useState(false)

  const handelForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handelLogin = async (e) => {
    e.preventDefault()
    setLoding(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
      })

      const data = await res.json()
      if (res.ok) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("tickit_app_user", JSON.stringify(data.user))
        navigate("/")
      } else {
        alert(data.message || "login faild , something wrong")
      }
    } catch (error) {
      console.log(error)
      alert("login faild , something wrong")
    } finally {
      setLoding(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>

        <form className="auth-form" onSubmit={handelLogin}>
          <label className="auth-label">Email</label>
          <input
            className="auth-input"
            type="text"
            value={form.email}
            onChange={handelForm}
            name="email"
          />

          <label className="auth-label">Password</label>
          <input
            className="auth-input"
            type="text"
            value={form.password}
            onChange={handelForm}
            name="password"
          />

          <button className="primary-btn" type="submit">
            {loding ? "Login Account..." : "Login"}
          </button>
        </form>

        <button
          className="link-btn"
          onClick={() => navigate("/signup")}
        >
          Signup ?
        </button>
      </div>
    </div>
  )
}

export default Login
