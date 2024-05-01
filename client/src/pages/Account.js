import React from "react";
import { Outlet, useOutletContext } from "react-router-dom"
function Account(){
    const {user, onLogin} = useOutletContext()


    function handleLogout() {
        fetch("/logout", {
          method: "DELETE",
        }).then(() => onLogin(""));
      }
    console.log(user)
    
    return (
        <>
            <div>
                <h1>Account Page</h1>
                <h2>Name: {user.username}</h2>
                <h3>Appointments: </h3>
                <p>None</p>
            </div>

            <div>
                <button>Make An Appointment</button>
                <p></p>
                <button onClick={handleLogout}>Log out</button>
                <p></p>
                <button >Delete Account</button>
            </div>
        </>
    )
}
export default Account