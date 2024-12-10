# todo_api

Todo Api
This is the backend for the Todo List App built with Express.js, Prisma, and MySQL.

Features
REST API for managing tasks: Create, Read, Update, Delete.
Connected to a MySQL database using Prisma.

Setup Instructions
1. Clone the Repository
    git clone <backend-repo-url>
    cd backend

2. Install Dependencies
    npm install

3. Create Environment Variables
Create a .env file in the root of the project with the following content:
    DATABASE_URL="mysql://username:password@localhost:3306/todo_app"
Replace username, password, and todo_app with your database credentials.

4. Initialize the Database
Run the following commands to set up your database with Prisma:
    npx prisma db push
    npx prisma generate

5. Start the Server
    npm run dev
The backend will run at http://localhost:3001.

API Endpoints
Method	Endpoint	Description
GET	    /tasks	    Fetch all tasks
POST	/tasks	    Create a new task
GET     /tasks/:id  Fetch a specific task
PUT	    /tasks/:id	Update a specific task
DELETE	/tasks/:id	Delete a specific task

Database Initialization

Make sure your MySQL server is running locally.

Create a database named todo_app (or the name in your .env file):
    CREATE DATABASE todo_app;

Use Prisma to push the schema to your database: 
    npx prisma db push

Open the Prisma Studio to view and manage your data (optional):
    npx prisma studio
