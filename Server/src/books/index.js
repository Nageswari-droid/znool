const {
  getAllBooks,
  addNewBook,
  updateBook,
  deleteBook,
} = require("./controller");
const router = require("express").Router();

router.get("/books", getAllBooks);
router.post("/books", addNewBook);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

module.exports = router;
