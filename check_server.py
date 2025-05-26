#!/usr/bin/env python3
"""
Check if the server is running and the API works
"""

import urllib.request
import json
import sys

def check_server():
    try:
        print("Checking if server is running...")
        
        # Test the main page
        with urllib.request.urlopen('http://localhost:12001/') as response:
            if response.getcode() == 200:
                print("✓ Main page is accessible")
            else:
                print(f"✗ Main page returned status {response.getcode()}")
                return False
        
        # Test the API
        with urllib.request.urlopen('http://localhost:12001/api/listings') as response:
            if response.getcode() == 200:
                data = json.loads(response.read().decode())
                print(f"✓ API is working! Found {len(data)} properties")
                print(f"  First property: {data[0]['title']}")
                return True
            else:
                print(f"✗ API returned status {response.getcode()}")
                return False
                
    except urllib.error.URLError as e:
        print(f"✗ Server is not running or not accessible: {e}")
        return False
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

if __name__ == '__main__':
    if check_server():
        print("\n🎉 Server is working correctly!")
        sys.exit(0)
    else:
        print("\n❌ Server has issues")
        sys.exit(1)
