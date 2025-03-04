# utils/resumeparser.py
import sys
import json
import logging
from pyresparser import ResumeParser
import warnings

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Suppress warnings if needed
warnings.filterwarnings('ignore', category=UserWarning)

def parse_resume(file_path):
    try:
        l#ogger.info(f"Starting resume parsing for: {file_path}")
        
        # Initialize parser and process file
        data = ResumeParser(file_path).get_extracted_data()
        
        # Log parsed results to console
        #logger.info("Successfully parsed resume:")
        #logger.info(json.dumps(data, indent=2))
        
        return {
            "success": True,
            "data": data
        }
        
    except Exception as e:
        #logger.error(f"Error parsing resume: {str(e)}")
        return {
            "success": False,
            "error": str(e)
        }

if __name__ == "__main__":
    try:
        # Get file path from command line argument (not stdin)
        if len(sys.argv) < 2:
            raise ValueError("Missing file path argument")
            
        file_path = sys.argv[1]
        #logger.info(f"Received file path: {file_path}")
        
        # Process resume
        result = parse_resume(file_path)
        
        # Output JSON to stdout (for Node.js)
        print(json.dumps(result))
        
    except Exception as e:
        #logger.error(f"Fatal error: {str(e)}")
        print(json.dumps({
            "success": False,
            "error": f"System error: {str(e)}"
        }))
        sys.exit(1)



# utils/resumeparser.py
# import sys
# import json
# from pyresparser import ResumeParser
# import warnings

# def parse_resume(file_path):
#     # Your resume parsing logic here
#     result = ResumeParser(file_path).get_extracted_data()
#     return result

# if __name__ == "__main__":
#     # Read input from stdin (file path passed from Node.js)
#     file_path = sys.stdin.read().strip()
    
#     # Process the resume
#     result = parse_resume(file_path)
    
#     # Return the result as JSON to stdout
#     print(json.dumps(result))


# data = ResumeParser(file_path).get_extracted_data()
# print(data['skills'])