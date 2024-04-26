import React, { useEffect, useState } from "react";
import { Switch, Route, Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function App() {
  const [listDoctors, setListDoctors] = useState([])
   
  useEffect(() => {
      console.log("FETCH! ");
      fetch("/doctor")
        .then((res) => res.json())
        .then((data) => {
          setListDoctors(data);
          console.log(data);
        });
    }, []);

  return(
    <div>
      <header>
        <NavBar/>
      </header>
      <Outlet context={listDoctors}/>

    </div>

  ) 
  
    
}

export default App;
