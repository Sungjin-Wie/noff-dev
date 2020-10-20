#!/usr/bin/env python
# coding: utf-8

# In[ ]:


# T81-558: Applications of Deep Neural Networks
# Module 13: Advanced/Other Topics
# Instructor: [Jeff Heaton](https://sites.wustl.edu/jeffheaton/), McKelvey School of Engineering, [Washington University in St. Louis](https://engineering.wustl.edu/Programs/Pages/default.aspx)
# For more information visit the [class website](https://sites.wustl.edu/jeffheaton/t81-558/).
# Deploy simple Keras tabular model with Flask only.
from flask import Flask, request, jsonify,send_from_directory
import uuid
import os
from tensorflow.keras.models import load_model
import numpy as np
import os
from flask import Flask, request, redirect, url_for
from werkzeug.utils import secure_filename
from tensorflow.keras.applications import MobileNet
from PIL import Image, ImageFile
from io import BytesIO
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet import preprocess_input
from tensorflow.keras.applications.mobilenet import decode_predictions
from torchvision import models
from PIL import Image
import matplotlib.pyplot as plt
import torch
import numpy as np
import torchvision.transforms as T
from numpy import asarray
import cv2


UPLOAD_FOLDER = ''
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
IMAGE_WIDTH = 224
IMAGE_HEIGHT = 224
IMAGE_CHANNELS = 3


def allowed_file(filename):
    return '.' in filename and            filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


fcn = models.segmentation.fcn_resnet101(pretrained=True).eval()

# Define the helper function
def decode_segmap(image, nc=21):
  
    label_colors = np.array([(0, 0, 0),  # 0=background
               # 1=aeroplane, 2=bicycle, 3=bird, 4=boat, 5=bottle
               (128, 0, 0), (0, 128, 0), (128, 128, 0), (0, 0, 128), (128, 0, 128),
               # 6=bus, 7=car, 8=cat, 9=chair, 10=cow
               (0, 128, 128), (128, 128, 128), (64, 0, 0), (192, 0, 0), (64, 128, 0),
               # 11=dining table, 12=dog, 13=horse, 14=motorbike, 15=person
               (192, 128, 0), (64, 0, 128), (192, 0, 128), (64, 128, 128), (192, 128, 128),
               # 16=potted plant, 17=sheep, 18=sofa, 19=train, 20=tv/monitor
               (0, 64, 0), (128, 64, 0), (0, 192, 0), (128, 192, 0), (0, 64, 128)])
    r = np.zeros_like(image).astype(np.uint8)
    g = np.zeros_like(image).astype(np.uint8)
    b = np.zeros_like(image).astype(np.uint8)

    for l in range(0, nc):
        idx = image == l
        r[idx] = label_colors[l, 0]
        g[idx] = label_colors[l, 1]
        b[idx] = label_colors[l, 2]

    rgb = np.stack([r, g, b], axis=2)
    return rgb

def segment(net, path, show_orig=True, dev='cuda'):
    img = Image.open(path)
    if show_orig: plt.imshow(img); plt.axis('off'); plt.show()
    # Comment the Resize and CenterCrop for better inference results
    
    trf = T.Compose([T.Resize(640), 
                   #T.CenterCrop(224), 
                   T.ToTensor(), 
                   T.Normalize(mean = [0.485, 0.456, 0.406], 
                               std = [0.229, 0.224, 0.225])])
    inp = trf(img).unsqueeze(0)
    #inp = trf(img).unsqueeze(0).to(dev)
    #out = net.to(dev)(inp)['out']
    out = net(inp)['out']
    
    om = torch.argmax(out.squeeze(), dim=0).detach().cpu().numpy()
    
    rgb = decode_segmap(om)
    
    
    plt.imshow(rgb); plt.axis('off')
    plt.show()
    return rgb


def prediction(selfie_path, back_path):
    result1 = segment(fcn, selfie_path)
    img = cv2.imread(selfie_path)
    img = cv2.resize(img, dsize=(result1.shape[1], result1.shape[0]), interpolation=cv2.INTER_AREA)

    img_gray = cv2.cvtColor(result1, cv2.COLOR_BGR2GRAY)
    ret, thres1 = cv2.threshold(img_gray,0,255,cv2.THRESH_BINARY)
    #find all your connected components (white blobs in your image)
    nb_components, output, stats, centroids = cv2.connectedComponentsWithStats(thres1, connectivity=8)
    #connectedComponentswithStats yields every seperated component with information on each of them, such as size
    #the following part is just taking out the background which is also considered a component, but most of the time we don't want that.
    sizes = stats[:, -1]
    nb_components = nb_components - 1

    # minimum size of particles we want to keep (number of pixels)
    #here, it's a fixed value, but you can set it as you want, eg the mean of the sizes or whatever

    #your answer image
    img2 = np.zeros((output.shape))

    temp = np.sort(sizes)

    # 인덱스 찾아서 잘라주기.
    img2[output == np.where(sizes==temp[-2])] = 255

    img2 = cv2.resize(img2, dsize=(result1.shape[1], result1.shape[0]), interpolation=cv2.INTER_AREA)

    backtorgb = cv2.cvtColor(img2.astype(np.uint8),cv2.COLOR_GRAY2RGB)
    img_gray = cv2.cvtColor(backtorgb, cv2.COLOR_BGR2GRAY)
    ret, img_binary = cv2.threshold(img_gray, 127, 255, 0)
    contours, hierarchy = cv2.findContours(img_binary, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)


    for cnt in contours:
        cv2.drawContours(backtorgb, [cnt], 0, (0,0,0),5)  # blue

    bit_not = cv2.bitwise_not(backtorgb)

    middle = cv2.subtract(img,bit_not)
    
    bit_and = cv2.resize(middle, dsize=(600, 400), interpolation=cv2.INTER_AREA)
    
    bit_and = cv2.copyMakeBorder(bit_and, 240, 0, 180, 180, cv2.BORDER_CONSTANT,value = (255,255,255))
    
    backtorgb= cv2.resize(backtorgb, dsize=(600, 400), interpolation=cv2.INTER_AREA)
    
    
    backtorgb = cv2.copyMakeBorder(backtorgb, 240, 0, 180, 180, cv2.BORDER_CONSTANT)
    
    back = cv2.imread(back_path)
    back = cv2.resize(back, dsize=(960,640), interpolation=cv2.INTER_AREA)
    back[backtorgb==255]=0
    bit_and[bit_and==255]=0
    bit_and2 = cv2.add(back,bit_and)

    return bit_and2
@app.route('/', methods=['GET'])
def send_index():
    return send_from_directory('./www', "index.html")

@app.route('/<path:path>', methods=['GET'])
def send_root(path):
    return send_from_directory('./www', path)

@app.route('/api/image', methods=['POST'])
def upload_image():
  # check if the post request has the file part
    if 'image' not in request.files:
        return jsonify({'error':'No posted image. Should be attribute named image.'})
    file = request.files['image']

  # if user does not select file, browser also
  # submit a empty part without filename
    if file.filename == '':
        return jsonify({'error':'Empty filename submitted.'})
    
    if file and allowed_file(file.filename):
        
        filename = secure_filename(file.filename)       
       
        pred = prediction(filename, 'background.jpg')        
        cv2.imshow("asd",pred)
        cv2.waitKey(0)
        cv2.destroyAllWindows()
        
        response = {'pred':'success'}
        
        return jsonify(response)
    else:
        return jsonify({'error':'File has invalid extension'})

if __name__ == '__main__':
    #app.run(host= '0.0.0.0',debug=True)
    from werkzeug.serving import run_simple
    run_simple('localhost', 9000, app)

