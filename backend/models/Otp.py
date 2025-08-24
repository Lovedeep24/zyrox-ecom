from mongoengine import Document, StringField, DateTimeField
from datetime import datetime, timedelta

class Otp(Document):
    email = StringField(required=True)
    otp = StringField(unique=True, required=True)
    expiresAt = DateTimeField(required=True)

    meta = {"collection": "otps"}  # explicitly set collection name
