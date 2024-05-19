import React, {useState, useEffect} from "react";
import { Outlet, useOutletContext, useNavigate } from "react-router-dom"
import {Formik, useFormik} from 'formik'

function Account(){
    const {user, onLogin, setIsLoggedIn} = useOutletContext()
    const navigate = useNavigate()

    function handleLogout() {
        fetch("/logout", {
          method: "DELETE",
        }).then(() => onLogin(""))
          .then(setIsLoggedIn(false))
          .then(navigate('/'))
      }

    function handleDelete(){
        if(window.confirm("Are you sure you want to delete your account?")){
            fetch(`/account/${user.id}`, {
                method: "DELETE",
              }).then(() => onLogin(""))
                .then(setIsLoggedIn(false))
                .then(navigate('/'))
        }
    }
    
    return (
        <>           
        <h1>Account Page</h1>
        {!user && (
            <div>
                <h2>Please log in or sign up to create an account</h2>
            </div>
        )}

        {user && (

                <div>
                    <h2>Name: {user.username}</h2>
                    <h3>Upcoming Appointments:</h3>
                    <ul>
                            {user?.appointments.map((appointment, index) => (
                                <li key={index}>
                                    <strong>Doctor:</strong> {appointment.doctor.name}<br />
                                    <strong>Date:</strong> {appointment.date}<br />
                                    <strong>Department:</strong> {appointment.doctor.department}
                                </li>
                            ))}
                        </ul>

                    <button id="edit-account" onClick={()=>navigate("/account/settings")}>Change Account Details</button>
                        <p></p>
                        
                    <button id="edit-appointment" onClick={()=>navigate("/account/appointment")}>Change An Appointment</button>
                        <p></p>
                    
                        <button id='logout' onClick={handleLogout} >Log out</button>
                    
                        <p></p>
                    <button id='delete-account' onClick={handleDelete}>Delete Account</button>
                    
                </div>
             )}
        </>
    )
}
export default Account