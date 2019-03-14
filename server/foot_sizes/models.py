# -*- coding: utf-8 -*-
"""Foot size models."""

from server.database import Column, Model, SurrogatePK
from server.database import db
from server.extensions import ma
from marshmallow import fields


class FootSize(SurrogatePK, Model):
    """The hair colors."""

    __tablename__ = 'foot_sizes'
    size = Column(db.String(3), nullable=True)

    def __init__(self, size, **kwargs):
        """Create instance."""
        db.Model.__init__(self, size=size, **kwargs)

    def __repr__(self):
        return '<FootSize({size})>'.format(size=self.size)


class FootSizeSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    size = fields.String()
