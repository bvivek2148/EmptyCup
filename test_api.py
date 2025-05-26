#!/usr/bin/env python3
"""
Test script to check if the API is working
"""

import requests
import json

def test_api():
    try:
        print("Testing API at http://localhost:12001/api/listings...")
        response = requests.get('http://localhost:12001/api/listings')
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Success! Found {len(data)} properties")
            print("\nFirst property:")
            print(json.dumps(data[0], indent=2))
        else:
            print(f"Error: {response.status_code}")
            print(response.text)
            
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to server. Is it running?")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    test_api()
