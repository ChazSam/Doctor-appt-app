from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db

class Doctor(db.Model, SerializerMixin):
    __tablename__ = 'doctors'
    
    serialize_rules = ('-appointments.doctor','-reviews.doctor')

    id = db.Column(db.Integer, primary_key =True)
    name = db.Column(db.String, unique=True, nullable=False)
    image_url = db.Column(db.String, default='https://img.freepik.com/free-vector/hand-drawn-doctor-cartoon-illustration_23-2150680327.jpg?size=338&ext=jpg&ga=GA1.1.1518270500.1717459200&semt=ais_user')
    department = db.Column(db.String, nullable=False)
    bio = db.Column(db.String, default='Doctor of Medicine.')
    tagline = db.Column(db.String, default="I Practice Medicine.")

    appointments = db.relationship('Appointment', back_populates="doctor", cascade="all, delete-orphan")
    reviews = db.relationship('Review', back_populates="doctor", cascade="all, delete-orphan")
    
    patients = association_proxy("appointments", 'user')

    def __repr__(self):
        return f'<Doctor {self.id}: {self.name}>'