import {useState, useEffect} from 'react';
import Calendar from 'react-calendar'
import { Outlet, useOutletContext } from "react-router-dom"
import {Formik, useFormik} from 'formik'
import * as yup from 'yup';

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];
function Appointment(){
    const {user, onLogin, listDoctors} = useOutletContext()
    const [calendar, setCalendar] = useState(new Date())
    const [errors, setErrors] = useState([])
    
    
    const formSchema = yup.object().shape({
        // username: yup.string().required("Uesrname must be at least 8 characters long").min(8),
        // password: yup.string().required("Password must be at least 8 characters long").min(8),
      });
    const formik = useFormik({

        initialValues:{
            user_id:"",
            doctor_id:"",
        },

        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/login", {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                // body: JSON.stringify({ username: formik.values.username })
                body: JSON.stringify({ username: formik.values.username, password: formik.values.password })
            }) .then((r) => {
 
                if(r.ok){
                    r.json().then((user) => onLogin(user))

                }else{
                    r.json().then((err) => setErrors(err.error))
                }})
            
        }
    })


    return(
        <>
        <h1>Appointment Page</h1>
            <div>
                <h2>Please log in or create an account to schedule an appointment</h2>
            </div>

            <div>
                <h2>Select a Doctor</h2>
                <select>
                    <option>--</option>
                    {listDoctors.map((doctor)=> (
                        
                            <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                    ))}
                </select>
                <p></p>
                <Calendar value={calendar} onChange={setCalendar}></Calendar>
            </div>
        </>
    )
}

export default Appointment