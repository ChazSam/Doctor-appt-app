import React, {useState, useEffect} from "react";
import { Outlet, useOutletContext, useNavigate } from "react-router-dom"
import {Formik, useFormik} from 'formik'
import * as yup from 'yup';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar'

function EditAppointment(){
    const {user, setUser, listDoctors} = useOutletContext()
    const [selectAppt, setSelectAppt] = useState("")
    const [calendar, setCalendar] = useState(new Date())
    const [isChangeSelcted, setIsChangeSelected] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    
    const getDoctorName = (doctorId) => {
        const doctor = listDoctors.find(doc => doc.id === doctorId);
        return doctor ? doctor.name : 'Unknown Doctor';
      }
    
    function handleDelete(e){
        if (selectAppt === ""){
           return  setError("Please select an appointment")
        }
    
        fetch(`/appointment/${user.appointments[selectAppt].id}`, {
            method: "DELETE"
        }).then((r)=>{
            if(r.ok){
                setUser((prevUser) => ({
                     ...prevUser,
                    
                    appointments: prevUser.appointments.filter(
                        (appt, index) => index !== parseInt(selectAppt)
                    )
                }))
            
                setSelectAppt(null);
                setIsChangeSelected(false);
                navigate("/account")
            } else {
                
                console.error("Failed to delete appointment")
            }
        });
    }
    
    function handleSelect(){
        if (selectAppt === ""){
            return  setError("Please select an appointment")
         }

        setIsChangeSelected(true)
        

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
                if(values.doctor_id === ""){
                   return setError("Please select a Doctor")
                }
                
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
                         
                            setUser((prevUser) => ({
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

        if (!user) {
            return <div>Loading...</div>}

    return(
        <>
        
            <h1>Patient Appointments</h1>
            <select id='appt-id' onChange={(e)=>setSelectAppt(e.target.value)}>
                <option key="" value="">--Select Appointment--</option>
                {user.appointments.map((appointment, index)=>(
                    <option key={appointment.id} id={appointment.id} value={index} >{appointment.doctor_id ? getDoctorName(appointment.doctor_id): "error" } - {appointment.date}</option>
                ))}
            </select>
            <p style={{ color: "red" }}>{error}</p>
                <button onClick={handleSelect}>Change Appointment</button>
               
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
                    <p style={{ color: "red" }}> {formik.errors.doctor_id}</p>
                    <p></p>
                    <Calendar 
                    value={calendar} 
                    onChange = {(date) => formik.setFieldValue('date', date)}
                    minDate = {new Date()}
                    />
                        
                    
                    <p style={{ color: "red" }}> {formik.errors.date}</p>
                </div>
                <p></p>
                <button type='Submit'>Change Appointment</button>
            </form>
            )}
        </>
    )
}

export default EditAppointment