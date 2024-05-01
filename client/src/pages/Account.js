import React, {useState, useEffect} from "react";
import { Outlet, useOutletContext } from "react-router-dom"
import {Formik, useFormik} from 'formik'

function Account(){
    const {user, onLogin} = useOutletContext()
    const [userDetails, setUserDetails] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
        fetch(`/account/${user.id}`)
          .then((res) => res.json())
          .then((data) => {
            setUserDetails(data);
            console.log(data);
          })
          .catch((error) => {
            console.error('Error fetching user details:', error)});
      }, []);

    function handleLogout() {
        fetch("/logout", {
          method: "DELETE",
        }).then(() => onLogin(""));
      }
    // console.log(user)
    
    return (
        <>
            <div>
                
                <h1>Account Page</h1>
                <h2>Name: {userDetails.username}</h2>
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