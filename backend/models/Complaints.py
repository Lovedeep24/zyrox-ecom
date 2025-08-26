from mongoengine import Document, StringField, ReferenceField, DateTimeField
from datetime import datetime

class Complaint(Document):
    user = ReferenceField("users", required=True)       
    product = ReferenceField("products", required=True) 
    message = StringField()
    status = StringField(
        choices=["open", "in-progress", "resolved"],
        default="open"
    )
    createdAt = DateTimeField(default=datetime.utcnow)

    meta = {"collection": "complaints"}  
