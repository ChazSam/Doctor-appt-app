import { NavLink } from "react-router-dom";
import "./NavBar.css";
    
function NavBar({isLoggedIn, user}){

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
            {!isLoggedIn&& (

                <>
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
            </>
                )}
            {isLoggedIn && user.id!==1 && (

                <>
                <NavLink
                    to="/appointment"
                    className="nav-link"
                    >Appointments
                </NavLink>

                <NavLink
                    to="/account"
                    className="nav-link"
                    >Account
                </NavLink>
            </>
            )}
            {user.id === 1 &&(

                <>
                <NavLink
                    to="/admin"
                    className="nav-link"
                    >Admin
                </NavLink>
                </>
                )}
            
        </nav>
    )
}

export default NavBar