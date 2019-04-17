from flask import Blueprint, jsonify, make_response
from .models import Locality, LocalitySchema


blueprint = Blueprint('localities', __name__, url_prefix='/api/v1/localities')


localities_schema = LocalitySchema(many=True)
locality_schema = LocalitySchema()


@blueprint.route("/get_all", methods=['GET'])
def getLocalities():
    localities = Locality.query.all()
    localities = localities_schema.dump(localities).data
    responseObject = {
        'status': 'success',
        'data': localities
    }
    return make_response(jsonify(responseObject)), 200


@blueprint.route("/locality/<id>", methods=['GET'])
def getLocality(id):
    locality = Locality.query.filter_by(id=id).first()
    locality = locality_schema.dump(locality).data
    responseObject = {
        'status': 'success',
        'data': locality
    }
    return make_response(jsonify(responseObject)), 200
