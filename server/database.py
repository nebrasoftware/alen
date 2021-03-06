# -*- coding: utf-8 -*-
"""Database module, including the SQLAlchemy database object and
DB-related utilities."""
import re
from datetime import date, datetime
from .compat import basestring
from .extensions import db


# Alias common SQLAlchemy names
Column = db.Column
relationship = db.relationship


class CRUDMixin(object):
    """Mixin that adds convience methods for CRUD
    (create, read, update, delete) operations."""

    @classmethod
    def create(cls, **kwargs):
        """Create a new record and save ir the database."""
        instance = cls(**kwargs)
        return instance.save()

    def update(self, commit=True, **kwargs):
        """Update specific fields of a record."""
        for attr, value in kwargs.items():
            setattr(self, attr, value)
        return commit and self.save() or self

    def save(self, commit=True):
        """Save the record."""
        db.session.add(self)
        if commit:
            db.session.commit()
        return self

    def delete(self, commit=True):
        """Remove the record from the database."""
        db.session.delete(self)
        return commit and db.session.commit()


class Model(CRUDMixin, db.Model):
    """Base model class that includes CRUD convenience methods."""
    __abstract__ = True


class SurrogatePK(object):
    """A mixin that adds a surrogate integer 'primary key' column
    named ``id`` to any declarative-mapped class."""
    __table_args__ = {'extend_existing': True}

    id = Column(db.Integer, primary_key=True)

    @classmethod
    def get_by_id(cls, record_id):
        """Get record by ID."""
        if any(
            (isinstance(record_id, basestring) and record_id.isdigit(),
             isinstance(record_id, (int, float)))
        ):
            return cls.query.get(int(record_id))
        return None


def reference_col(tablename, nullable=False, pk_name='id', **kwargs):
    """Column that adds primary key foreign key reference.

    Usage: ::

        category_id = reference_col('category')
        category = relationship('Category', backref='categories')
    """
    return Column(
        db.ForeignKey('{0}.{1}'.format(tablename, pk_name)),
        nullable=nullable, **kwargs)


camel_pat = re.compile(r'([A-Z])')
under_pat = re.compile(r'_([a-z])')


def camel_to_snake(name):
    return camel_pat.sub(lambda x: '_' + x.group(1).lower(), name)


def snake_to_camel(name):
    return under_pat.sub(lambda x: x.group(1).upper(), name)


def convert_json(d, convert):
    new_d = {}
    for k, v in d.items():
        new_d[convert(k)] = convert_json(v, convert) \
            if isinstance(v, dict) else v
    return new_d


def calculate_age(born):
    today = date.today()
    return today.year - born.year - \
        ((today.month, today.day) < (born.month, born.day))


def format_date(date):
    date_of_birth = datetime.strptime(str(date), "%Y-%m-%dT%H:%M:%S")
    age = calculate_age(date_of_birth)
    return age

# from datetime import date, datetime

# data = [
#   {
#     "address": "Rúa Peregrina 54 2B",
#     "birthday": "1985-08-25T00:00:00+00:00",
#     "createdAt": "2019-03-17T09:58:27+00:00",
#     "id": 1,
#     "insuranceNumber": "12345678911",
#     "lastName": "Araújo",
#     "name": "Jacobo",
#     "phone": 644347019,
#     "vatNumber": "77404347D"
#   }
# ]


# def calculate_age(born):
#     today = date.today()
#     return today.year - born.year - \
#         ((today.month, today.day) < (born.month, born.day))


# def format_date(date):
#     date_of_birth = datetime.strptime(str(date), "%Y-%m-%dT%H:%M:%S")
#     age = calculate_age(date_of_birth)
#     return age

# print(format_date(data[0]['birthday'].split('+')[0]))