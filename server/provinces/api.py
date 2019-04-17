from flask import Blueprint, jsonify, make_response
from .models import Province, ProvinceSchema


blueprint = Blueprint('provinces', __name__, url_prefix='/api/v1/provinces')


provinces_schema = ProvinceSchema(many=True)
province_schema = ProvinceSchema()


@blueprint.route("/get_all", methods=['GET'])
def getProvinces():
    provinces = Province.query.all()
    provinces = provinces_schema.dump(provinces).data
    responseObject = {
        'status': 'success',
        'data': provinces
    }
    return make_response(jsonify(responseObject)), 200


@blueprint.route("/province/<id>", methods=['GET'])
def getProvince(id):
    province = Province.query.filter_by(id=id).first()
    province = province_schema.dump(province).data
    responseObject = {
        'status': 'success',
        'data': province
    }
    return make_response(jsonify(responseObject)), 200
