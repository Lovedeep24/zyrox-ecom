from mongoengine import connect
import os
from dotenv import load_dotenv

load_dotenv()

def db_connection():
    connect(host=os.getenv("DATABASE_URI"))
