import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar(){

    return (
        <nav>
            <NavLink
            to="/"
            className="nav-link"
            >Home
            </NavLink>
            <NavLink
            to="/doctors"
            className="nav-link"
            >Doctors
            </NavLink>
            <NavLink
            to="/login"
            className="nav-link"
            >Login
            </NavLink>
        </nav>
    )
}

export default NavBar