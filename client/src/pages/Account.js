
import { Outlet, useOutletContext, useNavigate } from "react-router-dom"


function Account(){
    const {user, setUser, setIsLoggedIn, listDoctors} = useOutletContext()
    const navigate = useNavigate()
    console.log(user, listDoctors)

    function handleLogout() {
        fetch("/logout", {
          method: "DELETE",
        }).then(() => setUser(""))
          .then(setIsLoggedIn(false))
          .then(navigate('/'))
      }

    function handleDelete(){
        if(window.confirm("Are you sure you want to delete your account?")){
            fetch(`/account/${user.id}`, {
                method: "DELETE",
              }).then(() => setUser(""))
                .then(setIsLoggedIn(false))
                .then(navigate('/'))
        }
    }

    
    function setDate(e){
        const date = new Date(e)


        const {year, month, day} = {
            year: date.getFullYear(),
            month: date.getMonth(), 
            day: date.getDate(),
        }
        return `${month+1}-${day}-${year}`
    }
    
    const getDoctorName = (doctorId) => {
        const doctor = listDoctors.find(doc => doc.id === doctorId);
        return doctor ? doctor.name : 'Unknown Doctor';
      }

    if (!user) {
        return <div>Loading...</div>}

    
    return (
        <>           
        <h1>Account Page</h1>
        {!user && (
            <div>
                <h2>Please log in or sign up to create an account</h2>
            </div>
        )}

        {user && (

                <div>
                    <h2>Name: {user.first_name} {user.last_name}</h2>
                    <h3>Upcoming Appointments:</h3>
                    
                    <ul>
                            {user?.appointments.map((appointment, index) => (
                                <li key={index}>
                                    <strong>Doctor:</strong> {appointment.doctor_id ? getDoctorName(appointment.doctor_id): "error" }<br />
                                    <strong>Apointment Date:</strong> {setDate(appointment.date)}<br />
                                    <p></p>
                                </li>
                            ))}
                        </ul>

                    <button id="edit-account" onClick={()=>navigate("/account/settings")}>Change Account Details</button>
                        <p></p>
                        
                    <button id="edit-appointment" onClick={()=>navigate("/account/appointment")} disabled={user.appointments.length === 0}>Change An Appointment</button>
                        <p></p>
                    <button id="review" onClick={()=>navigate("/account/reviews")}>Add a Review</button>
                        <p></p>
                    <button id="edit-review" onClick={()=>navigate("/account/edit-review")}disabled={user.reviews.length === 0}>Edit Reviews</button>
                        <p></p>
                        <button id='logout' onClick={handleLogout} >Log out</button>
                    
                        <p></p>
                    <button id='delete-account' onClick={handleDelete}>Delete Account</button>
                    
                </div>
             )}
        </>
    )
}
export default Account