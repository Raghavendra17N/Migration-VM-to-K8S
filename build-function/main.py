import os
from google.cloud import build_v1
from functions_framework import http

project_id = os.getenv["project_id"]
trigger_name = os.getenv["trigger_name"]
trigger_id = f'projects/{project_id}/triggers/{trigger_name}'

# Create a Build client
build_client = build_v1.services.build_service.BuildServiceClient()

@http
def cloud_build(request: http.HttpRequest) -> http.HttpResponse:
    # Build the Cloud Build trigger request
    build_request = build_v1.types.RunBuildTriggerRequest(
        name=trigger_id
    )

    # Send the request to trigger the Cloud Build trigger
    response = build_client.run_build_trigger(request=build_request)

    # Check if the request was successful
    if response:
        return http.HttpResponse(f'Cloud Build trigger "{trigger_name}" was successfully triggered.')
    else:
        return http.HttpResponse(f'Error triggering Cloud Build trigger "{trigger_name}": {response.text}', status_code=500)
