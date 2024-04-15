import {useState, useEffect} from 'react';
import NavBar from "../components/NavBar";

function Signup(){


    return(
        <>
            <header>
                <NavBar/>
            </header>
            <h1>Signup page</h1>
            <div>
                <input/>
                <p>Name</p>
            </div>
            <div>
                <input/>
                <p>age</p>
            </div>
            <div>
                <input/>
                <p>sex</p>
            </div>
            <div>
                <input/>
                <p>The reason you need to see a doctor</p>
            </div>
            <div>
                <input/>
                <p>Password</p>
            </div>
            
        </>
    )
}

export default Signup