from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property


from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
        
    id = db.Column(db.Integer, primary_key =True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    birthdate = db.Column(db.DateTime, nullable=False)
    sex = db.Column(db.String, nullable=False)
    bio = db.Column(db.String, nullable=False)

    @hybrid_property
    def password_hash(self):
        raise AttributeError ("No permission to access data")
    
    @password_hash.setter
    def password_hash(self, password):

        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))