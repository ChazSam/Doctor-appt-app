import {useState, useEffect} from 'react';
import {Formik, useFormik} from 'formik'
import * as yup from 'yup';
import NavBar from "../components/NavBar";
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'

function Signup () {

    const [signUp, setSignUp] = useState([])
    
    const [monthYear, setMonthYear] =  useState({
        day:"",
        month:"",
        year:""
    })
    const [refreshPage, setRefreshPage] = useState(false);

    useEffect(() => {
        // console.log("FETCH! ");
        fetch("/signup")
          .then((res) => res.json())
          .then((data) => {
            setSignUp(data);
            console.log(data);
          });
      }, [refreshPage]);

    const formSchema = yup.object().shape({
        userName: yup.string().required("Must enter a user name at least 8 characters long").min(8),
        password: yup.string().required("Must enter a user name at least 8 characters long").min(8),
        firstName: yup.string().required("Must enter a name").max(25),
        lastName: yup.string().required("Must enter a name").max(25),
        age: yup
          .number()
          .positive()
          .integer()
          .required("Must enter age")
          .typeError("Please enter an Integer")
          .max(125),
        reason : yup.string().required("Must enter a reason")
      });

    const formik = useFormik({
        initialValues:{
            userName:"",
            password:"",
            firstName:"",
            lastName:"",
            birthdate: new Date(2000,0,1),
            reason:"",
        },

        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("users", {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2)
            }) .then(
                (res) =>{
                    if (res.status == 200){
                        setRefreshPage(!refreshPage)
                    }
                    
                }
            )
        }
    })

    const years = Array.from({ length: 111 }, (_, index) => 2024 - index);

    const handleDateChange = (e) =>{
        console.log(monthYear)
        setMonthYear({
            ...monthYear,
            [e.target.name]:e.target.value,
            
        }
        );
    }

    function listDays(month , year){
        let x = 31

        if (month === 2 && ((year % 4 === 0 && year % 100 !== 0) || year === 2000)){
            x = 29
        }  
        else if( month === 2){
            x = 28
        }     
        else if( month === (4 || 6 || 11)){
            x = 30
        }

        const days = Array.from({ length: x }, (_, index) => index + 1);

        return days.map((day)=>( 
                <option key={day} value={day}>{day}</option>
            )
        )
    }

    const dayInMonth = listDays(monthYear.month, monthYear.year)
    console.log(formik.values)

    return(
        <div>
            <header>
                <NavBar/>
            </header>
            
            <h1>Signup page</h1>
                <form onSubmit={formik.handleSubmit}>

                    <div>
                        <p>User Name</p>
                            <input id='userName' name='userName' onChange={formik.handleChange} value={formik.values.userName}/>
                                <p style={{ color: "red" }}> {formik.errors.userName}</p>

                        <p>Password</p>
                            <input id='password' name='password' onChange={formik.handleChange} value={formik.values.password}/>
                                <p style={{ color: "red" }}> {formik.errors.password}</p>

                        <p>First Name</p>
                            <input id='firstName' name='firstName' onChange={formik.handleChange} value={formik.values.firstName}/>
                                <p style={{ color: "red" }}> {formik.errors.firstName}</p>

                        <p>Last Name</p>
                            <input id='lastName' name='lastName' onChange={formik.handleChange} value={formik.values.lastName}/>
                            <p style={{ color: "red" }}> {formik.errors.lastName}</p>

                        <p>Birthday</p>
                            <select value={monthYear.month} onChange={handleDateChange}>
                                <option value="">---</option>
                                <option value='1' >Jan</option>
                                <option value="2" >Feb</option>
                                <option value="3" >Mar</option>
                                <option value="4" >Apr</option>
                                <option value="5" >May</option>
                                <option value="6" >Jun</option>
                                <option value="7" >Jul</option>
                                <option value="8" >Aug</option>
                                <option value="9" >Sep</option>
                                <option value="10" >Oct</option>
                                <option value="11" >Nov</option>
                                <option value="12" >Dec</option>
    
                            </select>
                        
                        <select>
                            <option value="">---</option>
                            {dayInMonth}
                        </select>
                        
                        <select value={monthYear.year} onChange={handleDateChange}>
                            <option value="">---</option>
                            {years.map((year)=>( 
                                <option key={year} value={year}>{year}</option>
                            ))}

                        </select>
                        <p style={{ color: "red" }}> {formik.errors.birthday}</p>
                        <p>Sex</p>
                            <select name='sex' id='user-sex' value={formik.values.sex} onChange={formik.handleChange}>
                                <option value="">---</option>
                                <option value="M">M</option>
                                <option value="F">F</option>
                            </select>
                            <p style={{ color: "red" }}> {formik.errors.sex}</p>

                        <p>The reason you need to see a doctor</p>
                            <input id="reason" value={formik.values.reason} onChange={formik.handleChange}/>
                            <p style={{ color: "red" }}> {formik.errors.reason}</p>

                    </div>

                        <p></p>
                        <button type='Submit'>Submit</button>
                        
                </form>
        </div>
    )
}

export default Signup