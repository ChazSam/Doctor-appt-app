
import { useOutletContext } from "react-router-dom"


function ListDoctors(){
    const {listDoctors} = useOutletContext()


    function scores(reviews){
        if(reviews.length === 0) return "No reviews yet"
        const totalScore = reviews.reduce((acc, review) => acc + review.score, 0)
        return `${(totalScore / reviews.length).toFixed(1)} / 5`
    }   
        
    return(
        <>

            <h1>Doctor Page</h1>
                <div className="doctor-grid">

                {listDoctors.map((doctor)=>(
                    <div key={doctor.id} className="doctor-card">
                        <h2>{doctor.name}</h2>
                        <img src={doctor.image_url}></img>
                        <h3>Department: {doctor.department}</h3>
                        <p>{doctor.bio}</p>
                        <p>Doctor Score: {scores(doctor.reviews)}</p>
                        <p style={{fontStyle: 'italic'}}>{doctor.tagline ? doctor.tagline : "doctor of medicine"}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ListDoctors