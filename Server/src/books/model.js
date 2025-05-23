const fs = require("fs");
const path = require("path");
const withErrorHandler = require("../utils/dbErrorHandler");

const filePath = path.join(__dirname, "data", "books.json");

function read() {
  return withErrorHandler(() => {
    const data = fs.readFileSync(filePath, "utf-8");

    return JSON.parse(data);
  });
}

function write(id, book) {
  return withErrorHandler(() => {
    const data = read();

    for (const value of Object.values(data)) {
      if (value.title === book.title && value.author === book.author)
        return false;
    }

    data[id] = book;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

    return true;
  });
}

function update(id, book) {
  return withErrorHandler(() => {
    const data = read();

    if (!data[id]) return false;

    data[id] = book;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

    return true;
  });
}

function remove(id) {
  return withErrorHandler(() => {
    const data = read();

    if (!data[id]) return false;

    delete data[id];
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

    return true;
  });
}

module.exports = {
  read,
  write,
  update,
  remove,
};
