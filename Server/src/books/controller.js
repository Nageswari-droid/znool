/**
 * Controller functions for handling library management system HTTP requests.
 *
 * Each function is wrapped with a network error handler to ensure proper error responses.
 */
const {
  getAllBooksService,
  addNewBookService,
  updateBookService,
  deleteBookService,
} = require("./service");
const withErrorHandler = require("../utils/networkErrorHandler");
const { STATUS_CODES, STATUS_MESSAGES } = require("../constants/status");

/**
 * Get all books.
 * @function
 * @param {Object} _ - Express request object (unused)
 * @param {Object} res - Express response object
 * @returns {void} Responds with a list of all books (JSON)
 */
const getAllBooks = withErrorHandler((_, res) => {
  const books = getAllBooksService();

  res.status(STATUS_CODES.OK).json(books);
});

/**
 * Add a new book.
 * @function
 * @param {Object} req - Express request object (expects book data in body)
 * @param {Object} res - Express response object
 * @returns {void} Responds with the created book object or error message
 */
const addNewBook = withErrorHandler((req, res) => {
  const addedBook = addNewBookService(req.body);

  if (!addedBook)
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .send(STATUS_MESSAGES.BAD_REQUEST);

  res.status(STATUS_CODES.CREATED).send(addedBook);
});

/**
 * Update a book by ID.
 * @function
 * @param {Object} req - Express request object (expects book ID in params and data in body)
 * @param {Object} res - Express response object
 * @returns {void} Responds with a success message or error message
 */
const updateBook = withErrorHandler((req, res) => {
  const isUpdated = updateBookService(req.params.id, req.body);

  if (!isUpdated)
    return res.status(STATUS_CODES.NOT_FOUND).send(STATUS_MESSAGES.NOT_FOUND);

  res.status(STATUS_CODES.OK).send({ data: "Book updated!" });
});

/**
 * Delete a book by ID.
 * @function
 * @param {Object} req - Express request object (expects book ID in params)
 * @param {Object} res - Express response object
 * @returns {void} Responds with a success message or error message
 */
const deleteBook = withErrorHandler((req, res) => {
  const isDeleted = deleteBookService(req.params.id);

  if (!isDeleted)
    return res.status(STATUS_CODES.NOT_FOUND).send(STATUS_MESSAGES.NOT_FOUND);

  res.status(STATUS_CODES.OK).send({ data: "Book deleted!" });
});

module.exports = {
  getAllBooks,
  addNewBook,
  updateBook,
  deleteBook,
};
