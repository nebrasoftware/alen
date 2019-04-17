from flask import Blueprint, jsonify, make_response
from .models import EyeColor, EyeColorSchema


blueprint = Blueprint('eye_colors', __name__, url_prefix='/api/v1/eye_colors')


colors_schema = EyeColorSchema(many=True)
color_schema = EyeColorSchema()


@blueprint.route("/get_colors", methods=['GET'])
def getLicenses():
    eye_colors = EyeColor.query.all()
    eye_colors = colors_schema.dump(eye_colors).data
    responseObject = {
        'status': 'success',
        'data': eye_colors
    }
    return make_response(jsonify(responseObject)), 200


@blueprint.route("/color/<id>", methods=['GET'])
def getLicense(id):
    eye_color = EyeColor.query.filter_by(id=id).first()
    eye_color = color_schema.dump(eye_color).data
    responseObject = {
        'status': 'success',
        'data': eye_color
    }
    return make_response(jsonify(responseObject)), 200
