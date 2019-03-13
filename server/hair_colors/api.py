from flask import Blueprint, jsonify, make_response
from .models import HairColor, HairColorSchema


blueprint = Blueprint('hair_colors', __name__,
                      url_prefix='/api/v1/hair_colors')


colors_schema = HairColorSchema(many=True)
color_schema = HairColorSchema()


@blueprint.route("/colors", methods=['GET'])
def getLicenses():
    hair_colors = HairColor.query.all()
    hair_colors = colors_schema.dump(hair_colors).data
    responseObject = {
        'status': 'success',
        'data': hair_colors
    }
    return make_response(jsonify(responseObject)), 200


@blueprint.route("/color/<id>", methods=['GET'])
def getLicense(id):
    hair_color = HairColor.query.filter_by(id=id).first()
    hair_color = color_schema.dump(hair_color).data
    responseObject = {
        'status': 'success',
        'data': hair_color
    }
    return make_response(jsonify(responseObject)), 200
