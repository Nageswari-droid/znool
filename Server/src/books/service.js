/**
 * Service layer for book operations in the library management system.
 *
 * Provides business logic for managing books, including validation and ID generation.
 */
const uuid = require("uuid");
const { read, write, update, remove } = require("./model");

/**
 * Retrieve all books from the data store.
 * @function
 * @returns {Object} All books as an object with IDs as keys
 */
const getAllBooksService = () => {
  return read();
};

/**
 * Add a new book to the data store after validating required fields.
 * @function
 * @param {Object} data - Book data (title, author, genre, year, description)
 * @returns {Object|boolean} The created book object (with ID) if successful, or false if validation fails or book exists
 */
const addNewBookService = (data) => {
  if (!data.title || !data.author || !data.genre || !data.year) return false;

  const id = uuid.v4();

  if (write(id, data)) {
    data["id"] = id;
    return data;
  }

  return false;
};

/**
 * Update an existing book by ID after validating required fields.
 * @function
 * @param {string} id - Book ID
 * @param {Object} data - Updated book data (title, author, genre, year, description)
 * @returns {boolean} True if update is successful, false otherwise
 */
const updateBookService = (id, data) => {
  if (!data.title || !data.author || !data.genre || !data.year) return false;

  return update(id, data);
};

/**
 * Delete a book by ID from the data store.
 * @function
 * @param {string} id - Book ID
 * @returns {boolean} True if deletion is successful, false otherwise
 */
const deleteBookService = (id) => {
  return remove(id);
};

module.exports = {
  getAllBooksService,
  addNewBookService,
  updateBookService,
  deleteBookService,
};
