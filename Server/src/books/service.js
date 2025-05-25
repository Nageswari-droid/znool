const uuid = require("uuid");
const { read, write, update, remove } = require("./model");
const {
  sortByTitle,
  groupByGenre,
  groupByAuthor,
} = require("./utils/transform");

const getAllBooksService = (sort, group) => {
  const data = read();

  if (sort === "title") {
    return sortByTitle(data);
  } else if (group === "genre") {
    return groupByGenre(data);
  } else if (group === "author") {
    return groupByAuthor(data);
  } else {
    return data;
  }
};

const addNewBookService = (data) => {
  if (!data.title || !data.author || !data.genre || !data.year) return false;

  const id = uuid.v4();

  if (write(id, data)) {
    data["id"] = id;
    return data;
  }

  return false;
};

const updateBookService = (id, data) => {
  if (!data.title || !data.author || !data.genre || !data.year) return false;

  return update(id, data);
};

const deleteBookService = (id) => {
  return remove(id);
};

module.exports = {
  getAllBooksService,
  addNewBookService,
  updateBookService,
  deleteBookService,
};
