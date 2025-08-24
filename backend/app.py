from flask import Flask
from flask_cors import CORS
from config.dbConnect import db_connection
from routes.generateOtp import otp_bp
from routes.signup import signup_bp
from routes.login import login_bp
import os

app = Flask(__name__)
CORS(app)

db_connection()

app.register_blueprint(otp_bp)
app.register_blueprint(signup_bp)
app.register_blueprint(login_bp)

if __name__ == "__main__":
    app.run(port=int(os.getenv("PORT", 5000)), debug=True)
