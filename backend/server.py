from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import request, make_response, jsonify

import json
import hashlib
import os
import jwt
import datetime

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb://localhost:27017/briskon"
mongo = PyMongo(app)

# SIGN UP
@app.route('/auth/signup', methods = ['POST'])
def register():
    userName = request.json['userName']
    email = request.json['email']
    passwordHash = request.json['password']
    passwordHash = md5_hash(passwordHash)

    checkEmail = mongo.db.users.find({'email' : email}).count()
    checkUserName = mongodb.users.find({'userName' : userName}).count()
    # print(checkEmail)

    if checkEmail == 0 and checkUserName == 0:
        mongo.db.users.insert_one({'userName' : userName, 'email' : email, 'passwordhash' : passwordHash })
        return {"status": 'User created successfully'}
    else:
        return {"status" : 'email already taken' } 

# LOGIN
@app.route('/auth/login', methods = ['POST'])
def signin():
    email = request.json['email']
    password = request.json['password']
    check = md5_hash(password)

    checkUser = mongo.db.users.find({"email" : email, "passwordhash" : check}).count()
    getFullName = mongo.db.users.find({"email" : email, "passwordhash" : check})

    if checkUser == 0:
        return {"status" : 401}
    else:
        encode_data = jwt.encode({'email' : email}, 'naga' , algorithm='HS256').decode('utf-8')
        return {"status": str(encode_data)} 

# HASHING
def md5_hash(string):
    hash = hashlib.md5()
    hash.update(string.encode('utf-8'))
    hash.hexdigest()
    return hash.hexdigest()

# GREET USER
@app.route('/greetuser')
def greetUser():
    auth_header = request.headers.get('Authorization')
    token_encoded = auth_header.split(' ')[1]
    decoded_data = jwt.decode(token_encoded, 'naga', algorithm='HS256')

    x = datetime.datetime.now()
    time = int(x.strftime('%H'))
    getName = mongo.db.users.find({'email' : decoded_data['email']})

    if time < 12:
        greet = 'Good morning' + ' ' + getName[0]['userName']
    elif time >= 12 and time <= 17:
        greet = 'Good Afternoon' + ' ' + getName[0]['userName']
    else:
        greet = 'Good evening' + ' ' + getName[0]['userName']
    return greet

# GETTING ALL PRODUCTS
@app.route('/getallproducts')
def getAllProducts():
    Products = mongo.db.products.find()
    return dumps(Products)

# POSTING THE PRODUCT
@app.route('/post/product', methods=['POST'])
def postProduct():
    auth_header = request.headers.get('Authorization')
    token_encoded = auth_header.split(' ')[1]
    decoded_data = jwt.decode(token_encoded, 'naga', algorithm='HS256')

    getName = mongo.db.users.find({'email' : decoded_data['email']})
    productName = request.headers.get('productName')
    productType = request.headers.get('productType')
    productPrice = int(request.headers.get('productPrice'))
    image = request.files['image']
    location = "static/img/" + image.filename
    image.save(location)
    imgLocation = location

    mongo.db.products.insert_one({'postedBy' : getName[0]['userName'], 'productName' : productName, 'productType' : productType, 'productPrice' : productPrice, 'imgLocation' : imgLocation, 'blogs' : [], 'Orders' : []})
    return {'status' : 'Posted Successfully'}

# WRITING A BLOG ARTICLE
@app.route('/blog/<_id>', methods=['post']) 
def writeBlog(_id):
    auth_header = request.headers.get('Authorization')
    token_encoded = auth_header.split(' ')[1]
    decoded_data = jwt.decode(token_encoded, 'naga', algorithm='HS256')

    getName = mongo.db.users.find({'email' : decoded_data['email']})
    content = request.json['content']

    mongo.db.products.update({'_id' : ObjectId(_id)}, {'$push' :{'blogs' : {'createdBy' : getName[0]['userName'], 'content' : content}}})
    
    return {'status' : 200}

# GETTING PARTICULAR PRODUCT
@app.route('/getparticulararticle/<_id>')
def getParticularArticle(_id):
    Products = mongo.db.products.find({'_id' : ObjectId(_id)})
    return dumps(Products)

# ORDER
@app.route('/order/<_id>', methods=['PATCH'])
def order(_id):
    userName = request.json['userName']
    email = request.json['email']
    mobileNumber = int(request.json['mobileNumber'])
    line1 = request.json['line1']
    city = request.json['city']
    pinCode = int(request.json['pinCode'])
    state = request.json['state']

    mongo.db.products.update({'_id' : ObjectId(_id)}, {'$push' :{'Orders' : {'userName' : userName, 'email' : email, 'mobileNumber' : mobileNumber, 'line1' : line1, 'city' : city, 'pinCode' : pinCode, 'state' : state}}})
    return {'status' : 200}

# GET POST BY LOGGED IN USER
@app.route('/getproducts')
def getProducts():
    auth_header = request.headers.get('Authorization')
    token_encoded = auth_header.split(' ')[1]
    decoded_data = jwt.decode(token_encoded, 'naga', algorithm='HS256')

    getName = mongo.db.users.find({'email' : decoded_data['email']})

    data = mongo.db.products.find({'postedBy' : getName[0]['userName']})
    return dumps(data)

# DELETE POST
@app.route('/deletepost/<_id>', methods=['DELETE'])
def deletePost(_id):
    mongo.db.products.remove({'_id' : ObjectId(_id)})
    return {'status' : 200}

# UPDATE POST
@app.route('/updatepost/<_id>', methods=['PATCH'])
def updatePost(_id):
    productName = request.headers.get('productName')
    productType = request.headers.get('productType')
    productPrice = int(request.headers.get('productPrice'))
    image = request.files['image']
    location = "static/img/" + image.filename
    image.save(location)
    imgLocation = location

    mongo.db.products.update({"_id": ObjectId(_id) }, {"$set": {'productName' : productName, 'productType': productType, 'productPrice' : productPrice, 'imgLocation' : imgLocation}})
    return {'status' : 'Updated Successfully'}