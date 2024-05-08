
import { Outlet, useOutletContext, Link, useNavigate } from "react-router-dom"
import {useState} from 'react'

function Admin(){
    const {onLogin, setIsLoggedIn, listDoctors, setListDoctors} = useOutletContext()
    const navigate = useNavigate()
    const [selectDoctor, setSelectDoctor]= useState()

    function handleDelete(e){
        console.log(e.target.value)
        fetch(`/doctor/${selectDoctor}`,{
            method: "DELETE"
        }).then((r)=>{
            if(r.ok){
                setListDoctors((prevListDoctors) => {
                    return prevListDoctors.filter((doctor) => doctor.id !== parseInt(selectDoctor));
                });
            } else {
            
                console.error("Failed to delete doctor");
            }
        });
    }
    
    console.log(selectDoctor)

    function handleLogout() {
        fetch("/logout", {
          method: "DELETE",
        }).then(() => onLogin(""))
          .then(setIsLoggedIn(false))
          .then(navigate('/'))
      }

    return (
        <div>
            <h1>Admin Page</h1>
        
                <button onClick={()=>navigate('/admin/add-doctor')}>Add Doctor</button>
    
         
                <button onClick={()=>navigate('/admin/edit-doctor')}>Edit Doctor</button> 
                <select id="doctor_id" onChange={(e)=>setSelectDoctor(e.target.value)} >
                            <option id='' value="">--Select a Doctor--</option>
                            {listDoctors.map((doctor)=> (
                                
                                <option key={doctor.id} value={doctor.id}>{doctor.name} - {doctor.department}</option>
                            ))}
                        </select>
                <button id="delete" onClick={handleDelete}>Delete Doctor</button>  

                <button onClick={handleLogout}>Log Out</button>  
            
        </div>
    )
}

export default Admin