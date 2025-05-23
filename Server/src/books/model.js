const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data", "books.json");

function read() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");

    return JSON.parse(data);
  } catch {
    throw new Error("File not found");
  }
}

function write(id, book) {
  try {
    const data = read();

    for (const value of Object.values(data)) {
      if (value.title === book.title && value.author === book.author)
        return false;
    }

    data[id] = book;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

    return true;
  } catch {
    throw new Error("File not found");
  }
}

function update(id, book) {
  try {
    const data = read();

    if (!data[id]) return false;

    data[id] = book;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

    return true;
  } catch {
    throw new Error("File not found");
  }
}

function remove(id) {
  try {
    const data = read();

    if (!data[id]) return false;

    delete data[id];
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

    return true;
  } catch {
    throw new Error("File not found");
  }
}

module.exports = {
  read,
  write,
  update,
  remove,
};
