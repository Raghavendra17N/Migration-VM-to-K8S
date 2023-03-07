from fastapi import FastAPI
import json 
from fastapi.middleware.cors import CORSMiddleware
from fastapi.requests import Request
from tinydb import TinyDB

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/list_existing_vpc/{ProjectId}")
async def list_vpc():
    file_data = "file.json"
    data=TinyDB(file_data)
    data.insert({"project_id":"charged-muse-376504"})
    return {"charged-muse-376504":"default"}

@app.get("/details")
async def details():
    data = TinyDB('file.json')
    response = data.all()
    return response

@app.post("/creat_vpc")
async def create_vpc(request: Request):
    return "success"
