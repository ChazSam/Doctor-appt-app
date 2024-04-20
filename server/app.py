#!/usr/bin/env python3

# Standard library imports
from flask import Flask
from flask import request, session
from flask_restful import Resource


# Remote library imports
from models.user import User
from models.doctor import Doctor
from models.appointment import Appointment

# Local imports
from config import app, db, api
# Add your model imports
class Signup(Resource):
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

# Views go here!
api.add_resource(Signup, '/signup', endpoint='signup')


@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

