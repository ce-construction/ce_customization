import frappe
from flask import Flask, request, jsonify
from pdf2image import convert_from_path
from PIL import Image
import os
import requests
import time

app = Flask(__name__)

def save_images(images):
    urls = []
    for i, img in enumerate(images):
        filename = f'image{i}.png'
        filepath = os.path.join('static', filename)
        img.save(filepath, 'PNG')
        urls.append(request.url_root + 'static/' + filename)
    return urls

@frappe.whitelist(allow_guest=True)
def convert():
    data = request.get_json()  # Correctly parse JSON data
    pdf_url = data.get('pdf') if data else None
    if not pdf_url:
        return jsonify({"error": "No PDF URL provided"}), 400

    # Download the PDF file
    response = requests.get(pdf_url)
    pdf_file_path = 'temp.pdf'
    with open(pdf_file_path, 'wb') as f:
        f.write(response.content)

    # Wait for the file to be fully downloaded
    time.sleep(1)

    # Convert the PDF file to images
    try:
        images = convert_from_path(pdf_file_path)
        image_urls = save_images(images)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        # Delete the temporary PDF file
        if os.path.exists(pdf_file_path):
            os.remove(pdf_file_path)

    return jsonify({'image_urls': image_urls})

if __name__ == '__main__':
    app.run(debug=True)
