# -*- coding: utf-8 -*-
"""Driving license models."""

from server.database import Column, Model, SurrogatePK
from server.database import db
from server.extensions import ma
from marshmallow import fields


class DrivingLicense(SurrogatePK, Model):
    """The driving license."""

    __tablename__ = 'driving_license'
    type = Column(db.String(3), nullable=True)

    def __init__(self, type, **kwargs):
        """Create instance."""
        db.Model.__init__(self, type=type, **kwargs)

    def __repr__(self):
        return '<DivingLicense({type})>'.format(type=self.type)


class DrivingLicenseSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    type = fields.String()
