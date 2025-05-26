#!/usr/bin/env python3
"""
Simple script to start the Flask server
"""

import sys
import os

# Add current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Import and run the Flask app
from backend.app import app

if __name__ == '__main__':
    print("Starting EmptyCup Property Listings Server...")
    print("Server will be available at: http://localhost:12001")
    print("API endpoint: http://localhost:12001/api/listings")
    print("Press Ctrl+C to stop the server")
    print("-" * 50)
    
    app.run(host='0.0.0.0', port=12001, debug=True)
