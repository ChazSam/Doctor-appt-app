import { Outlet, useOutletContext, useNavigate } from "react-router-dom"
import {Formik, useFormik} from 'formik'
import * as yup from 'yup';


function Review(){
    const {user, setUser, listDoctors, setListDoctors} = useOutletContext()
    const navigate = useNavigate()
    const numbers=[1,2,3,4,5]

    const formSchema = yup.object().shape({
        user_id: yup.number().required("Please log in"),
        doctor_id: yup.string().required("Please select a doctor"),
        score: yup.number().required("Please select a score"),
        review: yup.string().required("Please tell us your review of the doctor."),
      });

    function checkIfReviewExists(doctorId){
        return user.reviews.some(review => review.doctor_id === doctorId)
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
            // values.doctor_id = parseInt(values.doctor_id)
            
            fetch('/reviews', {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2)
            }) .then((r) => {

                if (r.ok) {
                    r.json().then((newReview) => {
                        setUser((prevUser) => ({
                            ...prevUser,
                            reviews: [...prevUser.reviews, newReview]
                        }))

                        setListDoctors((prevDoc) => {
                            const newListDoctors = prevDoc.map(doctor => {
                                if (doctor.id === newReview.doctor_id) {
                                    return {
                                        ...doctor,
                                        reviews: [...doctor.reviews, newReview]
                                    }
                                }
                                return doctor;
                            })
                            return newListDoctors;
                        })

                        navigate('/account')
                        window.alert("review added")
                    })
                } else {
                    r.json().then((err) => console.log(err.error));
                }
            })
        }
    })


    if (!user) {
        return <div>Loading...</div>}

    return (
        <>

        <h1>Review Page</h1>
        <h2>Add a Review</h2>


        <form onSubmit={formik.handleSubmit}>
            <p>Select a doctor</p>
            <select id="doctor_id" onChange={formik.handleChange} value={formik.values.doctor_id}>
                <option id='' value="">--</option>
                {listDoctors.map((doctor)=> (
                    <option key={doctor.id} value={doctor.id} disabled={checkIfReviewExists(doctor.id)}>{doctor.name} - {doctor.department}</option>
                ))}
            </select>
            <p style={{ color: "red" }}> {formik.errors.doctor_id}</p>

            <p>Score</p>
                <select id="score" onChange={formik.handleChange} value={formik.values.score}>
                    <option id ="" value="">--</option>
                        {numbers.map((x)=>(
                            <option key={x} value={x} onChange={formik.handleChange}>{x}</option>
                                ))}
                </select>
                <p style={{ color: "red" }}> {formik.errors.score}</p>                        
            <p>Enter your review</p>
                <input id='review' onChange={formik.handleChange} value={formik.values.review}></input>
                    <p></p>
                <p style={{ color: "red" }}> {formik.errors.review}</p>
                <button type='Submit'>Submit</button>
        </form>
        
        </>
    )

}

export default Review