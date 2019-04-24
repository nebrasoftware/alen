# -*- coding: utf-8 -*-
"""Application configuration."""
import os


class Config(object):
    """Base configuration."""

    SECRET_KEY = os.environ.get('SECRET_KEY', 'secret-key')
    APP_DIR = os.path.abspath(os.path.dirname(__file__))  # This directory
    PROJECT_ROOT = os.path.abspath(os.path.join(APP_DIR, os.pardir))
    BCRYPT_LOG_ROUNDS = 13
    DEBUG_TB_INTERCEPT_REDIRECTS = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLALCHEMY_DATABASE_URI = 'mysql://alen:Alen2019!@199.247.17.73/alendb?charset=utf8'
    SQLALCHEMY_DATABASE_URI = 'mysql://alen:Alen2019!@199.247.17.73/alendb'
    UPLOAD_FOLDER = 'images'
    ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])


class ProdConfig(Config):
    """Production configuration."""

    ENV = 'production'
    DEBUG = False


class DevConfig(Config):
    """Development configuration."""

    ENV = 'development'
    DEBUG = True
