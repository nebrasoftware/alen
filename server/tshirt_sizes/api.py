from flask import Blueprint, jsonify, make_response
from .models import TshirtSize, TshirtSizeSchema


blueprint = Blueprint('tshirt_sizes', __name__,
                      url_prefix='/api/v1/tshirt_sizes')


sizes_schema = TshirtSizeSchema(many=True)
size_schema = TshirtSizeSchema()


@blueprint.route("/sizes", methods=['GET'])
def getLicenses():
    tshirt_sizes = TshirtSize.query.all()
    tshirt_sizes = sizes_schema.dump(tshirt_sizes).data
    responseObject = {
        'status': 'success',
        'data': tshirt_sizes
    }
    return make_response(jsonify(responseObject)), 200


@blueprint.route("/size/<id>", methods=['GET'])
def getLicense(id):
    tshirt_size = TshirtSize.query.filter_by(id=id).first()
    tshirt_size = size_schema.dump(tshirt_size).data
    responseObject = {
        'status': 'success',
        'data': tshirt_size
    }
    return make_response(jsonify(responseObject)), 200
