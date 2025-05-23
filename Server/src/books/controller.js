const {
  getAllBooksService,
  addNewBookService,
  updateBookService,
  deleteBookService,
} = require("./service");

const getAllBooks = (_, res) => {
  try {
    const books = getAllBooksService();
    
    res.status(200).json(books);
  } catch {
    res.status(500).send("Internal server error");
  }
};

const addNewBook = (req, res) => {
  try {
    const isAdded = addNewBookService(req.body);

    if (!isAdded) return res.status(400).send("Book already exists");

    res.status(201).send("Book added!");
  } catch {
    res.status(500).send("Internal server error");
  }
};

const updateBook = (req, res) => {
  try {
    let isUpdated = updateBookService(req.params.id, req.body);

    if (!isUpdated) return res.status(404).send("Book not found");

    res.status(200).send("Book updated!");
  } catch {
    res.status(500).send("Internal server error");
  }
};

const deleteBook = (req, res) => {
  try {
    let isDeleted = deleteBookService(req.params.id);

    if (!isDeleted) return res.status(404).send("Book not found");

    res.status(200).send("Book deleted!");
  } catch {
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  getAllBooks,
  addNewBook,
  updateBook,
  deleteBook,
};
