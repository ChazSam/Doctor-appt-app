import { Outlet, useOutletContext, useNavigate } from "react-router-dom"
import {Formik, useFormik} from 'formik'
import * as yup from 'yup';
import { useState } from "react";

function Review(){

    const {user, setUser, setIsLoggedIn, listDoctors} = useOutletContext()
    const navigate = useNavigate()
    const numbers=[1,2,3,4,5]
    const [selectReview, setSelectReview] = useState("")
    // console.log(user)

    const formSchema = yup.object().shape({
        user_id: yup.number().required("Please log in"),
        doctor_id: yup.string().required("Please select a doctor"),
        score: yup.number().required("Please select a score"),
        review: yup.string().required("Please tell us your review of the doctor."),
      });

    function editReview(){
        const review = user.reviews[selectReview-1]
        console.log(review)
        formik.setValues({
            user_id:user.id,
            doctor_id:review.doctor_id,
            score:review.score,
            review:review.review,
        })
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
            values.score = parseInt(values.score)
            debugger
            fetch('/reviews', {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2)
            }) .then((r) => {
 
                if(r.ok){
                    r.json().then((newReview) => {
          
                        setUser((prevUser) => {
                            return {
                                ...prevUser,
                                review: [...prevUser.reviews, newReview]
                            }
                        })
                    })
                    .then(navigate('/account'))

                }else{
                    r.json().then((err) => console.log(err.error))
                }})
        }
    })
    console.log(formik.values)

    return (
        <>

        <h1>Review Page</h1>

        <div>
            {/* {user.reviews.map((review)=>(
                    <div key={review.id}>
                        <p>Doctor: {review.doctor.name}</p>
                        <p>Score: {review.score}</p>
                        <p>Review: {review.review}</p>
                    </div>
                ))} */}
            <button>Add a Review</button>
        </div>

        <form onSubmit={formik.handleSubmit}>

            <select id="doctor_id" onChange={formik.handleChange} value={formik.values.doctor_id}>
                <option id='' value="">--</option>
                {listDoctors.map((doctor)=> (
                    <option key={doctor.id} value={doctor.id}>{doctor.name} - {doctor.department}</option>
                ))}
            </select>
            <p style={{ color: "red" }}> {formik.errors.doctor_id}</p>

            <p>score</p>
                <select id="score" onChange={formik.handleChange} value={formik.values.score}>
                    <option id ="" value="">--</option>
                        {numbers.map((x)=>(
                            <option key={x} value={x} onChange={formik.handleChange}>{x}</option>
                                ))}
                </select>

            <p>Enter your review</p>
                <input id='review' onChange={formik.handleChange} value={formik.values.review}></input>
                    <p></p>
                <button type='Submit'>Submit</button>
        </form>
        <p></p>
        <div>
                <select onChange={(e)=>setSelectReview(e.target.value)}>
                    <option key="0" value="">Choose a review</option>
                    
                {user.reviews.map((review)=>(
                    <option key={review.id} value={review.id}>{review.doctor.name}</option>
                ))}
                </select>

                <button onClick={editReview} >Edit a Review</button>
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