import {useState, useEffect} from 'react';
import Calendar from 'react-calendar'
import { Outlet, useOutletContext, useNavigate} from "react-router-dom"
import {Formik, useFormik} from 'formik'
import * as yup from 'yup';
import 'react-calendar/dist/Calendar.css';

function Appointment(){
    const {user, onLogin, listDoctors} = useOutletContext()
    const [calendar, setCalendar] = useState(new Date())
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const formSchema = yup.object().shape({
        user_id: yup.number().required("Please log in"),
        doctor_id: yup.string().required("Please select a doctor"),
        date: yup.date().required("Select a doctor and date for an appointment")
      });
    // console.log(calendar)
    const formik = useFormik({

        initialValues:{
            user_id:user.id,
            doctor_id:"",
            date:null
        },

        validationSchema: formSchema,

        onSubmit: (values) => {
            const selectedDate = new Date(calendar);
            selectedDate.setHours(0, 0, 0, 0);
            values.date = selectedDate.toISOString().split('T')[0]

            
            fetch("/create", {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2)
            }) .then((r) => {
 
                if(r.ok){
                    r.json().then((appt) => {
          
                        onLogin((prevUser) => {
                            return {
                                ...prevUser,
                                appointments: [...prevUser.appointments, appt]
                            }
                        })
                    })
                    .then(navigate('/account'))

                }else{
                    r.json().then((err) => setErrors(err.error))
                }})
        }
    })

    console.log(formik.values)

    return(
        <>
        <h1>Appointment Page</h1>
        {!user && (

            <div>
                <h2>Please log in or create an account to schedule an appointment</h2>
            </div>
            )}
        {user && (

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
                    // onChange={setCalendar}
                    ></Calendar>
                </div>
                <p></p>
                <button type='Submit'>Add Appointment</button>
            </form>
            )}
            </>
    )
}

export default Appointment