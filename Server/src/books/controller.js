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
  const isAdded = addNewBookService(req.body);

  if (!isAdded) {
    return res.status(400).send("Book already exists");
  }

  res.status(201).send("Book added!");
};

const updateBook = (req, res) => {
  let isUpdated = updateBookService(req.params.id, req.body);

  if (!isUpdated) {
    return res.status(404).send("Book not found");
  }

  res.status(200).send("Book updated!");
};

const deleteBook = (req, res) => {
  let isDeleted = deleteBookService(req.params.id);

  if (!isDeleted) {
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
