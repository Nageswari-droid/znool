const getAllBooks = (req, res) => {
  res.send("Get all books");
};

const addNewBook = (req, res) => {
  res.send("Add a new book");
};

const updateBook = (req, res) => {
  res.send("Update a book");
};

const deleteBook = (req, res) => {
  res.send("Delete a book");
};

module.exports = {
  getAllBooks,
  addNewBook,
  updateBook,
  deleteBook,
};
