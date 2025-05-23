const {
  getAllBooksService,
  addNewBookService,
  updateBookService,
  deleteBookService,
} = require("./service");
const { STATUS_CODES, STATUS_MESSAGES } = require("../status");

const getAllBooks = (_, res) => {
  try {
    const books = getAllBooksService();

    res.status(STATUS_CODES.OK).json(books);
  } catch {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(STATUS_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const addNewBook = (req, res) => {
  try {
    const isAdded = addNewBookService(req.body);

    if (!isAdded)
      return res
        .send(STATUS_CODES.BAD_REQUEST)
        .send(STATUS_MESSAGES.BAD_REQUEST);

    res.status(201).send("Book added!");
  } catch {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(STATUS_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const updateBook = (req, res) => {
  try {
    let isUpdated = updateBookService(req.params.id, req.body);

    if (!isUpdated)
      return res.status(STATUS_CODES.NOT_FOUND).send(STATUS_MESSAGES.NOT_FOUND);

    res.status(STATUS_CODES.OK).send("Book updated!");
  } catch {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(STATUS_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const deleteBook = (req, res) => {
  try {
    let isDeleted = deleteBookService(req.params.id);

    if (!isDeleted)
      return res.status(STATUS_CODES.NOT_FOUND).send(STATUS_MESSAGES.NOT_FOUND);

    res.status(STATUS_CODES.OK).send("Book deleted!");
  } catch {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(STATUS_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  getAllBooks,
  addNewBook,
  updateBook,
  deleteBook,
};
