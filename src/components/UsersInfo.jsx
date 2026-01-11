import React, { useState } from 'react'
import "./css/UserInfo.css"

function UsersInfo({ info }) {
  const [editFormShow, setEditFormShow] = useState(false)
  const [form, setForm] = useState({
    role: info.role,
    skills: info.skills.join(", ")
  })

  const handelForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    const skills = form.skills.split(",").map(s => s.trim())
    const token = localStorage.getItem("token")

    const res = await fetch(`${import.meta.env.VITE_BACKEND}/auth/updateUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        role: form.role,
        skills,
        email: info.email
      })
    })

    const data = await res.json()
    if (!res.ok) {
      alert(data.message)
    }
    setEditFormShow(false)
    console.log(data)
  }

  return (
    <div className="user-info-card">
      <p className="user-row">
        <strong>Name :</strong> {info.name}
      </p>

      <p className="user-row">
        <strong>Email :</strong> {info.email}
      </p>

      <p className="user-row">
        <strong>Role :</strong> {form.role}
      </p>

      <div className="user-skills">
        <strong>Skills :</strong>
        {
          form.skills === ""
            ? <span className="na-text"> N/A</span>
            : <p className="skills-text">{form.skills}</p>
        }
      </div>

      <button
        className="edit-btn"
        onClick={() => setEditFormShow(true)}
      >
        Edit
      </button>

      {
        editFormShow &&
        <form className="edit-form" onSubmit={handleEdit}>
          <input
            className="edit-input"
            type="text"
            name="role"
            value={form.role}
            onChange={handelForm}
          />

          <input
            className="edit-input"
            type="text"
            name="skills"
            value={form.skills}
            onChange={handelForm}
          />

          <div className="edit-actions">
            <button className="submit-btn" type="submit">
              Submit
            </button>

            <button
              className="cancel-btn"
              type="button"
              onClick={() => {
                setEditFormShow(false)
                setForm({ role: info.role, skills: info.skills.join(", ") })
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      }
    </div>
  )
}

export default UsersInfo
