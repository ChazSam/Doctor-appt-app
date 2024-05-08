import React from "react";
import  {useState} from "react";
import {Formik, useFormik} from 'formik'
import * as yup from 'yup';
import { Outlet, useOutletContext } from "react-router-dom"

function AddDoctor(){
    const [errors, setErrors] = useState([])
    const [selectDoctor, setSelectDoctor] = useState(null)
    const [doctor, setDoctor] = useState([])
    const {listDoctors, setListDoctors} = useOutletContext()
    
    function handleSelectDoctor(e){
        const selectedDoctorId = e.target.value
        const doctor = listDoctors[selectedDoctorId-1]
        setSelectDoctor(doctor)
        formik.setValues({
            name:doctor.name,
            image_url:doctor.image_url,
            department:doctor.department,
            bio:doctor.bio,
            tagline:doctor.tagline
        })
    }

    const formSchema = yup.object().shape({
        name: yup.string().required("Please enter an Doctor name"),
        image_url: yup.string(),
        department: yup.string().required("Please enter the doctors department"),
        bio: yup.string(),
        tagline: yup.string()
      });


    const formik = useFormik({

        initialValues:{
            name:"",
            image_url:"",
            department:"",
            bio:"",
            tagline:""
        },

        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/edit-doctor/${selectDoctor.id}`, {
                method:"PATCH",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2)
            }) .then((r) => {
 
                if(r.ok){
                    r.json().then((doc) => console.log(doc))

                }else{
                    r.json().then((err) => console.log(err.error))
                }})
        }
    })
    
    return (
        <>
        <h1>Edit Doctor</h1>

            <select id="doctor_id" onChange={handleSelectDoctor} >
                            <option id='' value="">--Select a Doctor--</option>
                            {listDoctors.map((doctor)=> (
                                
                                <option key={doctor.id} value={doctor.id}>{doctor.name} - {doctor.department}</option>
                            ))}
                        </select>
            {/* <button onClick={handlePatch}>Edit doctor</button> */}
        <p></p>

        <form onSubmit={formik.handleSubmit}> 
            <p>Enter an Name:</p>
            <input id='name' value={formik.values.name} onChange={formik.handleChange}></input>
            <p>Enter an image url:</p>
            <input id='image_url' value={formik.values.image_url} onChange={formik.handleChange}></input>
            <p>Enter an Department Name:</p>
            <input id='department'value={formik.values.department} onChange={formik.handleChange}></input>
            <p>Enter an doctors biograpy:</p>
            <input id='bio' value={formik.values.bio} onChange={formik.handleChange}></input>
            <p>Enter an doctors tagline:</p>
            <input id='tagline' value={formik.values.tagline} onChange={formik.handleChange}></input>
            <p></p>
            <button type='submit'>submit</button>
        </form>

        <p></p>


  
            </>
    )
}

export default AddDoctor

// id = db.Column(db.Integer, primary_key =True)
// name = db.Column(db.Integer, unique=True, nullable=False)
// image_url = db.Column(db.String)
// department = db.Column(db.String, nullable=False)
// bio = db.Column(db.String)
// tagline = db.Column(db.String)