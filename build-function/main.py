from google.cloud.devtools import cloudbuild_v1
import functions_framework

@functions_framework.http
def cloud_build(request):
    # Build the Cloud Build trigger request
    client = cloudbuild_v1.CloudBuildClient()
    request = cloudbuild_v1.RunBuildTriggerRequest(
        project_id="charged-muse-376504",
        trigger_id="slack-cmd",
    )

    # Send the request to trigger the Cloud Build trigger
    operation = client.run_build_trigger(request=request)
    response = operation.result()
    # Check if the request was successful
    print(response)

    return 'Success'