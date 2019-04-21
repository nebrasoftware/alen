import os
from flask import Blueprint, request, session


blueprint = Blueprint('images', __name__, url_prefix='/api/v1/images')


UPLOAD_FOLDER = '/images'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])


@blueprint.route('/upload', methods=['POST'])
def fileUpload():
    target = os.path.join(UPLOAD_FOLDER, 'images')
    if not os.path.isdir(target):
        os.mkdir(target)
    file = request.files['file']
    destination = "/".join([target, file])
    file.save(destination)
    session['uploadFilePath'] = destination
    response = "Whatever you wish too return"
    return response
