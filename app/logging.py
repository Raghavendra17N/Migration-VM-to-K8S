import uvicorn
import logging.config
from fastapi import FastAPI
import json 
from logging.handlers import RotatingFileHandler
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

# create a file handler for the application logs
app_handler = logging.FileHandler('/var/app.log')
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


@app.get("/logging_info")
async def logging_info(request: Request):
    logger.info("Hello, world!", extra={"remote_addr": request.client.host})
    return "Hello World"
