from mongoengine import Document, StringField, EmailField, ListField, EmbeddedDocument, EmbeddedDocumentField, ReferenceField, IntField, DateTimeField
from datetime import datetime


class Address(EmbeddedDocument):
    street = StringField()
    city = StringField()
    state = StringField()
    postalCode = StringField()
    country = StringField()

class CartItem(EmbeddedDocument):
    product = ReferenceField("Product") 
    quantity = IntField(default=1)
    selectedSize = StringField()


class User(Document):
    name = StringField()
    email = EmailField(unique=True, required=True)
    password = StringField(required=True)
    address = ListField(EmbeddedDocumentField(Address))
    role = StringField(default="user")
    wishlist = ListField(ReferenceField("Product"))
    cart = ListField(EmbeddedDocumentField(CartItem))
    createdAt = DateTimeField(default=datetime.utcnow)

    meta = {"collection": "users"}  
