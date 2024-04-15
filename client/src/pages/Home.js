import {useState, useEffect} from 'react';
import NavBar from "../components/NavBar";

function Home(){


    return(
        <>
            <header>
                <NavBar/>
            </header>
            <h1>Home Page</h1>
            <h2>Welcome to the Doctor medical system. Please login or search our doctors to find the best doctor for you!</h2>
        </>
    )
}

export default Home