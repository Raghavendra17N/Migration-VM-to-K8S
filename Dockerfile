#Use an official Python runtime as a parent image

FROM python:3.9

# Set the working directory inside the container

WORKDIR /backend

# Copy the requirements.txt file to the container
COPY ./requirements.txt /backend/requirements.txt

# Install the dependencies
RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

# Copy the remaining application code to the container
COPY ./app /backend/app

# Build the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]


