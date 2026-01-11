import React, { useEffect, useState } from 'react'
import EachTickit from '../components/EachTickit'
// import { useNavigate } from "react-router-dom"
import "./css/AllTickit.css"


function AllTickit() {
  const [allTickits, setAllTickis] = useState([])
  const [loding, setLoding] = useState(false)
  const [createLoding, setCreateLoding] = useState(false)
  const [form, setForm] = useState({ title: "", depscription: "" })

  const handelForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const fetchAllTickit = async () => {
    setLoding(true)
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${import.meta.env.VITE_BACKEND}/tickit`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (res.ok) {
        setAllTickis(data.allTickits)
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.log(error)
      alert("internal server error")
    } finally {
      setLoding(false)
    }
  }

  const cretaeTickit = async (e) => {
    e.preventDefault()
    setCreateLoding(true)
    try {
      const token = localStorage.getItem("token")
      const user =JSON.parse(localStorage.getItem("tickit_app_user"))
      const res = await fetch(`${import.meta.env.VITE_BACKEND}/tickit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (res.ok) {
        setAllTickis([{...data.createTickit,status:"TODO",createdBy:{_id:user._id}}, ...allTickits])
        setForm({ title: "", depscription: "" })
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.log(error)
      alert("internal server error")
    } finally {
      setCreateLoding(false)
    }
  }

  useEffect(() => {
    fetchAllTickit()
  }, [])

  if (loding) {
    return <div className="loading-text">Loading...</div>
  }

  return (
    <div className="app-container">
      <div className="create-ticket">
        <h3 className="section-title">Create Ticket</h3>

        <form className="ticket-form" onSubmit={cretaeTickit}>
          <input
            className="input-field"
            type="text"
            name="title"
            value={form.title}
            onChange={handelForm}
            placeholder="Ticket title"
          />

          <input
            className="input-field"
            type="text"
            name="depscription"
            value={form.depscription}
            onChange={handelForm}
            placeholder="Ticket Description"
          />

          <button className="primary-btn" type="submit">
            {createLoding ? "Ticket Creating..." : "Ticket Create"}
          </button>
        </form>
      </div>

      <div className="ticket-list">
        {allTickits && allTickits.map((tickit) => (
          <EachTickit key={tickit._id} tickit={tickit} />
        ))}
      </div>
    </div>
  )
}

export default AllTickit
