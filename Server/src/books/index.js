/**
 * Express router for library management system endpoints.
 *
 * Routes:
 *   GET    /books        - Get all books
 *   POST   /books        - Add a new book (expects book data in body)
 *   PUT    /books/:id    - Update a book by ID (expects book data in body)
 *   DELETE /books/:id    - Delete a book by ID
 */
const {
  getAllBooks,
  addNewBook,
  updateBook,
  deleteBook,
} = require("./controller");
const router = require("express").Router();

/**
 * @route GET /books
 * @desc Retrieve all books
 * @returns {Array<Object>} List of books
 */
router.get("/books", getAllBooks);

/**
 * @route POST /books
 * @desc Add a new book
 * @body { title, author, genre, year, description }
 * @returns {Object} The created book object
 */
router.post("/books", addNewBook);

/**
 * @route PUT /books/:id
 * @desc Update a book by ID
 * @param {string} id - Book ID
 * @body { title, author, genre, year, description }
 * @returns {Object} Success message or error
 */
router.put("/books/:id", updateBook);

/**
 * @route DELETE /books/:id
 * @desc Delete a book by ID
 * @param {string} id - Book ID
 * @returns {Object} Success message or error
 */
router.delete("/books/:id", deleteBook);

module.exports = router;
