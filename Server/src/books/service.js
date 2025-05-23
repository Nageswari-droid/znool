const { books } = require("./model");
const uuid = require("uuid");

const getAllBooksService = () => {
  return books;
};

const addNewBookService = (data) => {
  if (!data.title || !data.author || !data.genre || !data.year) return false;
  for (const value of Object.values(books)) {
    if (value.title === data.title && value.author === data.author)
      return false;
  }

  const id = uuid.v4();
  books[id] = data;

  return true;
};

const updateBookService = (id, data) => {
  if (!data.title || !data.author || !data.genre || !data.year) return false;
  if (!(id in books)) return false;

  books[id] = data;
  return true;
};

const deleteBookService = (id) => {
  if (!(id in books)) return false;

  delete books[id];
  return true;
};

module.exports = {
  getAllBooksService,
  addNewBookService,
  updateBookService,
  deleteBookService,
};
