import { NavLink } from "react-router-dom";
import "./NavBar.css";
    
function NavBar({isLoggedIn, user}){

    return (
        <nav className="navbar">
            <img  className="navbar-logo" src="https://i.pinimg.com/736x/30/7e/69/307e6906c251d91bb6202b3dd4736d7a.jpg"></img>
            <p className='navbar-text'>Doctor Medical System</p>

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