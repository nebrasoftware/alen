# -*- coding: utf-8 -*-
"""User models."""
import datetime as dt
import jwt

from server.database import Column, Model, SurrogatePK
from server.database import db, reference_col, relationship
from server.extensions import bcrypt
from flask import current_app


class Role(SurrogatePK, Model):
    """A role for a user."""

    __tablename__ = 'roles'
    name = Column(db.String(80), unique=True, nullable=False)
    user_id = reference_col('users', nullable=True)
    user = relationship('User', backref='roles')

    def __init__(self, name, **kwargs):
        """Create instance."""
        db.Model.__init__(self, name=name, **kwargs)

    def __repr__(self):
        """Represent instance as a unique string."""
        return '<Role({name})>'.format(name=self.name)


class User(SurrogatePK, Model):
    """A user of the app."""

    __tablename__ = 'users'
    email = Column(db.String(80), unique=True, nullable=False)
    #: The hashed password
    password = Column(db.String(255), nullable=True)
    created_at = Column(db.DateTime, nullable=False,
                        default=dt.datetime.utcnow)
    active = Column(db.Boolean(), default=False)
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
            is_blacklisted_token = BlacklistToken.check_blacklist(token)
            if is_blacklisted_token:
                return 'Token blacklisted. Please log in again.'
            else:
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


class BlacklistToken(SurrogatePK, Model):
    """
    Token Model for storing JWT tokens
    """
    __tablename__ = 'blacklist_tokens'

    token = db.Column(db.String(500), unique=True, nullable=False)
    blacklisted_on = db.Column(db.DateTime, nullable=False)

    def __init__(self, token):
        self.token = token
        self.blacklisted_on = dt.datetime.now()

    def __repr__(self):
        return '<id: token: {}'.format(self.token)

    @staticmethod
    def check_blacklist(token):
        # check whether auth token has been blacklisted
        res = BlacklistToken.query.filter_by(token=str(token)).first()
        if res:
            return True
        else:
            return False
