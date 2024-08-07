Frontend Project Setup and API Routes Documentation
This document provides an overview of the available frontend routes and the steps to set up the project.

Frontend Routes
Main Routes

Home Page
URL: http://localhost:3000
Description: The main landing page of the application.

Cancel Classes
URL: http://localhost:3000/cancel
Description: Page to cancel booked classes.

Create Class
URL: http://localhost:3000/create-class
Description: Page to create new classes.

Yoga Class Details
URL: http://localhost:3000/Yoga/66b36d05503e9a7bd58064f6
Description: Page showing details for the Yoga class with the specific ID.

Project Setup
Follow the steps below to set up and run the frontend project:

Navigate to the project directory:

cd front/

Install dependencies:
npm install

Build the project:
npm run build

Start the project:
npm start

Available API Routes

Add Classes
Endpoint: /api/add-classes
Method: POST
Description: Adds new classes to the system.

Book Classes
Endpoint: /api/book-classes
Method: POST
Description: Books classes for a user.

Cancel Classes
Endpoint: /api/cancel-classes
Method: POST
Description: Cancels booked classes.

Get All Classes
Endpoint: /api/all-classes
Method: GET
Description: Retrieves all available classes.

Get Classes by ID
Endpoint: /api/all-classes/:id
Method: GET
Description: Retrieves class details by ID.

Get User Classes
Endpoint: /api/getuser-classes
Method: GET
Description: Retrieves classes booked by the user.

Filter Classes
Endpoint: /api/filter-classes
Method: GET
Description: Filters classes based on criteria.

