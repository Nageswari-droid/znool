const {
  getAllBooksService,
  addNewBookService,
  updateBookService,
  deleteBookService,
} = require("./service");
const withErrorHandler = require("../utils/networkErrorHandler");
const { STATUS_CODES, STATUS_MESSAGES } = require("../constants/status");

const getAllBooks = withErrorHandler((req, res) => {
  const { sort, group } = req.query;
  const books = getAllBooksService(sort, group);

  res.status(STATUS_CODES.OK).json(books);
});

const addNewBook = withErrorHandler((req, res) => {
  const addedBook = addNewBookService(req.body);

  if (!addedBook)
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .send(STATUS_MESSAGES.BAD_REQUEST);

  res.status(STATUS_CODES.CREATED).send(addedBook);
});

const updateBook = withErrorHandler((req, res) => {
  const isUpdated = updateBookService(req.params.id, req.body);

  if (!isUpdated)
    return res.status(STATUS_CODES.NOT_FOUND).send(STATUS_MESSAGES.NOT_FOUND);

  res.status(STATUS_CODES.OK).send("Book updated!");
});

const deleteBook = withErrorHandler((req, res) => {
  const isDeleted = deleteBookService(req.params.id);

  if (!isDeleted)
    return res.status(STATUS_CODES.NOT_FOUND).send(STATUS_MESSAGES.NOT_FOUND);

  res.status(STATUS_CODES.OK).send("Book deleted!");
});

module.exports = {
  getAllBooks,
  addNewBook,
  updateBook,
  deleteBook,
};
