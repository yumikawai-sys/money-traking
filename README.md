# Money Tracker App

A small MERN (MongoDB, Express, React, Node.js) app to track money flow.

## Features

- Input transactions with validation
- Calculate and display balance

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up MongoDB and update configuration if necessary.

## Configuration

- MongoDB connection: Update `MONGO_URL` in the server's `.env` file.

## API Endpoints

- `POST /api/transaction`: Add a new transaction.
- `GET /api/transactions`: Get all transactions.

## Technologies Used

- React
- Node.js
- Express
- MongoDB

## Project Structure

- `/src`: React frontend
- `/api`: Node.js and Express backend
- `/model`: MongoDB schema/model
