import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import {useParams} from "react-router-dom"
import "./css/TickitdDetails.css"


function TickitDetails() {
    const[Tickit,setTickit]=useState({});
    const[loding,setLoding]=useState(false);
  const {id}=useParams();
 
    const fetchTickitDetails = async () => {
      setLoding(true);
      try {
        const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_BACKEND}/tickit/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data=await res.json()
      if(res.ok){
        console.log(data)
        setTickit(data.tickit)
      }
      else{
        alert(data.message);
      }
      } catch (error) {
        console.log(error)
        alert("internal server error");
      }
      finally{
        setLoding(false)
      }
    }
    useEffect(()=>{
      fetchTickitDetails();
    },[])
    
    if(loding) {
      return <div>loding...</div>
    }
  return (
    <div className="ticket-page">

      <div className="ticket-card">

        
        <div className="ticket-header">
          <h2>{Tickit?.title}</h2>
          <p>{Tickit?.depscription}</p>
        </div>

        <hr />
        <h3>Metadata</h3>
<hr />
       
        <div className="ticket-meta">

          <p><b>Status:</b> {Tickit?.status}</p>
          <p><b>Priority:</b> {Tickit?.priority}</p>
          <p><b>Related Skills:</b> {
            Tickit?.skillesNeeded?.map((item)=>{
              return <span> {item}, </span>
            })
          }</p>
        </div>

        
        <div className="ticket-notes">
          <h4>Helpful Notes</h4>
          <p>
            {Tickit?.helpFullNotes}
          </p>
        </div>

       
        <div className="ticket-assign">
          <p><b>Assigned To:</b> {Tickit?.asignedTo?.email}</p>
        </div>

        
        <div className="ticket-footer">
          <small>{new Date(Tickit?.createAt).toLocaleString()}</small>
        </div>

      </div>
    </div>
  )
}

export default TickitDetails
