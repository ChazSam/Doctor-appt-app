import { Outlet, useOutletContext, useNavigate } from "react-router-dom"
import {Formik, useFormik} from 'formik'
import * as yup from 'yup';
import { useState } from "react";

function EditReview(){

    const {user, setUser, listDoctors} = useOutletContext()
    const navigate = useNavigate()
    const numbers=[1,2,3,4,5]
    const [selectReview, setSelectReview] = useState("")
    const [error, setError] = useState("")
    

    const formSchema = yup.object().shape({
        user_id: yup.number().required("Please log in"),
        doctor_id: yup.string().required("Please select a doctor"),
        score: yup.number().required("Please select a score"),
        review: yup.string().required("Please tell us your review of the doctor."),
      });

    function editReview(){
        if (selectReview === ""){
            return setError("Please select a review")
        }

        setError("")
        const review = user.reviews.find((x) => x.id === parseInt(selectReview))

        formik.setValues({
            user_id:user.id,
            doctor_id:review.doctor_id,
            score:review.score,
            review:review.review,
        })
    }


    function handleDelete(){
        const value = parseInt(selectReview)
        
        fetch(`/reviews/${value}`, {
            method: "DELETE"

        }).then((r)=>{
            if(r.ok){
                setUser((prevUser) => ({
                     ...prevUser,
                    reviews: prevUser.reviews.filter(
                        (review) => review.id !== parseInt(value)
                    )
                }))
            
                navigate("/account")
                window.alert("Review deleted")
            } else {
                
                console.error("Failed to delete appointment")
            }
        });
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
            const reviewId = parseInt(selectReview)

            fetch(`/reviews/${reviewId}`, {
                method:"PATCH",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2)
            }).then((r) => {
                if (r.ok) {
                    r.json().then((updateReview) => {
                        const updatedReviews = user.reviews.map((review) =>
                            review.id === reviewId ? updateReview : review
                        );

                        setUser((prevUser) => ({
                            ...prevUser,
                            reviews: updatedReviews
                        }));

                        navigate("/account");
                    }).catch((err) => console.log(err));
                } else {
                    r.json().then((err) => console.log(err.error));
                }
            });
        }
    });
    
    if (!user) {
        return <div>Loading...</div>;
      }
   
    return (
        <>

        <h1>Edit Review Page</h1>

        <h2>Select a review</h2>

        <form onSubmit={formik.handleSubmit}>
        
            <div>
                    <select onChange={(e)=>setSelectReview(e.target.value)}>
                        <option key="" value="">Choose a review</option>
                        
                    {user.reviews.map((review)=>(
                        <option key={review.id} value={review.id}>{review.doctor.name}</option>
                    ))}
                    </select>

                    <button type="button" onClick={editReview} disabled={user.reviews.length === 0}>Edit Review</button>
                <p></p>
            </div>

        <div>
                <p style={{ color: "red" }}>{error}</p>
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
                        {numbers.map((num)=>(
                            <option key={num} value={num} onChange={formik.handleChange}>{num}</option>
                        ))}
                </select>
                <p style={{ color: "red" }}> {formik.errors.score}</p>            
            <p>Enter your review</p>
                <input id='review' onChange={formik.handleChange} value={formik.values.review}></input>
                    <p></p>
                <p style={{ color: "red" }}> {formik.errors.review}</p>
                <button type='Submit'>Submit</button>
        </div>
        <p></p>

                </form>

        <div>

            <h2>Delete a Review</h2>
            <select onChange={(e)=>setSelectReview(e.target.value)}>
                <option value="">Select a Review</option>
                {user.reviews.map((review, index)=>(
                    <option key={index} value={review.id}>{review.doctor.name}</option>
                ))}
                    </select>


            <button type="button" onClick={handleDelete} disabled={user.reviews.length === 0}>Delete a Review</button>
           
        </div>
        
        
        </>
    )

}

export default EditReview