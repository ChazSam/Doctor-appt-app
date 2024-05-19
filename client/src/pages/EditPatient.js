import { useState } from 'react';
import { Formik, useFormik } from 'formik'
import { useOutletContext } from "react-router-dom"
import * as yup from 'yup';


function Signup () {
    const { user, setUser } = useOutletContext()
    const [birthday, setBirthday] =  useState({
        day:"",
        month:"",
        year:""
    })
    

    const formSchema = yup.object().shape({
        username: yup.string().required("Uesrname must be at least 8 characters long").min(8),
        password: yup.string().required("Password must be at least 8 characters long").min(8),
        first_name: yup.string().required("Must enter a name"),
        last_name: yup.string().required("Must enter a name"),
        // birthdate: yup  // <- crashes formik for some reason
        //   .number()
        //   .positive()
        //   .integer()
        //   .required("Must enter age")
        //   .typeError("Please enter an Integer")
        //   .max(125),
      });

    const formik = useFormik({

        initialValues:{
            username:user.username,
            password:"",
            first_name:user.first_name,
            last_name:user.last_name,
            birthdate:'' ,
            sex:user.sex,
            bio:user.bio,
        },
        
        validationSchema: formSchema,

        onSubmit: (values) => {
            values.birthdate =`${birthday.year}-${birthday.month}-${birthday.day}`

            fetch(`/account/${user.id}`, {
                method:"PATCH",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2)
            }) .then((r) => {
 
                if(r.ok){
                    r.json().then((user) => setUser(user))

                }else{
                    r.json().then((err) => console.log(err.error))
                }})
        }
    })

    const years = Array.from({ length: 111 }, (_, index) => 2024 - index);


    function checkLeapYear(month , year){
        let x = 31
        let m = parseInt(month)
        let y = parseInt(year)

        if (m === 2 && ((y % 4 === 0 && y % 100 !== 0) || y === 2000)){
            x = 29
        }  
        else if( m === 2){
            x = 28
        }     
        else if( m === 3 || m === 5 || m === 10){
            x = 30
        }

        const days = Array.from({ length: x }, (_, index) => index + 1);

        return days.map((day)=>( 
                <option key={day} value={day}>{day}</option>
            )
        )
    }

    
    function handleChange(e){
        setBirthday({
            ...birthday,
            [e.target.name] : e.target.value
        })
    }

    const dayInMonth = checkLeapYear(birthday.month, birthday.year)
    console.log(birthday)
    return(
        <div>
            <h1>Account Information</h1>
                <form onSubmit={formik.handleSubmit}>

                    <div>
                        <p>User Name</p>
                            <input id='username' name='username' onChange={formik.handleChange} value={formik.values.username}/>
                                <p style={{ color: "red" }}> {formik.errors.username}</p>

                        <p>Password</p>
                            <input id='password' name='password' onChange={formik.handleChange} value={formik.values.password}/>
                                <p style={{ color: "red" }}> {formik.errors.password}</p>

                        <p>First Name</p>
                            <input id='first_name' name='first_name' onChange={formik.handleChange} value={formik.values.first_name}/>
                                <p style={{ color: "red" }}> {formik.errors.first_name}</p>

                        <p>Last Name</p>
                            <input id='last_name' name='last_name' onChange={formik.handleChange} value={formik.values.last_name}/>
                            <p style={{ color: "red" }}> {formik.errors.last_name}</p>

                        <p>Birthday</p>
                            <select name="month" value={birthday.month} onChange={handleChange}>
                                <option value="">---</option>
                                <option id="Jan" value='0' >Jan</option>
                                <option id="Feb" value="1" >Feb</option>
                                <option id="Mar" value="2" >Mar</option>
                                <option id="Apr" value="3" >Apr</option>
                                <option id="May" value="4" >May</option>
                                <option id="Jun" value="5" >Jun</option>
                                <option id="Jul" value="6" >Jul</option>
                                <option id="Aug" value="7" >Aug</option>
                                <option id="Sep" value="8" >Sep</option>
                                <option id="Oct" value="9" >Oct</option>
                                <option id="Nov" value="10" >Nov</option>
                                <option id="Dec" value="11" >Dec</option>
    
                            </select>
                        
                        <select name='day' value={birthday.day} onChange={handleChange}>
                            <option value="">---</option>
                            {dayInMonth}
                        </select>
                        
                        <select name="year" value={birthday.year} onChange={handleChange}>
                            <option value="">---</option>
                            {years.map((year)=>( 
                                <option key={year}  value={year}>{year}</option>
                            ))}

                        </select>
                        <p style={{ color: "red" }}> {formik.errors.birthdate}</p>
                        
                        <p>Sex</p>
                            <select name='sex' id='user-sex' value={formik.values.sex} onChange={formik.handleChange}>
                                <option value="">---</option>
                                <option value="M">M</option>
                                <option value="F">F</option>
                            </select>
                            <p style={{ color: "red" }}> {formik.errors.sex}</p>

                        <p>The reason you need to see a doctor</p>
                            <input id="bio" value={formik.values.bio} onChange={formik.handleChange}/>
                            <p style={{ color: "red" }}> {formik.errors.bio}</p>

                    </div>

                        <p></p>
                        <button type='Submit'>Submit</button>
                </form>
        </div>
    )
}

export default Signup