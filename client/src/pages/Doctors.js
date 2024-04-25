import {useState, useEffect} from 'react';
import NavBar from "../components/NavBar";


function Doctors(){

    const [listDoctors, setListDoctors] = useState([])
    const [refreshPage, setRefreshPage] = useState(false);


    useEffect(() => {
        console.log("FETCH! ");
        fetch("/doctor")
          .then((res) => res.json())
          .then((data) => {
            setListDoctors(data);
            console.log(data);
          });
      }, [refreshPage]);

    return(
        <>
            <header>
                <NavBar/>
            </header>
            <h1>Doctor Page</h1>

            {listDoctors.map((doctor)=>(
                <div>
                    <h2>{doctor.name}</h2>
                    <img src={doctor.image_url}></img>
                    <p>Department: {doctor.department}</p>
                    <p>{doctor.bio}</p>
                    <p>{doctor.tagline}</p>



                </div>
             
            ))}
            {/* <h2>Dr. Howard</h2>
            <h2>Dr. Fine</h2>
            <h2>Dr. Howard</h2>
            <img src='https://m.media-amazon.com/images/M/MV5BMzg1MzBjOGYtMjYyZi00YzM0LWIwMGQtMWU0NDc2ZGIxZGM1XkEyXkFqcGdeQXVyMDgyNjA5MA@@._V1_.jpg' alt='Some of the finest doctors!'></img> */}
        </>
    )
}

export default Doctors