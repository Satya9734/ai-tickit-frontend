import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import CheckAuth from './components/Check-auth.jsx'
import AllTickit from './pages/AllTickit.jsx'
import TickitDetails from './pages/TickitDetails.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Admin from './pages/Admin.jsx'
import Navbar from './components/Navbar.jsx'


createRoot(document.getElementById('root')).render(
  <div>
   <BrowserRouter>
    <Routes>
        <Route 
        path="/" 
        element={
          <CheckAuth isProtectd={true}>
           <div><Navbar/> <AllTickit/></div> 
          </CheckAuth>
        }
        />
        <Route 
        path="/tickitDetails/:id" 
        element={
          <CheckAuth isProtectd={true}>
            <TickitDetails/>
          </CheckAuth>
        }
        />
        <Route 
        path="/login" 
        element={
          <CheckAuth isProtectd={false}>
            <Login/>
          </CheckAuth>
        }
        />
        <Route 
        path="/signup" 
        element={
          <CheckAuth isProtectd={false}>
            <Signup/>
          </CheckAuth>
        }
        />
        <Route 
        path="/admin" 
        element={
          <CheckAuth isProtectd={true}>
           <div><Navbar/> <Admin/></div>
          </CheckAuth>
        }
        />
    </Routes>
   </BrowserRouter>
  </div>
  
)
