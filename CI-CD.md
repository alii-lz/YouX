## Overview

The workflow is triggered on two events:
1. **Push** to the `main` branch.
2. **Pull request** targeting the `main` branch.

## Workflow Configuration

### Triggers
- **Push to `main` branch**: The workflow runs when code is pushed to the `main` branch.
- **Pull request to `main` branch**: The workflow also runs when a pull request is made targeting the `main` branch.

### Jobs
- **`build`**: This job runs on the `ubuntu-latest` environment and includes the following steps:

## Steps

### 1. Checkout Repository
- **Action**: `actions/checkout@v4`
- **Purpose**: This step checks out the repository code onto the runner, allowing subsequent steps to access and work with the code.

### 2. Set Up Node.js
- **Action**: `actions/setup-node@v4`
- **Purpose**: This step sets up the Node.js environment on the runner.
- **Configuration**:
  - `node-version`: Specifies the Node.js version to use (version 20 in this case).
  - `cache`: Enables caching of npm dependencies to speed up subsequent builds.

### 3. Install Frontend Dependencies
- **Command**: `npm ci`
- **Purpose**: This step installs the frontend dependencies using `npm ci`, which is a clean install that respects the `package-lock.json` file.
- **Working Directory**: The command is executed in the `frontend` directory.

### 4. Install Backend Dependencies for Testing
- **Command**: `npm ci`
- **Purpose**: This step installs the backend dependencies required for running tests.
- **Working Directory**: The command is executed in the `backend` directory.

### 5. Run Backend Tests
- **Command**: `npm test`
- **Purpose**: This step runs the backend tests using the `npm test` command.
- **Working Directory**: The command is executed in the `backend` directory.
- **Environment Variables**:
  - `TEST_MONGODB_CONNECTION`: The connection string for the MongoDB database used in testing, in GitHub secrets.
  - `JWT_SECRET`: The secret key used for JWT, in GitHub secrets.

### 6. Build Frontend
- **Command**: `npm run build`
- **Purpose**: This step builds the frontend application.
- **Working Directory**: The command is executed in the `frontend` directory.

### 7. Configure AWS Credentials
- **Action**: `aws-actions/configure-aws-credentials@v2`
- **Purpose**: This step configures AWS credentials on the runner, allowing subsequent steps to interact with AWS services.
- **Configuration**:
  - `aws-access-key-id`: The AWS access key ID, in GitHub Secrets.
  - `aws-secret-access-key`: The AWS secret access key, in GitHub Secrets.
  - `aws-region`: The AWS region, in GitHub Secrets.

### 8. Deploy Frontend to S3
- **Command**: `aws s3 sync ./frontend/build s3://${{ secrets.S3_BUCKET }} --delete`
- **Purpose**: This step deploys the built frontend files to an AWS S3 bucket. The `--delete` flag ensures that any files in the S3 bucket that are not in the local `build` directory are removed.
- **Working Directory**: The command is executed in the root directory, but references the `frontend/build` directory.

### 9. Deploy Backend to Lambda
- **Commands**:
  - `rm -rf node_modules`: Removes the existing `node_modules` directory for a clean production install.
  - `npm ci --production`: Install only the production dependencies for the backend.
  - `zip -r function.zip .`: Zips the backend code and dependencies into a `function.zip` file.
  - `aws lambda update-function-code --function-name ${{ secrets.LAMBDA_FUNCTION_NAME }} --zip-file fileb://function.zip`: Updates the AWS Lambda function with the new code.
- **Purpose**: This step deploys the backend code to an AWS Lambda function.
- **Working Directory**: The commands are executed in the `backend` directory.
