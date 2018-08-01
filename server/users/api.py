from flask import Blueprint, jsonify, request, make_response
from .models import User
from server.extensions import db, bcrypt
from sqlalchemy.exc import IntegrityError

blueprint = Blueprint('user', __name__, url_prefix='/api/v1/users')


@blueprint.route("/register", methods=['POST'])
def register():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()
    if not user:
        try:
            user = User(
                email=data["email"],
                password=data["password"]
            )
            db.session.add(user)
            db.session.commit()
            token = user.encode_auth_token(user.id)
            responseObject = {
                'status': 'success',
                'message': 'Succesfully registered.',
                'token': token.decode()
            }
            return make_response(jsonify(responseObject)), 201
        except Exception as e:
            responseObject = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            return make_response(jsonify(responseObject)), 401
    else:
        responseObject = {
            'status': 'fail',
            'message': 'User already exists. Please log in.'
        }
        return make_response(jsonify(responseObject)), 202


@blueprint.route("/authenticate", methods=['POST'])
def login():
    data = request.get_json()
    print(data)
    try:
        user = User.query.filter_by(email=data.get('email')).first()
        print(user)
        if user and bcrypt.check_password_hash(
            user.password, data.get('password')
        ):
            token = user.encode_auth_token(user.id)
            if token:
                responseObject = {
                    'status': 'success',
                    'message': 'Successfully logged in.',
                    'token': token.decode()
                }
                return make_response(jsonify(responseObject)), 200
        else:
            responseObject = {
                'status': 'fail',
                'message': 'User does not exist.'
            }
            return make_response(jsonify(responseObject)), 400
    except Exception as e:
        print(e)
        responseObject = {
            'status': 'fail',
            'message': 'Try fail'
        }
        return make_response(jsonify(responseObject)), 500
