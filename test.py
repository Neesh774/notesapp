from summarizer import Summarizer
from flask import Flask, jsonify, request
import pytesseract
import cv2
import base64

import urllib.request
import numpy as np
import io
import os
from imageio import imread

from PIL import Image
import base64
import io
import cv2
from imageio import imread
import matplotlib.pyplot as plt

model = Summarizer()

# constitution.jpg
# warof1812.jpg
filename = "pacertest.png"
with open(filename, "rb") as fid:
    data = fid.read()

b64_bytes = base64.b64encode(data)
b64_string = b64_bytes.decode()

img = imread(io.BytesIO(base64.b64decode(b64_string)))
cv2_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

text = pytesseract.image_to_string(cv2_img)
print("======TEXT========")
print(text)
print("========SUMMARY========")
print(model(text))
