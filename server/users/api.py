from flask import Blueprint, jsonify, request
from .models import User
from server.extensions import db
from sqlalchemy.exc import IntegrityError

blueprint = Blueprint('user', __name__, url_prefix='/api/v1/users')


@blueprint.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        content = request.get_json()
        user = User(
            email=content["email"],
            password=content["password"]
        )
        db.session.add(user)
        try:
            db.session.commit()
        except IntegrityError:
            return jsonify(message="User with that email already exists"), 409

        return jsonify(message="User has been created successfully"), 200
