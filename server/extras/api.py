from flask import (Blueprint, jsonify, request, make_response)
from sqlalchemy import case
from .models import Extra, ExtraSchema
from server.extensions import db
from server.database import convert_json, camel_to_snake, snake_to_camel
from server.database import format_date
from datetime import date


blueprint = Blueprint('extras', __name__, url_prefix='/api/v1/extras')

extras_schema = ExtraSchema(many=True)
extra_schema = ExtraSchema()


@blueprint.route("/add", methods=['POST'])
def add():
    data = convert_json(request.get_json(), camel_to_snake)
    extra = Extra.query.filter_by(vat_number=data.get('vat_number')).first()
    if not extra:
        try:
            extra = Extra(
                name=data["name"],
                last_name=data["last_name"],
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
                tshirt_size_id=data["tshirt_size_id"],
                trouser_size_id=data["trouser_size_id"],
                foot_size_id=data["foot_size_id"],
                eye_color_id=data["eye_color_id"],
                hair_color_id=data["hair_color_id"],
                profession=data["profession"],
                availability=data["availability"],
                driving_license_type_id=data["driving_license_type_id"],
                hobbies=data["hobbies"],
                extra_experience=data["extra_experience"],
                dance_experience=data["dance_experience"],
                singing_experience=data["singing_experience"],
                sea_experience=data["sea_experience"],
                waiter_experience=data["waiter_experience"],
                other_experience=data["other_experience"],
                face_image=data["face_image"],
                body_image=data["body_image"]
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


@blueprint.route("/get_all", methods=['GET'])
def get_all():
    extras = Extra.query.all()
    extras = extras_schema.dump(extras).data
    data = []
    for e in extras:
        data.append(convert_json(e, snake_to_camel))
    responseObject = {
        'status': 'success',
        'data': data
    }
    return make_response(jsonify(responseObject)), 200


@blueprint.route("/get_new_id", methods=['GET'])
def get_new_id():
    extra = Extra.query.order_by(Extra.id.desc()).first()
    extra_id = extra.id + 1
    responseObject = {
        'status': 'success',
        'data': extra_id
    }
    return make_response(jsonify(responseObject)), 200


@blueprint.route("/get_extras_filtered", methods=['GET', 'POST'])
def get_extras_filtered():
    filters = convert_json(request.get_json(), camel_to_snake)
    extras = Extra.query.all()

    # max_age = datetime.datetime.today() -\
    #     datetime.timedelta(days=filters.get('max_age')*365)

    max_age = filters.get('max_age')

    print(max_age)
    
    print(date.today().year - filters.get('max_age'))

    if (filters.get('eyes_color_filter')):
        extras = Extra.query.filter(
            Extra.eye_color_id == filters.get('eyes_color_filter')
        ).all()

    if (filters.get('hair_color_filter')):
        extras = Extra.query.filter(
            Extra.hair_color_id == filters.get('hair_color_filter')
        ).all()

    if (filters.get('min_weight_filter')):
        extras = Extra.query.filter(
            Extra.weight >= filters.get('min_weight_filter')
        ).all()

    if (filters.get('max_weight_filter')):
        extras = Extra.query.filter(
            Extra.weight <= filters.get('max_weight_filter')
        ).all()

    if (filters.get('min_height_filter')):
        extras = Extra.query.filter(
            Extra.height >= filters.get('min_height_filter')
        ).all()

    if (filters.get('max_height_filter')):
        extras = Extra.query.filter(
            Extra.height <= filters.get('max_height_filter')
        ).all()

    if (filters.get('province_id_filter')):
        extras = Extra.query.filter(
            Extra.province_id == filters.get('province_id_filter')
        ).all()

    if (filters.get('driving_license_type_filter')):
        extras = Extra.query.filter(
            Extra.driving_license_type_id ==
            filters.get('driving_license_type_filter')
        ).all()

    if (filters.get('min_age_filter')):
        extras = Extra.query.filter(
            # format_date((Extra.birthday).split('+')[0]) >= filters.get('min_age_filter')
        ).all()

    if (filters.get('max_age_filter')):
        extras = Extra.query.filter(
            # format_date((Extra.birthday).split('+')[0]) <= filters.get('max_age_filter')
        ).all()

    extras = extras_schema.dump(extras).data
    data = []

    for e in extras:
        data.append(convert_json(e, snake_to_camel))
    responseObject = {
        'status': 'success',
        'data': data
    }
    return make_response(jsonify(responseObject)), 200
