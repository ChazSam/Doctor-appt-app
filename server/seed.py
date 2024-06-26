
from datetime import datetime
from models.doctor import Doctor
from models.user import User
from models.appointment import Appointment
from models.review import Review
from config import db
from app import app

with app.app_context():
    Doctor.query.delete()
    User.query.delete()
    Appointment.query.delete()
    Review.query.delete()


    doc1 = Doctor(
        name = "Dr. Moe Howard",
        image_url = "https://m.media-amazon.com/images/M/MV5BNjUwMjU4OTA4M15BMl5BanBnXkFtZTcwMzk4NjcxOA@@._V1_FMjpg_UX1000_.jpg",
        department = "Orthopedics",
        bio = "Dr. Moe Howard, an esteemed orthopedic surgeon, brings a blend of expertise and warmth to his practice, specializing in restoring mobility and alleviating musculoskeletal ailments. With a gentle demeanor and a dedication to patient-centric care, Dr. Howard is known for his ability to empower patients on their journey to recovery.",
        tagline = "Well, at least you could be seeing someone worse."
    )

    doc2 = Doctor(
        name = "Dr. Andre Drey",
        image_url = "https://www.billboard.com/wp-content/uploads/2024/03/dr-dre-dres-anatomy-sketch-jimmy-kimmel-live-1548.jpg?w=876",
        department = "Ophthalmology",
        bio = "Dr. Drey, renowned in the medical community as an ophthalmologist, expertly navigates the delicate intricacies of eye care with precision and compassion. With a distinguished career spanning decades, Dr. Drey has become a trusted figure in restoring vision and improving ocular health for countless patients.",
        tagline = "I'm not that Dr. Dre!"
    )

    doc3 = Doctor(
        name = "Dr. Douglas Ross",
        image_url = "https://upload.wikimedia.org/wikipedia/en/2/27/DougRoss.jpg",
        department = "Pediatrics / Emergency Medicine",
        bio = "Dr. Douglas Ross is a pediatric fellow, employed by the pediatric service, but works in the ER. He is later promoted to a pediatric attending in the ER. Doug's estranged son was a large part of the reason that he became a pediatrician.",
        tagline = "I'm the serious one."
    )

    doc4 = Doctor(
        name = "Dr. Albert Von Yank",
        image_url = "https://is1-ssl.mzstatic.com/image/thumb/Video/v4/84/eb/a6/84eba6bc-f63b-1317-6cb9-0a827705cad3/1111103767080101VIC.jpg/1200x630mv.jpg",
        department = "Surgery",
        bio = " Dr. Albert Von Yank, a distinguished surgeon, stands at the forefront of surgical innovation, seamlessly blending technical prowess with a compassionate approach to patient care. With a wealth of experience and a commitment to excellence, Dr. Yankovich has garnered recognition for his expertise in complex surgical procedures, earning the trust of patients and colleagues alike. His unwavering dedication to advancing surgical techniques and improving patient outcomes underscores his reputation as a trailblazer in the field of surgery.",
        tagline = "Here's a waver for you to sign."
    )

    doc5 = Doctor(
        name = "Dr. Hannibal Lecter",
        image_url = "https://media.newyorker.com/photos/5f4bd91225409f35fe113819/4:3/w_2559,h_1919,c_limit/Gupta-HannibalLecter.jpg",
        department = "Psychiatrist",
        bio = "Dr. Hannibal Lecter, a renowned psychiatrist, possesses an enigmatic allure coupled with a profound understanding of the human mind. With a keen intellect and a refined approach to therapy, Dr. Lecter navigates the intricacies of the psyche with unparalleled insight and precision. Though his unconventional methods may raise eyebrows, his reputation as a masterful healer and his ability to unearth the depths of the human condition are undeniable, leaving an indelible mark on those who seek his counsel. ",
        tagline = "Discourtesy Is Unspeakably Ugly To Me."
    )

    db.session.add_all([doc1, doc2, doc3, doc4, doc5])
    
    admin = User(
        username = "Admin123",
        first_name = "Admin",
        last_name = "Admin",
        birthdate = datetime(2000, 1, 1),
        sex = "M",
        bio = "Admin"
    )
    
    admin.password_hash = 'AdminAdmin'

    user1 = User(
        username = "JohnDoe1",
        first_name = "John",
        last_name = "Doe",
        birthdate = datetime(2000, 1, 1),
        sex = "M",
        bio = "I'm not dead yet"
        
    )
    user1.password_hash = 'password'

    user2 = User(
        username = "JaneDoe1",
        first_name = "Jane",
        last_name = "Doe",
        birthdate = datetime(1966, 7, 6),
        sex = "F",
        bio = "I'm part robot."
        
    )
    
    
    user2.password_hash = 'password'


    db.session.add_all([admin, user1, user2])

    appt1 = Appointment(
        user_id = 1,
        doctor_id = 1
    )

    db.session.add(appt1)

    review1 = Review(
        user_id = 2,
        doctor_id = 4,
        score = 5,
        review = "He saved my leg and has a beautiful singing voice!"
    )

    review2 = Review(
        user_id = 3,
        doctor_id = 5,
        score = 4,
        review = "My mind is so clear now."
    )
    db.session.add_all([review1, review2])

    db.session.commit()