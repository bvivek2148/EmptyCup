#!/usr/bin/env python3
"""
Local development server script
Runs the Flask backend and serves the frontend
"""

import os
import sys
from backend.app import app

if __name__ == '__main__':
    # Set development environment
    os.environ['FLASK_ENV'] = 'development'
    
    print("Starting EmptyCup Property Listings - Local Development Server")
    print("Backend API: http://localhost:12001/api/listings")
    print("Frontend: http://localhost:12001")
    print("Press Ctrl+C to stop the server")
    print("-" * 50)
    
    # Run the Flask app
    app.run(host='0.0.0.0', port=12001, debug=True)
