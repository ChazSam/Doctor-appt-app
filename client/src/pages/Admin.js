
import { Outlet, useOutletContext, Link } from "react-router-dom"

function Admin(){
    const {onLogin, setIsLoggedIn} = useOutletContext()

    function handleLogout() {
        fetch("/logout", {
          method: "DELETE",
        }).then(() => onLogin(""))
          .then(setIsLoggedIn(false))
      }
    return (
        <div>
            <h1>Admin Page</h1>
            <Link to="/admin/add-doctor">
                <button>Add Doctor</button>
            </Link>
            <Link to='edit-doctor'>
                <button>Edit Doctor</button> 
            </Link >
                <button>Delete Doctor</button>  
            <Link to='/'>
                <button onClick={handleLogout}>Log Out</button>  
            </Link>
        </div>
    )
}

export default Admin