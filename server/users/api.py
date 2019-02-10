from flask import Blueprint, jsonify, request, make_response
from .models import User
from server.extensions import db, bcrypt


blueprint = Blueprint('user', __name__, url_prefix='/api/v1/auth')


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
            print(e)
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


@blueprint.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    try:
        user = User.query.filter_by(email=data.get('email')).first()
        if user and bcrypt.check_password_hash(
            user.password, data.get('password')
        ):
            token = user.encode_auth_token(user.id)
            if token:
                responseObject = {
                    'status': 'success',
                    'message': 'Successfully logged in.',
                    'is_admin': user.is_admin,
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
            'message': 'Try again'
        }
        return make_response(jsonify(responseObject)), 500


@blueprint.route("/status", methods=['GET'])
def get():
    auth_header = request.headers.get('Authorization')
    if auth_header:
        token = auth_header.split(" ")[1]
    else:
        token = ''
    if token:
        resp = User.decode_auth_token(token)
        if not isinstance(resp, str):
            user = User.query.filter_by(id=resp).first()
            responseObject = {
                'status': 'success',
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'is_admin': user.is_admin,
                    'created_at': user.created_at
                }
            }
            return make_response(jsonify(responseObject)), 200
        responseObject = {
            'status': 'fail',
            'message': resp
        }
        return make_response(jsonify(responseObject)), 401
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return make_response(jsonify(responseObject)), 401


@blueprint.route("/users", methods=['GET'])
def getAll():
    users = User.query.all()
    return make_response(jsonify([u.serialize for u in users])), 200
