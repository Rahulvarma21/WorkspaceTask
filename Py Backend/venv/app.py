from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)

# MongoDB Configurationb
app.config["MONGO_URI"] = "mongodb://localhost:27017/workspace-booking"
mongo = PyMongo(app)

db = mongo.db.bookings  

# Route to get all bookings
@app.route("/bookings", methods=["GET"])
def get_bookings():
    try:
        all_bookings = list(db.find({}))
        for booking in all_bookings:
            booking["_id"] = str(booking["_id"])  # Convert ObjectId to string
        return jsonify(all_bookings), 200
    except Exception as e:
        return jsonify({"error": "Error fetching bookings", "details": str(e)}), 500

# Route to create a booking
@app.route("/bookings", methods=["POST"])
def create_booking():
    try:
        data = request.json
        new_booking = {
            "place": data["place"],
            "time": data["time"],
            "building": data["building"],
            "floor": data["floor"],
            "unit": data["unit"],
            "user": data["user"],
            "date": data["date"],
            "paymentMethod": data["paymentMethod"],
            "comments": data.get("comment", ""),
            "status": "Confirmed",
            "paymentStatus": "Pending",
        }
        result = db.insert_one(new_booking)
        new_booking["_id"] = str(result.inserted_id)  # Convert ObjectId to string
        return jsonify({"message": "Booking successful!", "booking": new_booking}), 201
    except Exception as e:
        return jsonify({"error": "Error saving booking", "details": str(e)}), 500

# Route to get booking by ID
@app.route("/booking/<id>", methods=["GET"])
def get_booking(id):
    try:
        booking = db.find_one({"_id": ObjectId(id)})
        if not booking:
            return jsonify({"error": "Booking not found"}), 404
        booking["_id"] = str(booking["_id"])  # Convert ObjectId to string
        return jsonify(booking), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to update payment status
@app.route("/updatePayment/<id>", methods=["POST"])
def update_payment_status(id):
    try:
        updated_booking = db.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": {"paymentStatus": "Confirmed"}},
            return_document=True,
        )
        if not updated_booking:
            return jsonify({"error": "Booking not found"}), 404
        updated_booking["_id"] = str(updated_booking["_id"])  # Convert ObjectId to string
        return jsonify(updated_booking), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=8080)
