import sys
from flask import Flask,json, request, abort, jsonify, Response
from flask_cors import CORS, cross_origin
import time


from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5
import base64

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,true')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response


key = RSA.generate(2048)
private_key = key.export_key()
public_key = key.publickey().export_key()



rsa = RSA.importKey(private_key)
cipher = PKCS1_v1_5.new(rsa)

def encrypt(msg):
    msg=json.dumps(msg)
    encodedlist=[element.encode() for element in msg]
    encryptedlist=[]
    for i in encodedlist:
        encryptedelement=cipher.encrypt(i)
        encryptedlist.append(base64.b64encode(encryptedelement).decode('ascii'))
    encryptedlistjson=json.dumps(encryptedlist)
    return encryptedlistjson

def decrypt(msg):
    cryptedlist=msg
    decryptedlist=[]
    for i in cryptedlist:
        encodedcipher=base64.b64decode(i.encode('ascii'))
        decryptedcipher=cipher.decrypt(encodedcipher, b'DECRYPTION FAILED')
        decryptedlist.append(decryptedcipher.decode())
    decryptedlist=json.dumps(decryptedlist)
    print(decryptedlist)
    return decryptedlist
    



@app.route('/encrypt', methods=['POST'])
def encryptjson():
    if request.method== "POST":
        uncryptedop = request.json
    return encrypt(uncryptedop)


@app.route('/decrypt', methods=['post'])
def decryptjson():
    if request.method=="POST":
        cryptedop = request.json
    

    return decrypt(cryptedop)