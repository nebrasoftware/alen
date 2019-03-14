# -*- coding: utf-8 -*-
"""Trouser size models."""

from server.database import Column, Model, SurrogatePK
from server.database import db
from server.extensions import ma
from marshmallow import fields


class TrouserSize(SurrogatePK, Model):
    """The trouser sizes."""

    __tablename__ = 'trouser_sizes'
    size = Column(db.String(3), nullable=True)

    def __init__(self, size, **kwargs):
        """Create instance."""
        db.Model.__init__(self, size=size, **kwargs)

    def __repr__(self):
        return '<TrouserSize({size})>'.format(size=self.size)


class TrouserSizeSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    size = fields.String()
