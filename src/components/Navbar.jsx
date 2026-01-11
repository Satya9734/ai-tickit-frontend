import {  NavLink, useNavigate } from "react-router-dom";
import "./css/Navbar.css"

export default function Navbar() {
    const data = localStorage.getItem("tickit_app_user")
    const user=JSON.parse(data);
    const navigate=useNavigate()
  return (
    <nav className="app-navbar">

      
      <div className="nav-left">
        <NavLink to="/" className="nav-logo">
        AI TICKIT MANAGEMENT
        </NavLink>
      </div>

      <div className="nav-right">

        <div className="nav-item">
          <b>Hi, {user?.name}</b>
        </div>

        {
        user?.role=="admin" &&  <NavLink to="/admin" className="nav-item">
          Admin
        </NavLink>
        }
       

        <button  className="nav-logout"
        onClick={()=>{
          localStorage.removeItem("tickit_app_user")
          localStorage.removeItem("token")
           if (!localStorage.getItem("tickit_app_user")) {
            navigate("/login");
            }
        }}
        >
          Logout
        </button>
      </div>

    </nav>
  );
}
