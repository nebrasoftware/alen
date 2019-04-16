# -*- coding: utf-8 -*-
"""Extra models."""
import datetime as dt

from server.database import Column, Model, SurrogatePK
from server.database import db, relationship, reference_col
from server.extensions import ma
from marshmallow import fields


class Extra(SurrogatePK, Model):
    """A extra profile."""

    __tablename__ = 'extras'
    user_id = reference_col('users', nullable=True)
    user = relationship('User', backref='extras')
    name = Column(db.String(80), nullable=True)
    last_name = Column(db.String(255), nullable=True)
    birthday = Column(db.DateTime, nullable=True)
    phone = Column(db.Integer(), nullable=True)
    genre = Column(db.String(1), nullable=True)
    address = Column(db.String(200), nullable=True)
    province_id = reference_col('provinces', nullable=True)
    province = relationship('Province', backref='extras')
    locality_id = reference_col('localities', nullable=True)
    locality = relationship('Locality', backref='extras')
    nationality = Column(db.String(20), nullable=True)
    vat_number = Column(db.String(11), unique=True, nullable=True)
    insurance_number = Column(db.BigInteger(), unique=True, nullable=True)
    height = Column(db.Integer(), nullable=True)
    weight = Column(db.Integer(), nullable=True)
    tshirt_size_id = reference_col('tshirt_sizes', nullable=True)
    tshirt_size = relationship('TshirtSize', backref='extras')
    trouser_size_id = reference_col('trouser_sizes', nullable=True)
    trouser_size = relationship('TrouserSize', backref='extras')
    foot_size_id = reference_col('foot_sizes', nullable=True)
    foot_size = relationship('FootSize', backref='extras')
    eye_color_id = reference_col('eye_colors', nullable=True)
    eye_color = relationship('EyeColor', backref='extras')
    hair_color_id = reference_col('hair_colors', nullable=True)
    hair_color = relationship('HairColor', backref='extras')
    profession = Column(db.String(80), nullable=True)
    availability = Column(db.Boolean(), nullable=True)
    driving_license = Column(db.Boolean(), nullable=True)
    driving_license_type_id = reference_col('driving_licenses_types',
                                            nullable=True)
    driving_license_type = relationship('DrivingLicense', backref='extras')
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
    vat_number = fields.String()
    insurance_number = fields.String()
    name = fields.String()
    last_name = fields.String()
    email = fields.Email()
    birthday = fields.DateTime()
    phone = fields.Integer()
    address = fields.String()
    postal_code = fields.Integer()
    extra_experience = fields.Boolean()
    dance_experience = fields.Boolean()
    singing_experience = fields.Boolean()
    sea_experience = fields.Boolean()
    waiter_experience = fields.Boolean()
    other_experience = fields.Boolean()
    created_at = fields.DateTime()
