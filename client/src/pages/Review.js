import { Outlet, useOutletContext, useNavigate } from "react-router-dom"
import {Formik, useFormik} from 'formik'
import * as yup from 'yup';
import { useState } from "react";

function Review(){

    const {user, setUser, setIsLoggedIn, listDoctors} = useOutletContext()
    const navigate = useNavigate()
    const numbers=[1,2,3,4,5]
    const [selectReview, setSelectReview] = useState("")
    console.log(user.reviews[0])

    const formSchema = yup.object().shape({
        user_id: yup.number().required("Please log in"),
        doctor_id: yup.string().required("Please select a doctor"),
        score: yup.number().required("Please select a score"),
        review: yup.string().required("Please tell us your review of the doctor."),
      });

    function editReview(e){
        const review = user.reviews[e]
        console.log(e)
        // formik.setValues({
        //     user_id:user.id,
        //     doctor_id:review.doctor_id,
        //     score:review.score,
        //     review:review.review,
        // })
    }
    function handleDelete(){
        
    }
    const formik = useFormik({

        initialValues:{
            user_id:user.id,
            doctor_id:"",
            score:"",
            review:""
        },

        validationSchema: formSchema,

        onSubmit: (values) => {
            
            fetch("/create", {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2)
            }) .then((r) => {
 
                if(r.ok){
                    // r.json().then((appt) => {
          
                    //     setUser((prevUser) => {
                    //         return {
                    //             ...prevUser,
                    //             appointments: [...prevUser.appointments, appt]
                    //         }
                    //     })
                    // })
                    // .then(navigate('/account'))

                }else{
                    r.json().then((err) => console.log(err.error))
                }})
        }
    })
    return (
        <>
        <h1>Review Page</h1>
        {user.reviews.map((review)=>(
                <div key={review.id}>
                    <p>Doctor: {review.doctor.name}</p>
                    <p>Score: {review.score}</p>
                    <p>Review: {review.review}</p>
                </div>
            ))}
        <button>Add a Review</button>
        <form>

        <select id="doctor_id" 
        
        >
        <option id='' value="">--</option>
        {listDoctors.map((doctor)=> (
            <option key={doctor.id} value={doctor.id}>{doctor.name} - {doctor.department}</option>
        ))}
    </select>

                    <p>score</p>
                    <select>
                        <option>--</option>
                        {numbers.map((x)=>(
                            <option key={x} value={x} onChange={formik.handleChange}>{x}</option>
                        ))}
                    </select>
                    <p>Enter your review</p>
                    <input></input>
                    <p></p>
                    <button type='Submit'>Submit</button>
        </form>
        <p></p>
        <div>
                <select onChange={(e)=>console.log(e.target.value)}>
                    <option key="0">Choose a review</option>
                    
                {user.reviews.map((review)=>(
                    <option key={review.id} value={review.id}>{review.doctor.name}</option>
                ))}
                </select>

                <button onClick={(e) => editReview(e.target.value)} >Edit a Review</button>
            <p></p>
            <select>
            {user.reviews.map((review)=>(
                    <option key={review.id} value={review.id}>{review.doctor.name}</option>
                ))}
                </select>
            <button>Delete a Review</button>
        </div>
        
        
        </>
    )

}

export default Review