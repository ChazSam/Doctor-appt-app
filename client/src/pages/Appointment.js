import {useState, useEffect} from 'react';
import Calendar from 'react-calendar'
import { Outlet, useOutletContext } from "react-router-dom"

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];
function Appointment(){
    const {user, onLogin, listDoctors} = useOutletContext()
    const [calendar, setCalendar] = useState(new Date())

    return(
        <>
        <h1>Appointment Page</h1>
            <div>
                <h2>Please log in or create an account to schedule an appointment</h2>
            </div>

            <div>
                <h2>Select a Doctor</h2>
                <select>
                    <option>--</option>
                    {listDoctors.map((doctor)=> (
                        
                            <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                    ))}
                </select>
                <p></p>
                <Calendar value={calendar} onChange={setCalendar}></Calendar>
            </div>
        </>
    )
}

export default Appointment