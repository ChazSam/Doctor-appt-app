import React from "react";
import NavBar from "../components/NavBar";

function Account(){

    return (
        <>
            <header>
                <NavBar/>
            </header>
            <div>
                <h1>Account Page</h1>
                <h2>Name: </h2>
                <h3>Appointments: </h3>
                <p>None</p>
            </div>
            <div><button>Make An Appointment</button>
                <p></p>
                <button>Delete Account</button>
            </div>
        </>
    )
}
export default Account