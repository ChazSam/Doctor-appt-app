
import { Outlet, useOutletContext, Link, useNavigate } from "react-router-dom"

function Admin(){
    const {onLogin, setIsLoggedIn} = useOutletContext()
    const navigate = useNavigate()

    function handleLogout() {
        fetch("/logout", {
          method: "DELETE",
        }).then(() => onLogin(""))
          .then(setIsLoggedIn(false))
          .then(navigate('/'))
      }
      
    return (
        <div>
            <h1>Admin Page</h1>
        
                <button onClick={()=>navigate('/admin/add-doctor')}>Add Doctor</button>
    
         
                <button onClick={()=>navigate('/admin/edit-doctor')}>Edit Doctor</button> 
            
                <button>Delete Doctor</button>  

                <button onClick={handleLogout}>Log Out</button>  
            
        </div>
    )
}

export default Admin