import {useState, useEffect} from 'react';
import NavBar from "../components/NavBar";

function Login(){


    return(
        <>
            <header>
                <NavBar/>
            </header>
            <form>
                <div>

                    <h1>Login page</h1>
            
                    <input/>
                    <p>Name</p>
                
                    <input/>
                    <p>Password</p>
                
                <button type='Submit'>Submit</button>
                </div>
            </form>

        </>
    )
}

export default Login