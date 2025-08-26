from mongoengine import (
    Document, StringField, ReferenceField, ListField,
    EmbeddedDocument, EmbeddedDocumentField, FloatField,
    IntField, DictField, DateTimeField
)
from datetime import datetime

# Embedded document for products in the order
class OrderProduct(EmbeddedDocument):
    product = ReferenceField("products")  # refers to Product collection
    quantity = IntField(required=True)
    priceAtPurchase = FloatField(required=True)

class Order(Document):
    user = ReferenceField("User", required=True)  # who placed the order
    products = ListField(EmbeddedDocumentField(OrderProduct))
    totalAmount = FloatField(required=True)
    status = StringField(default="pending")        # e.g., pending, shipped, delivered
    paymentMethod = StringField()                  # e.g., card, COD, UPI
    paymentStatus = StringField(default="unpaid")  # unpaid, paid, failed
    shippingAddress = DictField()                  # store flexible JSON-like object
    trackingNumber = StringField()
    orderDate = DateTimeField(default=datetime.utcnow)

    meta = {"collection": "order"}
