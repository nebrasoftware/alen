from flask import Blueprint, jsonify, request, g, render_template
from flask_cors import CORS
from ..models.users import User
from ..models.base import db_session
from ..services.auth import generate_token, requires_auth, verify_token

api = Blueprint('api_bp', __name__, url_prefix='/api/v1')

CORS(api)


@api.route("/users/register", methods=['GET', 'POST'])
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

        new_user = User.query.filter_by(email=content["email"]).first()

        return jsonify(
            id=user.id,
            token=generate_token(new_user)
        )
