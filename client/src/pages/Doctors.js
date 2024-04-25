import {useState, useEffect} from 'react';
import NavBar from "../components/NavBar";


function Doctors(){

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
        <>
            <header>
                <NavBar/>
            </header>
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