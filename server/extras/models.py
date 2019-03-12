# -*- coding: utf-8 -*-
"""Extra models."""
import datetime as dt

from server.database import Column, Model, SurrogatePK
from server.database import db, relationship, reference_col
from server.extensions import ma
from marshmallow import fields
# from server.users.models import UserSchema


class Extra(SurrogatePK, Model):
    """A extra profile."""

    __tablename__ = 'extras'
    user_id = reference_col('users', nullable=True)
    user = relationship('User', backref='extras')
    name = Column(db.String(80), nullable=True)
    last_name = Column(db.String(255), nullable=True)
    age = Column(db.Integer(), nullable=True)
    birthday = Column(db.DateTime, nullable=True)
    phone = Column(db.Integer(), nullable=True)
    genre = Column(db.String(1), nullable=True)
    address = Column(db.String(200), nullable=True)
    locality_id = reference_col('localities', nullable=True)
    locality = relationship('Locality', backref='extras')
    province_id = reference_col('provinces', nullable=True)
    province = relationship('Province', backref='extras')
    nationality = Column(db.String(20), nullable=True)
    vat_number = Column(db.String(11), unique=True, nullable=True)
    insurance_number = Column(db.BigInteger(), unique=True, nullable=True)
    height = Column(db.Integer(), nullable=True)
    weight = Column(db.Integer(), nullable=True)
    tshirt_size = Column(db.String(3), nullable=True)
    trouser_size = Column(db.Integer(), nullable=True)
    foot_size = Column(db.Integer(), nullable=True)
    eye_color_id = reference_col('eye_colors', nullable=True)
    eye_color = relationship('EyeColor', backref='extras')
    hair_color_id = reference_col('hair_colors', nullable=True)
    hair_color = relationship('HairColor', backref='extras')
    profession = Column(db.String(80), nullable=True)
    availability = Column(db.Boolean(), nullable=True)
    driving_license_id = reference_col('driving_license', nullable=True)
    driving_license = relationship('DrivingLicense', backref='extras')
    hobbies = Column(db.String(200), nullable=True)
    extra_experience = Column(db.Boolean(), nullable=True)
    dance_experience = Column(db.Boolean(), nullable=True)
    singing_experience = Column(db.Boolean(), nullable=True)
    sea_experience = Column(db.Boolean(), nullable=True)
    waiter_experience = Column(db.Boolean(), nullable=True)
    other_experience = Column(db.String(80), nullable=True)
    created_at = Column(db.DateTime, nullable=True,
                        default=dt.datetime.utcnow)

    def __init__(self, vat_number, **kwargs):
        """Create instance."""
        db.Model.__init__(self, vat_number=vat_number, **kwargs)

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
