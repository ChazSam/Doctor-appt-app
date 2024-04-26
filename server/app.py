#!/usr/bin/env python3

# Standard library imports
from flask import Flask, request, session, jsonify, make_response
from flask_restful import Resource
from flask_migrate import Migrate

# Remote library imports
from models.user import User
from models.doctor import Doctor
from models.appointment import Appointment

# Local imports
from config import app, db, api
# Add your model imports

class Signup(Resource):

    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return users, 200 

    def post(self):
        password = request.get_json().get('password')

        user = User(
        username = request.get_json().get('username'),
        image_url = request.get_json().get('image_url'),
        bio = request.get_json().get('bio')
        )

        user.password_hash = password 

        try:
            session['user_id'] = user.id
            db.session.add(user)
            db.session.commit()

            return user.to_dict(), 201

        except:
            return {'message': "Unprocessable Entity"}, 422
        
class Login(Resource):
    def post(self):
        
        user = User.query.filter(User.username == request.get_json()['username']).first()

        if not user:
            return {'error': 'Unauthorized'}, 401
        
        session['user_id'] = user.id
        return user.to_dict()

    
class Call_Doctor(Resource):
    def get(self):

        doctors= [doc.to_dict() for doc in Doctor.query.all()]
        return doctors, 200
    
class CheckSession(Resource):
    def get(self):

        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return {'message': '401: Not Authorized'}, 401
        
class Logout(Resource):
    def delete(self): 

        if not session['user_id']:
            return {'error': 'Unauthorized'}, 401

        session['user_id'] = None
        return {'message': '204: No Content'}, 204
    
# Views go here!
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Call_Doctor, '/doctor', endpoint='doctor')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')

# @app.route('/')
# def index():
#     return '<h1>Project Server</h1>'

# @app.route("/signup", methods=['GET','POST'])
# def signup():
#     if request.method == 'GET':
#         # print(([user.to_dict() for user in User.query.all()]))
#         return make_response(jsonify([user.to_dict() for user in User.query.all()]))
    
#     if request.method == 'POST':
#         data = request.get_json()
#         user = User(username=data.get('username'), first_name=data.get('first_name'),last_name=data.get('last_name'),birthdate=data.get('birthdate'),sex=data.get('sex'), bio=data.get('bio'))

#         db.session.add(user)
#         db.session.commit()

#         return make_response(
#             jsonify(
#                 {'id': user.id, 'username': user.username, 'first_name': user.first_name, 'last_name': user.last_name, "birthdate":user.birthdate, "sex":user.sex, "bio":user.bio }))
        

if __name__ == '__main__':
    app.run(port=5555, debug=True)

