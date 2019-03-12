# -*- coding: utf-8 -*-
"""Provinces models."""

from server.database import Column, Model, SurrogatePK
from server.database import db
from server.extensions import ma
from marshmallow import fields


class Province(SurrogatePK, Model):
    """The provinces."""

    __tablename__ = 'provinces'
    name = Column(db.String(80), nullable=False)

    def __init__(self, name, **kwargs):
        """Create instance."""
        db.Model.__init__(self, name=name, **kwargs)

    def __repr__(self):
        return '<Province({name})>'.format(name=self.name)


class ProvinceSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String()
