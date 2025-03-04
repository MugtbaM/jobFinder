# utils/resumeparser.py
import sys
import json
from pyresparser import ResumeParser
import warnings

def parse_resume(file_path):
    # Your resume parsing logic here
    result = ResumeParser(file_path).get_extracted_data()
    return result

if __name__ == "__main__":
    # Read input from stdin (file path passed from Node.js)
    file_path = sys.stdin.read().strip()
    
    # Process the resume
    result = parse_resume(file_path)
    
    # Return the result as JSON to stdout
    print(json.dumps(result))


# data = ResumeParser(file_path).get_extracted_data()
# print(data['skills'])