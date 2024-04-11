from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db

class Appointment(db.Model, SerializerMixin):
    __tablename__ = 'appointments'
        
    id = db.Column(db.Integer, primary_key =True)
    username = db.Column(db.Integer, unique=True, nullable=False)
    image_url = db.Column(db.String)
    bio = db.Column(db.String)