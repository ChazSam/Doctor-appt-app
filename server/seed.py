
from models.doctor import Doctor
from models.user import User
from models.appointment import Appointment
from config import db

with app.app_context():

    doc1 = Doctor(
        name = "Dr. Moe Howard",
        image_url = "https://m.media-amazon.com/images/M/MV5BNjUwMjU4OTA4M15BMl5BanBnXkFtZTcwMzk4NjcxOA@@._V1_FMjpg_UX1000_.jpg",
        department = "Surgery",
        bio = "Dr. Howard is a doctor...",
        tagline = "Well, at least you could be seeing someone worse."
    )
    db.session.add_all(doc1)

    user1 = User(
        username = "John Doe",
        age = 50,
        sex = "M",
        bio = "I'm not dead yet"
    )
    db.session.add_all(user1)

    appt1 = Appointment(
        user_id = 1,
        doctor_id = 1
    )

    db.session.add_all(appt1)

    db.session.commit()