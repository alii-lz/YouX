# Backend Deployment Steps

1. **Import Serverless**

    - Imported the serverless package to handle deployment.

2. **Export Handler with the App Wrapped in It**

    - Exported a handler function with the app wrapped inside it.

3. **Created an AWS Lambda Function**

    - Set up a new AWS Lambda function to run the backend code.

4. **Uploaded the Backend Code**

    - Uploaded the backend code to the Lambda function.

5. **Created REST API**

    - Set up a REST API using API Gateway.

6. **Created and Configured Proxy Resource**

    - Created a proxy resource to route requests to the Lambda function and configured it accordingly.

7. **Enabled CORS**

    - Enabled Cross-Origin Resource Sharing (CORS) to allow frontend access.

8. **Invoked the Lambda Function**

    - Configured the REST API to invoke the Lambda function when requests are made.

9. **Deployed API**
    - Deployed the REST API to make the backend accessible.
