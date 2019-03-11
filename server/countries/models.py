# -*- coding: utf-8 -*-
"""Country models."""

from server.database import Column, Model, SurrogatePK
from server.database import db
from server.extensions import ma
from marshmallow import fields


class Country(SurrogatePK, Model):
    """A countries list."""

    __tablename__ = 'countries'
    iso_code = Column(db.String(2), unique=True, nullable=False)
    name = Column(db.String(80), unique=True, nullable=False)

    def __init__(self, name, **kwargs):
        """Create instance."""
        db.Model.__init__(self, name=name, **kwargs)

    def __repr__(self):
        return '<Country({name})>'.format(name=self.name)


class CountrySchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    iso_code = fields.String()
    name = fields.String()
