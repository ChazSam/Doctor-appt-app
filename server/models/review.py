from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    
    serialize_rules = ("-doctor.reviews", '-user.reviews')

    id = db.Column(db.Integer, primary_key = True)
    score = db.Column(db.Integer, nullable = False)
    review = db.Column(db.String, nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'), unique = True)
    # extra_column = db.Column(db.String, nullable=True)
    
    doctor = db.relationship("Doctor", back_populates = "reviews")
    user = db.relationship("User", back_populates = "reviews")



