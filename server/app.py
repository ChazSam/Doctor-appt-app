#!/usr/bin/env python3

# Standard library imports
from flask import Flask, request, session, jsonify, make_response
from flask_restful import Resource
# from flask_migrate import Migrate
from sqlalchemy_serializer import SerializerMixin

# Remote library imports
from models.user import User
from models.doctor import Doctor
from models.appointment import Appointment
from models.review import Review
from sqlalchemy.exc import IntegrityError
import datetime

from config import app, db, api


class CheckSession(Resource, SerializerMixin):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            
            return user.to_dict(), 200
        else:
            return {'message': '401: Not Authorized'}, 401
        
class Login(Resource):
    def post(self):
          
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        user = User.query.filter_by(username = username).first()
        
 
        if not user:
            return {'error': 'Unauthorized'}, 401
        
        if user and user.authenticate(password): 
            session['user_id'] = user.id
            return user.to_dict(), 200
        else:
            return {"error": "Username or Password didn't match."}, 401
        

class GetUsers(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return users, 200 
    

class UserDetails(Resource):
    def get(self, id):
        # if not session["user_id"]:
        #     return {"error":"401: unauthorized"}, 401
        user = User.query.filter(User.id == id).first()
        return user.to_dict(), 200
    
    
    def patch(self, id):

        record = User.query.get(id)
        if not record:
            return {"error": "Appointment not found"}, 404

        data = request.json
        
        if 'birthdate' in data:
            data['birthdate'] = datetime.datetime.strptime(data['birthdate'],'%Y-%m-%d')

        
        try:
            for key, value in data.items():
                setattr(record, key, value)

            db.session.commit()

            response_dict = record.to_dict()
            return response_dict, 200
        
        except IntegrityError as exc:
            return {"error": exc}, 422



    def delete(self, id):
           
        record = User.query.filter(User.id == id).first()

        db.session.delete(record)
        db.session.commit()

        response_dict = {"message": "record successfully deleted"}
        
        response = make_response(
            response_dict,
            200
        )

        return response

class Signup(Resource):

    def post(self):
        password = request.get_json().get('password')
        birthdate_string = request.get_json().get('birthdate'),
        birthdate = datetime.datetime.strptime(birthdate_string[0],"%Y-%m-%d")
   
        user = User(
        username = request.get_json().get('username'),
        first_name = request.get_json().get('first_name'),
        last_name = request.get_json().get('last_name'),
        sex = request.get_json().get('sex'),
        bio = request.get_json().get('bio')
        )

        user.password_hash = password 
        user.birthdate = birthdate

        try:
            session['user_id'] = user.id
            db.session.add(user)
            db.session.commit()

            return user.to_dict(), 201

        except IntegrityError as exc:
            return {'message': exc}, 422
        
class Logout(Resource):
    def delete(self): 

        if not session['user_id']:
            return {'error': 'Unauthorized'}, 401

        session['user_id'] = None
        return {'message': '204: No Content'}, 204
    

class CallDoctor(Resource):
    def get(self):

        doctors = [doc.to_dict() for doc in Doctor.query.all()]
        return doctors, 200
    

class DoctorDetails(Resource):
    def get(self, id):
        doctor = Doctor.query.filter_by(id=id).first().to_dict()
      
        return doctor, 200
    
    def patch(self, id):

        record = Doctor.query.get(id)
        if not record:
            return {"error": "Doctor not found"}, 404

        data = request.json

        for key, value in data.items():
            setattr(record, key, value)

        db.session.commit()

        response_dict = record.to_dict()
        return response_dict, 200
    
    def delete(self, id):
        record = Doctor.query.filter(Doctor.id == id).first()

        db.session.delete(record)
        db.session.commit()

        response_dict = {"message": "record successfully deleted"}
        
        response = make_response(
            response_dict,
            200
        )

        return response
        
class CreateAppointment(Resource):
    def post(self):
        date = request.get_json().get("date"),
        date_string=datetime.datetime.strptime(date[0], '%Y-%m-%d') 
        
        appointment = Appointment(
            user_id = request.get_json().get("user_id"),
            doctor_id = request.get_json().get("doctor_id"),
    )
        appointment.date = date_string
        try:
            session['user_id'] = appointment.id
            db.session.add(appointment)
            db.session.commit()

            return appointment.to_dict(), 201

        except ValueError as exc:
            return {'message': exc}, 422


class AppointmentDetails(Resource):
    
    def patch(self, id):

        record = Appointment.query.get(id)
        if not record:
            return {"error": "Appointment not found"}, 404

        data = request.json
        if 'date' in data:
            data['date'] = datetime.datetime.strptime(data['date'],'%Y-%m-%d')
        for key, value in data.items():
            setattr(record, key, value)

        db.session.commit()

        response_dict = record.to_dict()
        return response_dict, 200
    
    def delete(self, id):

        record = Appointment.query.filter(Appointment.id == id).first()

        db.session.delete(record)
        db.session.commit()

        response_dict = {"message": "record successfully deleted"}
        
        response = make_response(
            response_dict,
            200
        )

        return response

class AddDoctor(Resource):
    def post(self):

        doctor = Doctor(
            name = request.get_json().get('name'),
            image_url = request.get_json().get('image_url'),
            department = request.get_json().get('department'),
            bio = request.get_json().get('bio'),
            tagline = request.get_json().get('tagline'),
            )
        
        try:
            db.session.add(doctor)
            db.session.commit(), 201
            return doctor.to_dict()

        except IntegrityError as exc:
            return {"Error": exc}, 422
        
class AddReview(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]
        return reviews, 200

    def post(self):
        review = Review(
            score = request.get_json().get('score'),
            review = request.get_json().get('review'),
            user_id = request.get_json().get('user_id'),
            doctor_id = request.get_json().get('doctor_id')
        )


        try:
            db.session.add(review)
            db.session.commit(), 201
            return review.to_dict()

        except IntegrityError as exc:
            return {"Error": exc}, 422
        
class ChangeReview(Resource):
    def get(self, id):
        review = Review.query.filter_by(id=id).first().to_dict()
      
        return review, 200
    
    def patch(self, id):
        user = Review.query.filter_by(id=id).first()

        for attr in request.json:
            setattr(user, attr, request.json[attr])

        db.session.add(user)
        db.session.commit()

        response_dict = user.to_dict()
        return response_dict, 200
        
   
    def delete(self, id):
        
        record = Review.query.filter(Review.id == id).first()
        db.session.delete(record)
        db.session.commit()

        response_dict = {"message": "record successfully deleted"}
        
        response = make_response(
            response_dict,
            200
        )

        return response


api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(GetUsers, '/users', endpoint="users")
api.add_resource(UserDetails, '/account/<int:id>')
api.add_resource(DoctorDetails, '/doctor/<int:id>')
api.add_resource(CallDoctor, '/doctor', endpoint='doctor')
api.add_resource(AddDoctor, '/add-doctor', endpoint='add-doctor')
api.add_resource(CreateAppointment, '/create', endpoint="create")
api.add_resource(AppointmentDetails, '/appointment/<int:id>')
api.add_resource(AddReview, '/reviews', endpoint='reviews')
api.add_resource(ChangeReview, '/reviews/<int:id>')


@app.route('/')
def index():
    return '<h1>Project Server</h1>'

if __name__ == '__main__':
    app.run(port=5555, debug=True)

