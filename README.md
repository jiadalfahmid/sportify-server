# Sportify Server API

This repository contains the server-side code for **Sportify**, a sports equipment management application. It provides a RESTful API for handling CRUD operations on sports equipment data.

## Features

- **Add New Equipment**  
  Post new sports equipment details to the database.
  
- **Retrieve All Equipment**  
  Fetch all available equipment in the collection.
  
- **Retrieve Sorted Equipment**  
  Get all equipment sorted by price in ascending order.

- **Fetch Limited Equipment**  
  Retrieve the latest 6 equipment items for the homepage.

- **User-Specific Equipment**  
  Retrieve equipment data using the user's email.

- **View Individual Equipment**  
  Fetch details of a specific equipment item using its unique ID.

- **Update Equipment Details**  
  Update existing equipment details by ID.

- **Delete Equipment**  
  Remove an equipment entry by ID.

---

## Installation (For Local Development)

### Prerequisites

- **Node.js** (version 14.x or later)
- **MongoDB Atlas** account
- **npm** package manager
- **dotenv** for environment variable management

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/jiadalfahmid/sportify-server.git
   cd sportify-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection credentials:
   ```bash
   DB_USER=your-mongodb-username
   DB_PASS=your-mongodb-password
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Access the API at `http://localhost:5000`.

---

## API Endpoints

### **Base URL:** `https://sportify-sand-six.vercel.app`

| Method | Endpoint                   | Description                              |
|--------|----------------------------|------------------------------------------|
| GET    | `/`                        | Returns a welcome message                |
| POST   | `/equipment`               | Adds new equipment                       |
| GET    | `/equipment`               | Retrieves all equipment                  |
| GET    | `/equipment/sorted`        | Retrieves all equipment sorted by price  |
| GET    | `/equipment/six`           | Retrieves the latest 6 equipment items   |
| GET    | `/equipment/user?email=`   | Retrieves equipment by user email        |
| GET    | `/equipment/:id`           | Retrieves details of a specific item     |
| PUT    | `/equipment/:id`           | Updates a specific equipment item        |
| DELETE | `/equipment/:id`           | Deletes a specific equipment item        |


---

## Project Structure

```
/sportify-server
│
├── server.js            # Main server file
├── package.json         # Project dependencies and scripts
├── .env                 # Environment variables (DB credentials)
└── README.md            # Documentation
```

---

## Dependencies

- **express** – Web framework for Node.js
- **cors** – Middleware for enabling Cross-Origin Resource Sharing
- **mongodb** – MongoDB Node.js driver
- **dotenv** – For loading environment variables

---

## Deployment

The API is deployed on **Vercel** and can be accessed via the base URL:  
[https://sportify-sand-six.vercel.app](https://sportify-sand-six.vercel.app)

---

## Author

**Md. Jiad Al Fahmid**  
Let's learn and grow together!

---

For any issues or contributions, feel free to submit a pull request or create an issue on the GitHub repository:  
[GitHub Repository](https://github.com/jiadalfahmid/sportify-server)

---
