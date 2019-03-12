# -*- coding: utf-8 -*-
"""Localities models."""

from server.database import Column, Model, SurrogatePK
from server.database import db, reference_col, relationship
from server.extensions import ma
from marshmallow import fields


class Locality(SurrogatePK, Model):
    """The localities."""

    __tablename__ = 'localities'
    name = Column(db.String(80), nullable=False)
    postal_code = Column(db.Integer(), nullable=False)
    province_id = reference_col('provinces', nullable=False)
    province = relationship('Province', backref='localities')

    def __init__(self, name, **kwargs):
        """Create instance."""
        db.Model.__init__(self, name=name, **kwargs)

    def __repr__(self):
        return '<Locality({name})>'.format(name=self.name)


class LocalitySchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String()
    postal_code = fields.Integer()
