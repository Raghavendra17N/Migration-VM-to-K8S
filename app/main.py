from fastapi import FastAPI
import json 
from fastapi.middleware.cors import CORSMiddleware
from fastapi.requests import Request
from tinydb import TinyDB
from pymongo import MongoClient
import os
import urllib.parse

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
host = os.environ['MONGO_HOST']
user_name = os.environ['USER']
passwd = os.environ['PASSWD']
port = os.environ['PORT']
# host = "localhost"
Client=MongoClient(f'mongodb://{user_name}:{urllib.parse.quote_plus(passwd)}@{host}:{port}/')
list_db=Client.list_database_names()
if "infra_details" in list_db:
    print("Infra_deatils DB exists")
else:
    Client.infra_details
colls = Client.infra_details.list_collection_names()
if "infra_cols" in colls:
    print("Collection Exists")
else:
    Client.infra_details.infra_cols

@app.get("/list_existing_vpc/{project_id}")
async def list_vpc(project_id):
    # file_data = "/var/file.json"
    # data=TinyDB(file_data)
    vpc_list = []
    project = project_id
    project_list = [project]
    vpc_list.append("default")
    data_vpc=dict.fromkeys(project_list,vpc_list)
    Client.infra_details.infra_cols.insert_one({"project_id":"charged-muse-376504"})
    # data.insert({"project_id":"charged-muse-376504"})
    return data_vpc

@app.get("/details")
async def details():
    data = TinyDB('/var/file.json')
    response = data.all()
    return response

@app.post("/create_vpc")
async def create_vpc(request: Request):
    vpc = await request.json()
    response = "success"
    return response
