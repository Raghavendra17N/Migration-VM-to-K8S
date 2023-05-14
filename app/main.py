from fastapi import FastAPI
import json 
from fastapi.middleware.cors import CORSMiddleware
from fastapi.requests import Request
from tinydb import TinyDB
from pymongo import MongoClient
import os
import urllib.parse
import logging

LOG_FORMAT = '%(asctime)s - %(remote_addr)s - %(levelname)s - %(message)s'
logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
logger = logging.getLogger(__name__)

app_handler = logging.FileHandler('app.log')
app_handler.setLevel(logging.INFO)
app_handler.setFormatter(logging.Formatter(LOG_FORMAT))
logger.addHandler(app_handler)

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
Client=MongoClient(f'mongodb://{user_name}:{urllib.parse.quote_plus(passwd)}@{host}/')
list_db=Client.list_database_names()
if "infra_details" in list_db:
    logger.info("Infra_deatils DB exists")
else:
    Client.infra_details
colls = Client.infra_details.list_collection_names()
if "infra_cols" in colls:
    logger.info("Collection Exists")
else:
    Client.infra_details.infra_cols

@app.get("/list_existing_vpc/{project_id}")
async def list_vpc(project_id):
    # file_data = "/var/file.json"
    # data=TinyDB(file_data)
    logger.info("Endpoint list_existing_vpc accessed")
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
