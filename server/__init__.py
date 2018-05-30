from flask import Flask
from flask_bcrypt import Bcrypt


def create_app():
    app = Flask(__name__, static_folder="../frontend/public",
                template_folder="../frontend/public")
    bcrypt = Bcrypt(app)

    from . import models, api
    api.init_app(app)
    models.init_app(app)

    return app
