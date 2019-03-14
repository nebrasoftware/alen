from flask import Blueprint, jsonify, make_response
from .models import FootSize, FootSizeSchema


blueprint = Blueprint('foot_sizes', __name__,
                      url_prefix='/api/v1/foot_sizes')


sizes_schema = FootSizeSchema(many=True)
size_schema = FootSizeSchema()


@blueprint.route("/sizes", methods=['GET'])
def getLicenses():
    foot_sizes = FootSize.query.all()
    foot_sizes = sizes_schema.dump(foot_sizes).data
    responseObject = {
        'status': 'success',
        'data': foot_sizes
    }
    return make_response(jsonify(responseObject)), 200


@blueprint.route("/size/<id>", methods=['GET'])
def getLicense(id):
    foot_size = FootSize.query.filter_by(id=id).first()
    foot_size = size_schema.dump(foot_size).data
    responseObject = {
        'status': 'success',
        'data': foot_size
    }
    return make_response(jsonify(responseObject)), 200
