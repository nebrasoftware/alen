# -*- coding: utf-8 -*-
"""Eye color models."""

from server.database import Column, Model, SurrogatePK
from server.database import db
from server.extensions import ma
from marshmallow import fields


class EyeColor(SurrogatePK, Model):
    """The hair colors."""

    __tablename__ = 'eye_colors'
    name = Column(db.String(80), nullable=True)

    def __init__(self, name, **kwargs):
        """Create instance."""
        db.Model.__init__(self, name=name, **kwargs)

    def __repr__(self):
        return '<EyeColor({name})>'.format(name=self.name)


class EyeColorSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String()
