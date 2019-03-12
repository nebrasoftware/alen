from flask import Blueprint
from .models import EyeColor


blueprint = Blueprint('eye_colors', __name__, url_prefix='/api/v1/eye_colors')
