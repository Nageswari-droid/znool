/**
 * Entry point for starting the Express server.
 *
 * - Loads environment variables from .env file.
 * - Starts the server on the specified port.
 */
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();

/**
 * The port number on which the server will listen.
 * Defaults to 3000 if not specified in environment variables.
 * @type {number}
 */
const port = process.env.PORT || 3000;

// Start the server and log the port
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
