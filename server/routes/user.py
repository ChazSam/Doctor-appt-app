from flask_restful import Resource
from flask_migrate import Migrate
from models.user import User
from config import api
# from flask import Flask, request, session, jsonify, make_response

class GetUsers(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return users, 200 
    
class UserDetails(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first().to_dict()
        return user, 200 
    
api.add_resource(GetUsers, '/users', endpoint="users")
api.add_resource(UserDetails, '/users/<int:id>', endpoint="users")
