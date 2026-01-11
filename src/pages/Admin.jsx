import React, { useEffect, useState } from 'react'
import UsersInfo from '../components/UsersInfo'
import "./css/Admin.css"

function Admin() {

  const [allUser, setAllUser] = useState([])
  const UserInfo = JSON.parse(localStorage.getItem("tickit_app_user"))
  const [loding, setLoding] = useState(false)

  const fetchAllUser = async () => {
    setLoding(true)
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${import.meta.env.VITE_BACKEND}/auth/getAllUserInfo`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (res.ok) {
        setAllUser(data)
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

  useEffect(() => {
    fetchAllUser()
  }, [])

  if (loding) {
    return <p className="admin-loading">Loading...</p>
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h3 className="admin-title">Admin Panel – Manage User</h3>
      </div>

      <div className="admin-user-list">
        {
          allUser.length === 0
            ? <p className="no-user-text">No user found</p>
            : allUser.map((user_info) => (
              <UsersInfo
                key={user_info._id}
                info={user_info}
                className="user-card"
              />
            ))
        }
      </div>
    </div>
  )
}

export default Admin
