from summarizer import Summarizer
from flask import Flask, jsonify, request
import pytesseract
import cv2, wget
import base64
from flask_ngrok import run_with_ngrok


import urllib.request
import numpy as np
import io
import os
from imageio import imread

from PIL import Image



model = Summarizer()
app = Flask(__name__)

text = { 'text': ""}

image = { 'img': ""}

print("starting")

@app.route('/', methods=['GET'])
def get():
    return "Hello World"

@app.route('/summary', methods=['POST'])
def summarize():
    global text
    data = request.get_json()
    text = data['text']
    text = model(text)
    return jsonify({"text": text})
  
@app.route('/text', methods=['POST'])
def getText():
  global image
  '''
  b64_string = request.get_json()["img"]
  img = imread(io.BytesIO(base64.b64decode(b64_string)))
  cv2_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
  summary = pytesseract.image_to_string(cv2_img)
  '''
  image_url = request.get_json()["img"]
  filename = wget.download(image_url)
  np_image = cv2.imread(filename)
  summary = pytesseract.image_to_string(np_image)
  return jsonify({"img" : summary})


    
if __name__ == "__main__":
  app.run(port=8000, host="0.0.0.0")
  