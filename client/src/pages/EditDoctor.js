import React from "react";
import  {useState} from "react";
import {Formik, useFormik} from 'formik'
import * as yup from 'yup';
import { Outlet, useOutletContext, useNavigate } from "react-router-dom"

function AddDoctor(){
    const [selectDoctor, setSelectDoctor] = useState(null)
    const {listDoctors, setListDoctors} = useOutletContext()
    const [error, setError] = useState("")
    const navigate = useNavigate()

    function handleSelectDoctor(e){
        
        if (e.target.value === ""){
            return setSelectDoctor(null)
        }

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
            if (selectDoctor===null){
                return setError("Select a doctor before submitting")
            }
            console.log(values)
            fetch(`/doctor/${selectDoctor.id}`, {
                method:"PATCH",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2)
            }) .then((r) => {
 
                if(r.ok){
                    r.json().then((updatedDoctor)=> {
                        setListDoctors((prevDoctors) => {
                            return prevDoctors.map((doctor) => {
                                if (doctor.id === updatedDoctor.id) {
                                    return updatedDoctor
                                } else {
                                    return doctor
                                }
                            });
                        });
                    }).then(navigate("/admin"))   
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
                            
        <p style={{color: "red"}}>{error}</p>

        <form onSubmit={formik.handleSubmit}> 
            <p>Enter an Name:</p>
            <input id='name' value={formik.values.name} onChange={formik.handleChange}></input>
            <p style={{ color: "red" }}> {formik.errors.name}</p>
            <p>Enter an image url:</p>
            <input id='image_url' value={formik.values.image_url} onChange={formik.handleChange}></input>
            <p>Enter an Department Name:</p>
            <input id='department'value={formik.values.department} onChange={formik.handleChange}></input>
            <p style={{ color: "red" }}> {formik.errors.department}</p>
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

