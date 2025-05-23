const books = require("./model");

const getAllBooksService = () => {
  return books;
};

const addNewBookService = () => {};

const updateBookService = () => {};

const deleteBookService = () => {};

module.exports = {
  getAllBooksService,
  addNewBookService,
  updateBookService,
  deleteBookService,
};
