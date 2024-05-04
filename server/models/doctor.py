from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db

class Doctor(db.Model, SerializerMixin):
    __tablename__ = 'doctors'
        
    id = db.Column(db.Integer, primary_key =True)
    name = db.Column(db.Integer, unique=True, nullable=False)
    image_url = db.Column(db.String, default='https://cdn2.hubspot.net/hubfs/2027031/Lanermc_January2018/Images/8FF28DC9-155D-D235-071E832BE4180B45.jpeg')
    department = db.Column(db.String, nullable=False)
    bio = db.Column(db.String, default='Doctor of Medicine.')
    tagline = db.Column(db.String, default="I Practice Medicine.")