import {useState, useEffect} from 'react';
import {Formik, useFormik} from 'formik'
import * as yup from 'yup';
import NavBar from "../components/NavBar";

 function Signup () {

    const [signUp, setSignUp] = useState([{}])
    const [refreshPage, setRefreshPage] = useState(false);

    useEffect(() => {
        console.log("FETCH! ");
        fetch("/users")
          .then((res) => res.json())
          .then((data) => {
            setSignUp(data);
            console.log(data);
          });
      }, [refreshPage]);

      const formSchema = yup.object().shape({
        userName: yup.string().required("Must enter a user name at least 8 characters long").min(8),
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
            birthday:"",
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
                    if (res.status ==200){
                        setRefreshPage(!refreshPage)
                    }
                    
                }
            )
        }
    })

    function isLeapYear(year) {
        return((year % 4 === 0 && year % 100 !== 0) || year === 2000) ? 29 : 28
    }

    return(
        <div>
            <header>
                <NavBar/>
            </header>
            
            <h1>Signup page</h1>
                <form onSubmit={Formik.handleSubmit}>

                    <div>
                        <p>User Name</p>
                        <input id='userName' name='userName' onChange={formik.handleChange} value={formik.values.userName}/>
                        <p>Password</p>
                        <input id='password' name='password' onChange={formik.handleChange} value={formik.values.password}/>
                        <p>First Name</p>
                        <input id='firstName' name='firstName' onChange={formik.handleChange} value={formik.values.lastName}/>
                        <p>Last Name</p>
                        <input id='lastName' name='lastName' onChange={formik.handleChange} value={formik.values.lastName}/>
                        <p>Birthday</p>
                        <select>
                            <option value=""></option>
                            <option value='1' data-days="31">Jan</option>
                            <option value="2" data-days={isLeapYear}>Feb</option>
                            <option value="3" data-days="31">Mar</option>
                            <option value="4" data-days="30">Apr</option>
                            <option value="5" data-days="31">May</option>
                            <option value="6" data-days="30">Jun</option>
                            <option value="7" data-days="31">Jul</option>
                            <option value="8" data-days="31">Aug</option>
                            <option value="9" data-days="31">Sep</option>
                            <option value="10" data-days="31">Oct</option>
                            <option value="11" data-days="30">Nov</option>
                            <option value="12" data-days="31">Dec</option>
            
                        </select>
                        
                        <select>
                            <option value=""></option>

                        </select>
                        
                        <select>
                            <option value=""></option>
                        </select>
                        <p>Sex</p>
                        <select name='sex' id='user-sex'>
                            <option value=""></option>
                            <option value="M">M</option>
                            <option value="F">F</option>
                        </select>
                        <p>The reason you need to see a doctor</p>
                        <input/>
        
                    </div>

                        <p></p>
                        <button type='Submit'>Submit</button>
                </form>
        </div>
    )
}

export default Signup