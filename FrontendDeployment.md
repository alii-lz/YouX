# Frontend Deployment Steps

1. **Created an S3 Bucket**

    - Set up a new S3 bucket for hosting the frontend.

2. **Enabled Static Website Hosting**

    - Configured the S3 bucket to serve as a static website.

3. **Enabled Public Access**

    - Adjusted the bucket's permissions to allow public access.

4. **Generated and Added Bucket Policy**

    - Created a policy to manage access permissions and added it to the bucket.

5. **Built the Frontend**

    - Ran the following command to create the build files:

    ```
    npm run build
    ```

6. **Uploaded the Build Files**
    - Uploaded the generated build files to the S3 bucket.
