import os
from google.cloud.devtools import cloudbuild_v1
from functions_framework import http

project_id = os.getenv["project_id"]
trigger_id = os.getenv["trigger_name"]

# Create a Build client
client = cloudbuild_v1.CloudBuildClient()

@http
def cloud_build(request: http.HttpRequest) -> http.HttpResponse:
    # Build the Cloud Build trigger request
    request = cloudbuild_v1.RunBuildTriggerRequest(
        project_id=f"{project_id}",
        trigger_id=f"{trigger_id}",
    )

    # Send the request to trigger the Cloud Build trigger
    operation = client.run_build_trigger(request=request)
    response = operation.result()
    # Check if the request was successful
    print(response)
