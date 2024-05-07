import {useState, useEffect} from 'react';
import { Outlet, useOutletContext, useNavigate } from "react-router-dom"
import {Formik, useFormik} from 'formik'
import * as yup from 'yup';

function Login(){
    const {user, onLogin, setIsLoggedIn} = useOutletContext()
    
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
   
    // console.log(user)

    const formSchema = yup.object().shape({
        // username: yup.string().required("Uesrname must be at least 8 characters long").min(8),
        // password: yup.string().required("Password must be at least 8 characters long").min(8),
      });
   
    const formik = useFormik({

        initialValues:{
            username:"",
            password:"",
        },

        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/login", {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                
                body: JSON.stringify(values, null, 2)
            }) .then((r) => {
 
                if(r.ok){
                    r.json().then((user) => onLogin(user))
                    .then(setIsLoggedIn(true))
                    .then(navigate('/'))
                }else{
                    r.json().then((err) => setErrors(err.error))
                }})
            
        }
    })

    // console.log(formik.values)
    return(
        <>
        <h1>Login page</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <p>Name</p>
                    <input id="username" value={formik.values.username} onChange={formik.handleChange} />
                    {/* <p style={{ color: "red" }} > {formik.errors.username}</p> */}

                    <p>Password</p>
                    <input id='password' value={formik.values.password} onChange={formik.handleChange}/>
                    {/* <p style={{ color: "red" }} > {formik.errors.username}</p> */}

                </div>
                <p></p>
                <button type='Submit'>Submit</button>
                {/* {errors.map((err) => (
                    <p style={{ color: "red" }} key={err}> {err}</p>
                ))} */}
            </form>

        </>
    )
}

export default Login