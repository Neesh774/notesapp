import pytesseract
import cv2
import urllib.request
import numpy as np
import os
from PIL import Image

# image = Image.open('/Users/neesh/notesapp/oreologo.png')
# print(os.listdir('/Users/neesh/notesapp'))
# print(image.format)
# print(image.size)
# print(image.mode)
# # show the image
# # load_image.show()


img = cv2.imread("pacertest.png")

img = cv2.resize(img, (600, 360))
print(pytesseract.image_to_string(img))
cv2.imshow('Result', img)
cv2.waitKey(0)

