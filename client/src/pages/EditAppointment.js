import React, {useState} from "react";
import { Outlet, useOutletContext } from "react-router-dom"
import App from "../components/App";
import {Formik, useFormik} from 'formik'
import * as yup from 'yup';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar'

function EditAppointment(){
    const {user, onLogin, listDoctors} = useOutletContext()
    const [selectAppt, setSelectAppt] = useState()
    const [calendar, setCalendar] = useState(new Date())
    const [errors, setErrors] = useState([])
    const [isChangeSelcted, SetIsChangeSelected] = useState(false)

    

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
    
        const formSchema = yup.object().shape({
            user_id: yup.number().required("Please log in"),
            doctor_id: yup.number().required("Please select a doctor"),
            date: yup.date().required("Select a doctor and date for an appointment")
          });
    
        const formik = useFormik({
    
            initialValues:{
                user_id:user.id,
                doctor_id:null,
                date:null
            },
    
            validationSchema: formSchema,
            onSubmit: (values) => {
                fetch(`/appointment/${selectAppt}`, {
                    method:"PATCH",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values, null, 2)
                }) .then((r) => {
     
                    if(r.ok){
                        r.json().then((user) => console.log(user))
    
                    }else{
                        r.json().then((err) => console.log(err.error))
                    }})
            }
        })
        console.log(formik.values)
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
                <button onClick={()=>SetIsChangeSelected(true)}>Change Appointment</button>
                <p></p>
            {!isChangeSelcted &&(
                <button onClick={handleDelete}>Delete Appointment</button>
            )}
            {isChangeSelcted &&(

                <form onSubmit={formik.handleSubmit}>
                <div>
                    <h2>Select a Doctor</h2>
                    <select id="doctor_id" onChange={formik.handleChange} value={formik.values.doctor_id}>
                        <option id='' value="">--</option>
                        {listDoctors.map((doctor)=> (
                            
                            <option key={doctor.id} value={doctor.id}>{doctor.name} - {doctor.department}</option>
                        ))}
                    </select>
                    <p></p>
                    <Calendar value={calendar} onChange={(date) => formik.setFieldValue('date', date)}></Calendar>
                </div>
                <p></p>
                <button type='Submit'>Change Appointment</button>
            </form>
            )}
        </>
    )
}

export default EditAppointment