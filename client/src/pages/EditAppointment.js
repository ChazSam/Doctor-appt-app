import React, {useState, useEffect} from "react";
import { Outlet, useOutletContext, useNavigate } from "react-router-dom"
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
    const [isChangeSelcted, setIsChangeSelected] = useState(false)
    const [appt, setAppt] = useState({})
    const navigate = useNavigate()

    
    function handleDelete(e){
        
        console.log(e.target.value)
        fetch(`/appointment/${user.appointments[selectAppt].id}`, {
            method: "DELETE"
        }).then((r)=>{
            if(r.ok){
                onLogin((prevUser) => ({
                     ...prevUser,
                    
                    appointments: prevUser.appointments.filter(
                        (appt) => appt.id !== parseInt(selectAppt)
                    )
                    
                }))
                setSelectAppt(null);
                setIsChangeSelected(false);
            } else {
                
                console.error("Failed to delete doctor")
            }
        });
    }
    
    function handleSelect(){
        setIsChangeSelected(true)
        setAppt(user.appointments[selectAppt])
        formik.setValues({
            user_id:user.id,
            doctor_id:user.appointments[selectAppt].doctor_id,
            date: new Date(user.appointments[selectAppt].date)
        })
    }
        const formSchema = yup.object().shape({
            user_id: yup.number().required("Please log in"),
            doctor_id: yup.number().required("Please select a doctor"),
            date: yup.date().required("Select a doctor and date for an appointment")
          });
    
          const formik = useFormik({
            initialValues: {
                user_id: user.id,
                doctor_id: null,
                date: null
            },
            validationSchema: formSchema,
            
            onSubmit: (values) => {
                const selectedDate = new Date(calendar);
                selectedDate.setHours(0, 0, 0, 0);
                values.date = selectedDate.toISOString().split('T')[0]
            
                fetch(`/appointment/${user.appointments[selectAppt].id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values, null, 2)
                }).then((r) => {
                    if (r.ok) {

                        r.json().then((updatedAppt) => {
                            const updatedAppointments = user.appointments.map((appt, index) =>
                                index === parseInt(selectAppt) ? updatedAppt : appt
                            );
                         
                            onLogin((prevUser) => ({
                                ...prevUser,
                                appointments: updatedAppointments
                            }));
                        })
                        .then(() => {
                            navigate("/account");
                            setIsChangeSelected(false);
                        })
                        .catch((err) => console.log(err));
                    } else {
                        r.json().then((err) => console.log(err.error));
                    }
                });
            }

        });
            
 
        useEffect(() => {
            setCalendar(formik.values.date);
        }, [formik.values.date]);

         console.log(formik.values)
    return(
        <>
        
            <h1>Patient Appointments</h1>
            <select id='appt-id' onChange={(e)=>setSelectAppt(e.target.value)}>
                <option value="">--Select Appointment--</option>
                {user.appointments.map((appt, index)=>(
                    <option id={appt.id} value={index} >{appt.doctor.name} - {appt.date}</option>
                ))}
            </select>
            <p></p>
                <button onClick={handleSelect}>Change Appointment</button>
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
                    <Calendar value={calendar} 
                    onChange={(date) => formik.setFieldValue('date', date)}
                    // onChange={formik.handleChange}
                    >
                        
                    </Calendar>
                </div>
                <p></p>
                <button type='Submit'>Change Appointment</button>
            </form>
            )}
        </>
    )
}

export default EditAppointment