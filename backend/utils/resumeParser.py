# backend/utils/resumeParser.py
import sys
import os
import re

import docx2txt
import pdfplumber

def extract_text(file_path):
    text = ''
    if file_path.lower().endswith('.pdf'):
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                text += page.extract_text()
    elif file_path.lower().endswith('.docx'):
        text = docx2txt.process(file_path)
    else:
        text = ''
    return text

def parse_resume(file_path):
    text = extract_text(file_path)

    # Simple regex-based parsing (For demonstration purposes)
    education = re.findall(r'(Bachelor|Master|PhD)[^\.]*\.', text, re.IGNORECASE)
    experience = re.findall(r'[0-9]+ years experience[^\.]*\.', text, re.IGNORECASE)
    skills = re.findall(r'Skills\s*:\s*(.*)', text, re.IGNORECASE)

    return {
        'education': ' '.join(education),
        'experience': ' '.join(experience),
        'skills': ' '.join(skills)
    }

if __name__ == '__main__':
    file_path = sys.argv[1]
    parsed_data = parse_resume(file_path)
    print(parsed_data)