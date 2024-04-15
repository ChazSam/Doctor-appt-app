import {useState, useEffect} from 'react';
import NavBar from "../components/NavBar";

function Doctors(){


    return(
        <>
            <header>
                <NavBar/>
            </header>
            <h1>Doctor Page</h1>
            <h2>Dr. Howard</h2>
            <h2>Dr. Fine</h2>
            <h2>Dr. Howard</h2>
            <img src='https://m.media-amazon.com/images/M/MV5BMzg1MzBjOGYtMjYyZi00YzM0LWIwMGQtMWU0NDc2ZGIxZGM1XkEyXkFqcGdeQXVyMDgyNjA5MA@@._V1_.jpg' alt='Some of the finest doctors!'></img>
        </>
    )
}

export default Doctors