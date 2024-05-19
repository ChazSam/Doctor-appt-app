import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function App() {
  const [listDoctors, setListDoctors] = useState([])
  const [user, setUser] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
   
  useEffect(() => {
      fetch("/doctor")
        .then((res) => res.json())
        .then((data) => {
          setListDoctors(data);
        });
    }, []);

  useEffect(() => {
      fetch("/check_session").then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user));
          setIsLoggedIn(true)
        }
        
      }).catch((error)=>{
        console.log(error)
      })
    }, []);

  return(
    <div>
      <header>
        <NavBar user={user}  isLoggedIn={isLoggedIn}/>
      </header>
      <Outlet context={{listDoctors,setListDoctors, user:user,  setUser, isLoggedIn, setIsLoggedIn}} />
    </div>
  ) 
}

export default App;
