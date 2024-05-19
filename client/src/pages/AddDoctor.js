import React from "react";

import {Formik, useFormik} from 'formik'
import * as yup from 'yup';
import { Outlet, useOutletContext, useNavigate } from "react-router-dom"

function AddDoctor(){
    const {setListDoctors} = useOutletContext()
    const navigate = useNavigate()

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
            fetch("/add-doctor", {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2)
            }) .then((r) => {
 
                if(r.ok){
                    r.json().then((doc) => setListDoctors((prevDocs)=>[...prevDocs, doc]
                        )) 
                        .then(navigate('/doctors'))

                }else{
                    r.json().then((err) => console.log(err.error))
                }})
        }
    })

    return (
        <>
        <h1>Add a Doctor</h1>
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
            </>
    )
}

export default AddDoctor
