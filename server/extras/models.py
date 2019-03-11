# -*- coding: utf-8 -*-
"""Extra models."""
import datetime as dt

from server.database import Column, Model, SurrogatePK, relationship
from server.database import db, reference_col
from server.extensions import ma
# from server.users.models import UserSchema
from marshmallow import fields


class Extra(SurrogatePK, Model):
    """A extra profile."""

    __tablename__ = 'extras'
    user_id = reference_col('users', nullable=True)
    user = relationship('User', backref='extras')
    vat_number = Column(db.String(11), unique=True, nullable=True)
    insurance_number = Column(db.BigInteger(), unique=True, nullable=True)
    name = Column(db.String(80), nullable=True)
    last_name = Column(db.String(255), nullable=True)
    email = Column(db.String(80), unique=True, nullable=True)
    birthday = Column(db.DateTime, nullable=True)
    phone = Column(db.Integer(), nullable=True)
    address = Column(db.String(200), nullable=True)
    postal_code = Column(db.Integer(), nullable=True)
    country_id = reference_col('countries', nullable=True)
    country = relationship('Country', backref='extras')
    created_at = Column(db.DateTime, nullable=True,
                        default=dt.datetime.utcnow)

    def __init__(self, vat_number, insurance_number, **kwargs):
        """Create instance."""
        db.Model.__init__(self,
                          vat_number=vat_number,
                          insurance_number=insurance_number, **kwargs)

    def __repr__(self):
        return '<Extra({vat_number})>'.format(vat_number=self.vat_number)


class ExtraSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    # user_id = fields.Nested(UserSchema, only=["user_id"])
    vat_number = fields.String()
    insurance_number = fields.String()
    name = fields.String()
    last_name = fields.String()
    email = fields.Email()
    birthday = fields.DateTime()
    phone = fields.Integer()
    address = fields.String()
    postal_code = fields.Integer()
    created_at = fields.DateTime()
