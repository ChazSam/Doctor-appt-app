import {useState, useEffect} from 'react';
import Calendar from 'react-calendar'

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];
function Appointment(){

    const [calendar, setCalendar] = useState(new Date())
    return(
        <>

            <h1>Appointment Page</h1>
            <h2>Please log in or create an account to schedule an appointment</h2>
            <Calendar value={calendar} onChange={setCalendar}></Calendar>
        </>
    )
}

export default Appointment