from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import json
import os

app = Flask(__name__)

# Configure CORS to allow your Netlify domain
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://emptycup-assignment-vivek.netlify.app",
            "http://localhost:*",
            "http://127.0.0.1:*"
        ],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Disable caching for development
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response

# Load listings data from JSON file
def load_listings():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(script_dir, 'listings.json')
    with open(json_path, 'r') as file:
        return json.load(file)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "message": "EmptyCup Backend API is running",
        "endpoints": ["/api/listings", "/api/listings/<id>"]
    })

@app.route('/api/listings', methods=['GET'])
def get_listings():
    try:
        listings = load_listings()
        return jsonify(listings)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/listings/<int:listing_id>', methods=['GET'])
def get_listing(listing_id):
    try:
        listings = load_listings()
        listing = next((item for item in listings if item["id"] == listing_id), None)

        if listing:
            return jsonify(listing)
        else:
            return jsonify({"error": "Listing not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Serve frontend static files in production
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    if path and os.path.exists(os.path.join('../frontend', path)):
        return send_from_directory('../frontend', path)
    elif path in ['listings', 'about', 'contact', 'login', 'signup']:
        return send_from_directory('../frontend', f'{path}.html')
    else:
        return send_from_directory('../frontend', 'index.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 12001))
    debug = os.environ.get('FLASK_ENV') != 'production'
    app.run(host='0.0.0.0', port=port, debug=debug)