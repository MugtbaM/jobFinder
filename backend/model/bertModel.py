# backend/models/bertModel.py
import sys
from transformers import BertTokenizer, BertForSequenceClassification
import torch

def predict_job_title(user_data):
    # Load the tokenizer and model (Ensure the model is fine-tuned and available)
    tokenizer = BertTokenizer.from_pretrained('path/to/your/fine-tuned-model')
    model = BertForSequenceClassification.from_pretrained('path/to/your/fine-tuned-model')

    # Tokenize input text
    inputs = tokenizer(user_data, return_tensors='pt', truncation=True, max_length=512)

    # Get prediction
    outputs = model(**inputs)
    logits = outputs.logits
    predicted_class = torch.argmax(logits, dim=1).item()

    # Map predicted class to job title
    job_titles = {0: 'Software Engineer', 1: 'Data Scientist', 2: 'Project Manager'}
    job_title = job_titles.get(predicted_class, 'Unknown Position')

    print(job_title)

if __name__ == '__main__':
    user_data = sys.argv[1]
    predict_job_title(user_data)