from flask import Blueprint, jsonify, make_response
from .models import TrouserSize, TrouserSizeSchema


blueprint = Blueprint('trouser_sizes', __name__,
                      url_prefix='/api/v1/trouser_sizes')


sizes_schema = TrouserSizeSchema(many=True)
size_schema = TrouserSizeSchema()


@blueprint.route("/sizes", methods=['GET'])
def getLicenses():
    trouser_sizes = TrouserSize.query.all()
    trouser_sizes = sizes_schema.dump(trouser_sizes).data
    responseObject = {
        'status': 'success',
        'data': trouser_sizes
    }
    return make_response(jsonify(responseObject)), 200


@blueprint.route("/size/<id>", methods=['GET'])
def getLicense(id):
    trouser_size = TrouserSize.query.filter_by(id=id).first()
    trouser_size = size_schema.dump(trouser_size).data
    responseObject = {
        'status': 'success',
        'data': trouser_size
    }
    return make_response(jsonify(responseObject)), 200
