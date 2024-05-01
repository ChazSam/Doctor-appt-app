import {useState, useEffect} from 'react';
import { Outlet, useOutletContext } from "react-router-dom"


function Doctors(){
    const {listDoctors} = useOutletContext()


    return(
        <>

            <h1>Doctor Page</h1>
            {listDoctors.map((doctor)=>(
                <div key={doctor.id}>
                    <h2>{doctor.name}</h2>
                    <img src={doctor.image_url}></img>
                    <h3>Department: {doctor.department}</h3>
                    <p>{doctor.bio}</p>
                    <p style={{fontStyle: 'italic'}}>{doctor.tagline ? doctor.tagline : "doctor of medicine"}</p>
                </div>
            ))}
        </>
    )
}

export default Doctors