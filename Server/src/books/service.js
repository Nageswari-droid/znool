const uuid = require("uuid");
const { read, write, update, remove } = require("./model");

const getAllBooksService = () => {
  return read();
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
