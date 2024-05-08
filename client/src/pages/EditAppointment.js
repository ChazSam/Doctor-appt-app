import React, {useState} from "react";
import { Outlet, useOutletContext } from "react-router-dom"
import App from "../components/App";

function EditAppointment(){
    const {user, onLogin, listDoctors} = useOutletContext()
    const [selectAppt, setSelectAppt] = useState()

    console.log(selectAppt)

    function handleDelete(e){
        
            console.log(e.target.value)
            fetch(`/appointment/${selectAppt}`, {
                method: "DELETE"
            }).then((r)=>{
                if(r.ok){
                    onLogin((prevUser) => {
                        const updatedUser = { ...prevUser }
  
                        updatedUser.appointments = updatedUser.appointments.filter(
                            (appt) => appt.id !== parseInt(selectAppt)
                        )
                        return updatedUser;
                    })
                } else {
                
                    console.error("Failed to delete doctor")
                }
            });
        }
    

    return(
        <>
        
            <h1>Patient Appointments</h1>
            <select id='appt-id' onChange={(e)=>setSelectAppt(e.target.value)}>
                <option value="">--Select Appointment--</option>
                {user.appointments.map((appt)=>(
                    <option id={appt.id} value={appt.id} >{appt.doctor.name} - {appt.date}</option>
                ))}
            </select>
            <p></p>
                <button>Change Appointment</button>
                <p></p>
                <button onClick={handleDelete}>Delete Appointment</button>
            
        </>
    )
}

export default EditAppointment