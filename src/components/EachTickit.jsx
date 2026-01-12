import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./css/EachTickit.css"

function EachTickit({ tickit }) {
  const [loding, setLoding] = useState(false)
  const user = JSON.parse(localStorage.getItem("tickit_app_user"))

  const handelProblemSolved = async () => {
    const token = localStorage.getItem("token")
    setLoding(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND}/tickit/update`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: tickit._id })
      })
      const data = await res.json()
      if (res.ok) {
        alert("your tickit will be deleted in some time")
        tickit.status = "PROBLEM SOLVED"
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

  const navigate = useNavigate()

  return (
    <div className="ticket-card">
      <div className="ticket-row">
        <strong>Title:</strong> {tickit.title}
      </div>

      <div className="ticket-row">
        <strong>Description:</strong> {tickit.depscription}
      </div>

      <button
        className="view-btn"
        onClick={() => {
          navigate(`/tickitDetails/${tickit._id}`)
        }}
      >
        View Details
      </button>

      {
       ( user._id == tickit.createdBy._id) && tickit.status != "PROBLEM SOLVED"
          ?
          <button
            className="solve-btn"
            onClick={handelProblemSolved}
          >
            {loding ? "Updating..." : "Mark as Solved"}
          </button>
          :
          ( user._id == tickit.createdBy._id) && <div className="solved-text">SOLVED</div>
      }
    </div>
  )
}

export default EachTickit
