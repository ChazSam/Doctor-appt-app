import {useState, useEffect} from 'react';
import NavBar from "../components/NavBar";
import { Outlet, useOutletContext } from "react-router-dom"
import {Formik, useFormik} from 'formik'
import * as yup from 'yup';

function Login({onLogin}){

    const [errors, setErrors] = useState([])
    // const [isLoading, setIsLoading] = useState(false)
    // const [username, setUsername] = useState("")
    // const [password, setPassword] = useState("")
    // const [currentUser, setCurrentUser] = useState(null)
    // const [login, setLogin] = useState(false)
    // const [refreshPage, setRefreshPage] = useState(false);

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
                body: JSON.stringify({ username: formik.values.username })
            }) .then((r) => {
                // (res) =>{
                //     if (res.status == 200){
                //         setRefreshPage(!refreshPage)
                //     }}
                // setIsLoading(false)
                if(r.ok){
                    r.json().then((user => onLogin(user)))

                }else{
                    r.json().then((err) => setErrors(err.errors))
                }})
            
        }
    })
  console.log(errors)
    // function handleSubmit(e){
    //     e.preventDefault()
    //     setIsLoading(true)
    //     fetch("/login",{
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body:JSON.stringify({username, password})
    //     }).then((r) => {
    //         setIsLoading(false)
    //         if(r.ok){
    //             r.json().then((user => onLogin(user)))

    //         }else{
    //             r.json().then((err) => setErrors(err.errors))
    //         }
    //     })
    // }

    return(
        <>
        <h1>Login page</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <p>Name</p>
                    <input id="username" value={formik.values.username} onChange={formik.handleChange} />
                    <p style={{ color: "red" }} > {formik.errors.username}</p>

                    <p>Password</p>
                    <input id='password' value={formik.values.password} onChange={formik.handleChange}/>
                    <p style={{ color: "red" }} > {formik.errors.username}</p>

                </div>
                <p></p>
                <button type='Submit'>Submit</button>
                {/* {errors.map((err) => (
                    <p style={{ color: "red" }} key={err}> {err}</p> */}
                {/* ))} */}
            </form>

        </>
    )
}

export default Login