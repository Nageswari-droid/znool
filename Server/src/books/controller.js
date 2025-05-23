const {
  getAllBooksService,
  addNewBookService,
  updateBookService,
  deleteBookService,
} = require("./service");

const getAllBooks = (_, res) => {
  const books = getAllBooksService();
  res.json(books);
};

const addNewBook = (req, res) => {
  addNewBookService(req.body);
  res.status(201).send("Book added!");
};

const updateBook = (req, res) => {
  let updated = updateBookService(req.params.id, req.body);

  if (!updated) {
    return res.status(404).send("Book not found");
  }

  res.status(200).send("Book updated!");
};

const deleteBook = (req, res) => {
  let deleted = deleteBookService(req.params.id, req.body);

  if (!deleted) {
    return res.status(404).send("Book not found");
  }

  res.status(200).send("Book deleted!");
};

module.exports = {
  getAllBooks,
  addNewBook,
  updateBook,
  deleteBook,
};
