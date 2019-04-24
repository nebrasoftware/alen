import os
from flask import Blueprint, request, redirect, url_for
from werkzeug.utils import secure_filename
from flask import current_app


blueprint = Blueprint('utils', __name__, url_prefix='/api/v1/utils')


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() \
               in current_app.config.get('ALLOWED_EXTENSIONS')


@blueprint.route('/upload_image', methods=['POST'])
def file_upload():
    if 'file' not in request.files:
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(current_app.config.get('UPLOAD_FOLDER'),
                               filename))
        return redirect(url_for('uploaded_file',
                                filename=filename))

    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''