import os
from flask import Blueprint, request, redirect, url_for
from werkzeug.utils import secure_filename
from flask import current_app


blueprint = Blueprint('utils', __name__, url_prefix='/api/v1/utils')


def allowed_file(name):
    return '.' in name and \
           name.rsplit('.', 1)[1].lower() \
               in current_app.config.get('ALLOWED_EXTENSIONS')


@blueprint.route('/upload_image', methods=['GET', 'POST'])
def file_upload():
    if request.method == 'POST':
        if 'file' not in request.files:
            return redirect(request.url)
        file = request.files['file']
        if file.name == '':
            return redirect(request.url)
        if file and allowed_file(file.name):
            name = secure_filename(file.name)
            file.save(os.path.join(current_app.config.get('UPLOAD_FOLDER'),
                                   name))
            return redirect(url_for('uploaded_file',
                                    name=name))
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''
