import {useState, useEffect} from 'react';
import NavBar from "../components/NavBar";

function Login(){


    return(
        <>
            <header>
                <NavBar/>
            </header>
            <h1>Login page</h1>
            <div>
                <input/>
                <p>Name</p>
            </div>
            <div>
                <input/>
                <p>Password</p>
            </div>

        </>
    )
}

export default Login