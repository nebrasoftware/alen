from flask import Blueprint, jsonify, make_response
from .models import DrivingLicense, DrivingLicenseSchema
from server.extensions import db


blueprint = Blueprint('driving_licenses', __name__,
                      url_prefix='/api/v1/driving_licenses')


licenses_schema = DrivingLicenseSchema(many=True)
license_schema = DrivingLicenseSchema()


@blueprint.route("/licenses", methods=['GET'])
def getLicenses():
    driving_licenses = DrivingLicense.query.all()
    driving_licenses = licenses_schema.dump(driving_licenses).data
    responseObject = {
        'status': 'success',
        'data': driving_licenses
    }
    return make_response(jsonify(responseObject)), 200


@blueprint.route("/licenses/<id>", methods=['GET'])
def getLicense(id):
    driving_license = DrivingLicense.query.filter_by(id=id).first()
    driving_license = license_schema.dump(driving_license).data
    responseObject = {
        'status': 'success',
        'data': driving_license
    }
    return make_response(jsonify(responseObject)), 200
