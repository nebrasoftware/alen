# -*- coding: utf-8 -*-
"""The app module, containing the app factory function."""
from flask import Flask

from server import eye_colors, hair_colors, driving_licenses
from server import users, extras, localities, provinces
from server import tshirt_sizes, trouser_sizes, foot_sizes
from server import utils
from server.extensions import bcrypt, db, migrate, cors, ma


def create_app(config_object):
    """An application factory, as explained here:
     http://flask.pocoo.org/docs/patterns/appfactories/.
    :param config_object: The configuration object to use.
    """
    app = Flask(__name__,
                static_folder="../frontend/public",
                template_folder="../frontend/public")
    app.config.from_object(config_object)
    register_extensions(app)
    register_blueprints(app)
    return app


def register_extensions(app):
    """Register Flask extensions."""
    bcrypt.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app)
    ma.init_app(app)
    return None


def register_blueprints(app):
    """Register Flask blueprints."""
    app.register_blueprint(users.api.blueprint)
    app.register_blueprint(extras.api.blueprint)
    app.register_blueprint(eye_colors.api.blueprint)
    app.register_blueprint(hair_colors.api.blueprint)
    app.register_blueprint(driving_licenses.api.blueprint)
    app.register_blueprint(localities.api.blueprint)
    app.register_blueprint(provinces.api.blueprint)
    app.register_blueprint(tshirt_sizes.api.blueprint)
    app.register_blueprint(trouser_sizes.api.blueprint)
    app.register_blueprint(foot_sizes.api.blueprint)
    app.register_blueprint(utils.image_uploader.blueprint)
    return None
