
# Sign-In-using-google-and-file-uploader

This is a web application that allows users to sign in using Google authentication and upload files to a local directory of a web server. Users can view a list of all files uploaded using the same uploader and download files by clicking on them. The application is built using React JS and Node.js.

## Getting Started
To get started with the project, clone the repository to your local machine and navigate to the project directory.

## Prerequisites
To run the application, you will need to have Node.js and npm installed on your machine. You will also need a Google account to set up Google authentication.

## Installing
To install the project dependencies, run the following command in the project directory:

npm install


## Running the Application
To run the application, first set up Google authentication by creating a Google Cloud Platform project and enabling the Google Sign-in API. Then, create a .env file in the root directory of the project and add the following environment variables:

+ CLIENT_ID = your-google-client-id
+ CLIENT_SECRET = your-google-client-secret
+ SECRET_KEY = your-session-secret
+ CLIENT_URL = "http://localhost:3000/"
+ PORT = Server-PORT-Number

To start the server, run the following command:
+ npm start

This will start the Node.js server on port 8080.

To start the client, run the following command in a separate terminal:
+ npm start

This will start the React development server on port 3000.

Security Considerations
The application handles sensitive user data, so security is a top priority. Here are some measures we have taken to ensure the security of the application:

+ User authentication is handled by Google, which provides secure authentication through OAuth 2.0.
+ Uploaded files are stored in a local directory of the web server, which is not accessible from the public internet.
+ Access to uploaded files is controlled by the Node.js server, which only allows authenticated users to view and download files.
+ Uploaded files are validated to ensure that they are of the correct format and do not contain any malicious code.
