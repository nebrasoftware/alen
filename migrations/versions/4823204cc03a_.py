"""empty message

Revision ID: 4823204cc03a
Revises: 
Create Date: 2019-03-13 18:12:59.654613

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4823204cc03a'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('driving_licenses_types',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(length=4), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('eye_colors',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('hair_colors',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('provinces',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=80), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('is_admin', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('localities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.Column('postal_code', sa.Integer(), nullable=False),
    sa.Column('province_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['province_id'], ['provinces.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('extras',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=80), nullable=True),
    sa.Column('last_name', sa.String(length=255), nullable=True),
    sa.Column('age', sa.Integer(), nullable=True),
    sa.Column('birthday', sa.DateTime(), nullable=True),
    sa.Column('phone', sa.Integer(), nullable=True),
    sa.Column('genre', sa.String(length=1), nullable=True),
    sa.Column('address', sa.String(length=200), nullable=True),
    sa.Column('locality_id', sa.Integer(), nullable=True),
    sa.Column('province_id', sa.Integer(), nullable=True),
    sa.Column('nationality', sa.String(length=20), nullable=True),
    sa.Column('vat_number', sa.String(length=11), nullable=True),
    sa.Column('insurance_number', sa.BigInteger(), nullable=True),
    sa.Column('height', sa.Integer(), nullable=True),
    sa.Column('weight', sa.Integer(), nullable=True),
    sa.Column('tshirt_size', sa.String(length=3), nullable=True),
    sa.Column('trouser_size', sa.Integer(), nullable=True),
    sa.Column('foot_size', sa.Integer(), nullable=True),
    sa.Column('eye_color_id', sa.Integer(), nullable=True),
    sa.Column('hair_color_id', sa.Integer(), nullable=True),
    sa.Column('profession', sa.String(length=80), nullable=True),
    sa.Column('availability', sa.Boolean(), nullable=True),
    sa.Column('driving_license', sa.Boolean(), nullable=True),
    sa.Column('driving_license_type_id', sa.Integer(), nullable=True),
    sa.Column('hobbies', sa.String(length=200), nullable=True),
    sa.Column('extra_experience', sa.Boolean(), nullable=True),
    sa.Column('dance_experience', sa.Boolean(), nullable=True),
    sa.Column('singing_experience', sa.Boolean(), nullable=True),
    sa.Column('sea_experience', sa.Boolean(), nullable=True),
    sa.Column('waiter_experience', sa.Boolean(), nullable=True),
    sa.Column('other_experience', sa.String(length=80), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['driving_license_type_id'], ['driving_licenses_types.id'], ),
    sa.ForeignKeyConstraint(['eye_color_id'], ['eye_colors.id'], ),
    sa.ForeignKeyConstraint(['hair_color_id'], ['hair_colors.id'], ),
    sa.ForeignKeyConstraint(['locality_id'], ['localities.id'], ),
    sa.ForeignKeyConstraint(['province_id'], ['provinces.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('insurance_number'),
    sa.UniqueConstraint('vat_number')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('extras')
    op.drop_table('localities')
    op.drop_table('users')
    op.drop_table('provinces')
    op.drop_table('hair_colors')
    op.drop_table('eye_colors')
    op.drop_table('driving_licenses_types')
    # ### end Alembic commands ###
