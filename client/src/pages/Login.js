import {useState, useEffect} from 'react';
import NavBar from "../components/NavBar";
import { Outlet, useOutletContext } from "react-router-dom"

function Login({onLogin}){

    const [errors, setErrors] =useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        setIsLoading(true)
        fetch("/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({username, password})
        }).then((r) => {
            setIsLoading(false)
            if(r.ok){
                r.json().then((user => onLogin(user)))

            }else{
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    return(
        <>
        <h1>Login page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <p>Name</p>
                    <input id="username" value={username} onChange={(e)=> setUsername(e.target.value)} />

                    <p>Password</p>
                    <input id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                
                </div>
                <p></p>
                <button type='Submit'>Submit</button>
                {errors.map((err) => (
                    <p style={{ color: "red" }} key={err}> {err}</p>
                ))}
            </form>

        </>
    )
}

export default Login