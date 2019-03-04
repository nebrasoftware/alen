# -*- coding: utf-8 -*-
"""User models."""
import datetime as dt
import jwt

from server.database import Column, Model, SurrogatePK
from server.database import db
from server.extensions import ma
from server.extensions import bcrypt
from marshmallow import Schema, fields
from flask import current_app


class User(SurrogatePK, Model):
    """A user of the app."""

    __tablename__ = 'users'
    name = Column(db.String(80), nullable=False)
    last_name = Column(db.String(150), nullable=False)
    email = Column(db.String(80), unique=True, nullable=False)
    password = Column(db.String(255), nullable=True)
    created_at = Column(db.DateTime, nullable=False,
                        default=dt.datetime.utcnow)
    is_admin = Column(db.Boolean(), default=False)

    def __init__(self, email, password=None, **kwargs):
        """Create instance."""
        db.Model.__init__(self, email=email, **kwargs)
        if password:
            self.set_password(password)
        else:
            self.password = None

    def set_password(self, password):
        """Set password."""
        self.password = bcrypt.generate_password_hash(
            password, current_app.config.get('BCRYPT_LOG_ROUNDS')
        ).decode()

    def check_password(self, value):
        """Check password."""
        return bcrypt.check_password_hash(self.password, value)

    def encode_auth_token(self, user_id):
        try:
            payload = {
                'exp': dt.datetime.utcnow() + dt.timedelta(days=0, seconds=5),
                'iat': dt.datetime.utcnow(),
                'sub': user_id
            }
            return jwt.encode(
                payload,
                current_app.config.get('SECRET_KEY'),
                algorithm='HS256'
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(token):
        """
        Validates the auth token
        :param token:
        :return: integer|string
        """
        try:
            payload = jwt.decode(token, current_app.config.get('SECRET_KEY'))
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'id': self.id,
            'email': self.email,
            'created_at': self.created_at,
            'active': self.active,
            'is_admin': self.is_admin
        }


class UserSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String()
    last_name = fields.String()
    email = fields.Email()
    created_at = fields.DateTime()
    is_admin = fields.Boolean()
