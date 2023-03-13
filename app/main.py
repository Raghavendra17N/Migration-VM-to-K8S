from fastapi import FastAPI
import json 
from fastapi.middleware.cors import CORSMiddleware
from fastapi.requests import Request
from tinydb import TinyDB
from pymongo import MongoClient

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
host = os.environ['monogohost']
Client=MongoClient(host,27017)
list_db=Client.list_database_names()
if "infra_details" in list_db:
    print("Infra_deatils DB exists")
else:
    Client.infra_details
if "infra_col" in colls:
    print("Collection Exists")
else:
    

@app.get("/list_existing_vpc/{project_id}")
async def list_vpc(project_id):
    file_data = "/var/file.json"
    data=TinyDB(file_data)
    vpc_list = []
    project = project_id
    project_list = [project]
    vpc_list.append("default")
    data_vpc=dict.fromkeys(project_list,vpc_list)
    data.insert({"project_id":"charged-muse-376504"})
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
