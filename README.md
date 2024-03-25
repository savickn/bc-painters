# AutoShop

## Cloud Deployment

Found at https://www.savickasn.com
Please login using email 'admin@example.com' and password '*admin1' to access an admin account that can view the Analytics panel. 

## Prerequisites

Before running the application, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later)
- [MongoDB](https://www.mongodb.com/) (Make sure MongoDB is running on your machine)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/4413-ecomm.git
    cd 4413-ecomm
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## Running Tests

To run tests, use the following npm commands:

```bash
npm run test:all
npm run test:models
npm run test:endpoints
```

You can run through all tests or specify between models & integration tests.

## Running Locally & Using Postman

To run tests or examine the APIs, use the following npm command:

```bash
npm run dev
```

Afterwards, the app will be running on port 3001 on your localhost (http://localhost:3001/). Postman may be used with the appropriate test urls being available in each individual test file or in the design documentation.

To access the frontend website, please use the following npm commands:

```bash
npm run build:client
npm run start:client
```