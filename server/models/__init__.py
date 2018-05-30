from .base import init_db


def init_app(app):
    init_db()
