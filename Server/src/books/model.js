/**
 * Data access layer for book operations in the library management system.
 *
 * Handles reading from and writing to the books JSON file.
 */
const fs = require("fs");
const path = require("path");
const withErrorHandler = require("../utils/dbErrorHandler");

const filePath = path.join(__dirname, "data", "books.json");

/**
 * Read all books from the JSON file.
 * @function
 * @returns {Object} All books as an object with IDs as keys
 * @throws {Error} If the file cannot be read
 */
function read() {
  return withErrorHandler(() => {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  });
}

/**
 * Write a new book to the JSON file if it does not already exist.
 * @function
 * @param {string} id - Book ID
 * @param {Object} book - Book data (title, author, genre, year, description)
 * @returns {boolean} True if the book was added, false if it already exists
 * @throws {Error} If the file cannot be written
 */
function write(id, book) {
  return withErrorHandler(() => {
    const data = read();
    for (const value of Object.values(data)) {
      if (value.title === book.title && value.author === book.author)
        return false;
    }
    data[id] = book;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  });
}

/**
 * Update an existing book in the JSON file by ID.
 * @function
 * @param {string} id - Book ID
 * @param {Object} book - Updated book data (title, author, genre, year, description)
 * @returns {boolean} True if the update was successful, false if the book does not exist
 * @throws {Error} If the file cannot be written
 */
function update(id, book) {
  return withErrorHandler(() => {
    const data = read();
    if (!data[id]) return false;
    data[id] = book;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  });
}

/**
 * Remove a book from the JSON file by ID.
 * @function
 * @param {string} id - Book ID
 * @returns {boolean} True if the removal was successful, false if the book does not exist
 * @throws {Error} If the file cannot be written
 */
function remove(id) {
  return withErrorHandler(() => {
    const data = read();
    if (!data[id]) return false;
    delete data[id];
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  });
}

module.exports = {
  read,
  write,
  update,
  remove,
};
