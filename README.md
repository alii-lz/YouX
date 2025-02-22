# YouX

## Links

-   **Frontend**: [http://aliz-youx-bucket.s3-website-ap-southeast-2.amazonaws.com/](http://aliz-youx-bucket.s3-website-ap-southeast-2.amazonaws.com/)
-   **Backend**: [https://ypqbanv6awq47iukox6vgvq3oe0yfkrl.lambda-url.ap-southeast-2.on.aws/hello](https://ypqbanv6awq47iukox6vgvq3oe0yfkrl.lambda-url.ap-southeast-2.on.aws/hello)
-   **Swagger**: [https://ypqbanv6awq47iukox6vgvq3oe0yfkrl.lambda-url.ap-southeast-2.on.aws/api-docs/](https://ypqbanv6awq47iukox6vgvq3oe0yfkrl.lambda-url.ap-southeast-2.on.aws/api-docs/)

## Project Overview

Full-stack web application built using the MERN stack. App consists of a backend API with authentication and database interactions and a frontend styled with Tailwind CSS.

## Tech Stack

### Backend:

-   **Node.js & Express**: Handles API requests.
-   **MongoDB & Mongoose**: Database for storing users and applications.
-   **Swagger**: API documentation (backend/swagger.yaml).
-   **Jest**: Testing framework.

### Frontend:

-   **React**: Main frontend framework.
-   **Tailwind CSS**: Styling.
-   **React Router**: For client-side routing
-   **Axios**: For HTTP requests

## Installation & Setup

### Prerequisites

-   Node.js installed
-   Clone the repo

### Environment Variables

Create a `.env` file in the backend directory. Copy & Paste contents from the provided .env file.

### Backend Setup

```
cd backend
npm install
```

Next, set NODE_ENV=local in the backend/.env file

### Frontend Setup

```
cd frontend
npm install
```

Next, set the url in frontend/src/url.js to "http://localhost:3001"

Next, cd into the root directory and run:

```
npm install
npm start
```

This will start the backend and frontend simultaneously

### Testing

```
cd backend
npm test
```

[Optional] Ensure in backend/.env NODE_ENV is:

```
NODE_ENV=test
```
