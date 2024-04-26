import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar(){

    return (
        <nav className="navbar">
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

            <NavLink
                to="/signup"
                className="nav-link"
                >Signup
            </NavLink>

            <NavLink
                to="/appt"
                className="nav-link"
                >Appointments
            </NavLink>

            <NavLink
                to="/account"
                className="nav-link"
                >Account
            </NavLink>
            
        </nav>
    )
}

export default NavBar