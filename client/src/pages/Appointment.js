import {useState, useEffect} from 'react';
import NavBar from "../components/NavBar";

function Appointment(){


    return(
        <>
            <header>
                <NavBar/>
            </header>
            <h1>Appointment Page</h1>
            <h2>Please log in or create an account to schedule an appointment</h2>

        </>
    )
}

export default Appointment