/**
 * Express application setup for the library management system.
 *
 * - Configures JSON body parsing middleware.
 * - Mounts the books router for handling book-related endpoints.
 */
const express = require("express");
const router = require("./books/index");

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Mount the books router at the root path
app.use("/", router);

module.exports = app;
