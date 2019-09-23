import os
from flask import Blueprint, request, jsonify, make_response
from werkzeug.utils import secure_filename
from flask import current_app


blueprint = Blueprint('utils', __name__, url_prefix='/api/v1/utils')


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() \
               in current_app.config.get('ALLOWED_EXTENSIONS')


@blueprint.route('/upload_image', methods=['POST'])
def file_upload():
    if request.method == 'POST':
        if 'file' not in request.files:
            responseObject = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            return make_response(jsonify(responseObject)), 401
        file = request.files['file']
        try:
            if file.filename == '':
                responseObject = {
                    'status': 'fail',
                    'message': 'Some error occurred. Please try again.'
                }
                return make_response(jsonify(responseObject)), 401
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(current_app.config.get('UPLOAD_FOLDER'),
                                       filename))
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
            'message': 'Some error occurred. Please try again.'
        }
        return make_response(jsonify(responseObject)), 401
