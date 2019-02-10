# -*- coding: utf-8 -*-
"""Extra models."""
import datetime as dt

from server.database import Column, Model, SurrogatePK
from server.database import db, reference_col, relationship
from flask import current_app


class Extra(SurrogatePK, Model):
    """A extra profile."""

    __tablename__ = 'extras'
    user_id = reference_col('users', nullable=True)
    vat_number = Column(db.String(11), unique=True, nullable=False)
    insurance_number = Column(db.String(9), unique=True, nullabale=False)
    name = Column(db.String(80), nullable=False)
    last_name = Column(db.String(255), nullable=False)
    birthday = Column(db.Datetime, nullable=False)
    phone = Column(db.Integer(9), nullabale=False)
    address = Column(db.String(200), nullabale=False)
    postal_code = Column(db.Integer(5), nullable=False)
    '''country_id = reference_col('countries', nullable=False)'''

    def __init__(self, vat_number, insurance_number, **kwargs):
        """Create instance."""
        db.Model.__init(self, vat_number=vat_number,
                        insurance_number=insurance_number, **kwargs)

    def __repr__(self):
        return '<Extra({vat_number})>'.format(vat_number=self.vat_number)
