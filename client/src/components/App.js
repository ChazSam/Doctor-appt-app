import React, { useEffect, useState } from "react";
import { Switch, Route, Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function App() {
  const [listDoctors, setListDoctors] = useState([])
  const [user, setUser] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
   
  useEffect(() => {
      // console.log("FETCH! ");
      fetch("/doctor")
        .then((res) => res.json())
        .then((data) => {
          setListDoctors(data);
          // console.log(data);
        });
    }, []);

  // useEffect(() => {
  //     fetch("/check_session").then((r) => {
  //       if (r.ok) {
  //         r.json().then((user) => setUser(user));
  //         console.log(user)
  //       }
  //     });
  //   }, []);


  return(
    <div>
      <header>
        <NavBar user={user} setUser={setUser} isLoggedIn={isLoggedIn}/>
      </header>
      <Outlet context={{listDoctors,setListDoctors, user:user, onLogin: setUser, setIsLoggedIn}} />
      
    </div>

  ) 
  
    
}

export default App;
