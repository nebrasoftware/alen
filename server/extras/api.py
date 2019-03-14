from flask import Blueprint, jsonify, request, make_response
from .models import Extra
from server.extensions import db


blueprint = Blueprint('extras', __name__, url_prefix='/api/v1/extras')


@blueprint.route("/add", methods=['POST'])
def add():
    data = request.get_json()
    print(data)
    extra = Extra.query.filter_by(vat_number=data.get('vat_number')).first()
    if not extra:
        try:
            extra = Extra(
                name=data["name"],
                last_name=data["last_name"],
                age=data["age"],
                birthday=data["birthday"],
                phone=data["phone"],
                genre=data["genre"],
                address=data["address"],
                locality_id=data["locality_id"],
                province_id=data["province_id"],
                nationality=data["nationality"],
                insurance_number=data["insurance_number"],
                vat_number=data["vat_number"],
                height=data["height"],
                weight=data["weight"],
                tshirt_size=data["tshirt_size"],
                trouser_size=data["trouser_size"],
                foot_size=data["foot_size"],
                eye_color=data["eye_color"],
                hair_color=data["hair_color"],
                profession=data["profession"],
                availability=data["availability"],
                driving_license=data["driving_license"],
                hobbies=data["hobbies"],
                extra_experience=data["extra_experience"],
                dance_experience=data["dance_experience"],
                singing_experience=data["singing_experience"],
                sea_experience=data["sea_experience"],
                waiter_experience=data["waiter_experience"],
                other_experience=data["other_experience"]
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
