from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db

# Models go here!
# class User(db.Model, SerializerMixin):
#     __tablename__ = 'users'
        
#     id = db.Column(db.Integer, primary_key =True)
#     username = db.Column(db.Integer, unique=True, nullable=False)
#     image_url = db.Column(db.String)
#     bio = db.Column(db.String)


# class Song(db.Model, SerializerMixin):
#     __tablename = "songs"

#     id = db.Column(db.Integer, primary_key = True)
#     songname = db.Column(db.String,nullable=False)
#     bandname = db.Column(db.String,nullable=False)
#     url_link = db.Column(db.String)


# class Library(db.Model, SerializerMixin):
#     __tablename__ = "libraries"

    
#     id = db.Column(db.Integer, primary_key = True)
#     title = db.Column(db.String(30), nullable=False)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
#     song_id = db.Column(db.Integer, db.ForeignKey('songs.id'))
