from flask import Blueprint, jsonify, make_response
from .models import Country, CountrySchema


blueprint = Blueprint('country', __name__, url_prefix='/api/v1/country')


countries_schema = CountrySchema(many=True)
country_schema = CountrySchema()


@blueprint.route("/countries", methods=['GET'])
def getCountries():
    countries = Country.query.all()
    countries = countries_schema.dump(countries).data
    responseObject = {
        'status': 'success',
        'data': countries
    }
    return make_response(jsonify(responseObject)), 200
