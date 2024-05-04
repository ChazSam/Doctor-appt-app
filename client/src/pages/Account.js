import React, {useState, useEffect} from "react";
import { Outlet, useOutletContext } from "react-router-dom"
import {Formik, useFormik} from 'formik'

function Account(){
    const {user, onLogin, setIsLoggedIn} = useOutletContext()
    const [userDetails, setUserDetails] = useState("")


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
        }).then(() => onLogin(""))
          .then(setIsLoggedIn(false))
      }
    // console.log(user)
    
    return (
        <>           
        <h1>Account Page</h1>
            <div>
                <h2>Please log in or sign up to create an account</h2>
            </div>

            <div>
                <h2>Name: {userDetails.username}</h2>
                <h3>Upcoming Appointments: </h3>
                
                <div>
                    <p>None</p>
                </div>

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