from mongoengine import (
    Document, StringField, FloatField, IntField, BooleanField,
    ListField, EmbeddedDocument, EmbeddedDocumentField, ReferenceField,
    DateTimeField
)
from datetime import datetime

# Size as embedded document
class Size(EmbeddedDocument):
    label = StringField()
    units = IntField()

# Review as embedded document
class Review(EmbeddedDocument):
    user = ReferenceField("users")  # refers to User collection
    rating = FloatField()
    createdAt = DateTimeField(default=datetime.utcnow)

# Product model
class Product(Document):
    name = StringField(required=True)
    description = StringField()
    price = IntField(required=True)
    size = ListField(EmbeddedDocumentField(Size))
    material = StringField()
    category = StringField()
    gender = StringField(choices=["Male", "Female", "Unisex"])
    brand = StringField()
    photos = ListField(StringField())
    tags = ListField(StringField())
    availableStock = IntField(default=0)
    rating = FloatField(default=0)
    reviews = ListField(EmbeddedDocumentField(Review))
    isOnSale = BooleanField(default=False)
    salePercent = IntField(default=0)
    isDeleted = BooleanField(default=False)
    createdAt = DateTimeField(default=datetime.utcnow)

    meta = {"collection": "products"}  # explicitly set collection name
