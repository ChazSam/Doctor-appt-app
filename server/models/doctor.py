from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db

class Doctor(db.Model, SerializerMixin):
    __tablename__ = 'doctors'
        
    id = db.Column(db.Integer, primary_key =True)
    name = db.Column(db.Integer, unique=True, nullable=False)
    image_url = db.Column(db.String)
    department = db.Column(db.String, nullable=False)
    specialty = db.Column(db.String, default="General")
    bio = db.Column(db.String)
    tagline = db.Column(db.String)