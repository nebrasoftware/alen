from flask import Blueprint, jsonify, request, make_response
from .models import Extra
from server.users.models import User
from server.extensions import db


blueprint = Blueprint('extra', __name__, url_prefix='/api/v1/extra')


@blueprint.route("/add_extra", methods=['POST'])
def add_extra():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()
    if not user:
        extra = Extra.query.filter_by(
                vat_number=data.get('vat_number')
        ).first()
        if not extra:
            try:
                extra = Extra(
                    vat_number=data["vat_number"],
                    insurance_number=data["insurance_number"],
                    name=data["name"],
                    last_name=data["last_name"],
                    email=data["email"],
                    birthday=data["birthday"],
                    phone=data["phone"],
                    address=data["address"],
                    postal_code=data["postal_code"]
                )
                db.session.add(extra)
                db.session.commit()
                responseObject = {
                    'status': 'success',
                    'message': 'Succesfully added'
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
