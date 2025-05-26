const filterByGroup = (data, value) => {
  if (!value) return data;

  let filtered = {};
  Object.entries(data).forEach(([key, books]) => {
    let result = filter(books, value);

    if (Object.keys(result).length > 0) {
      filtered[key] = result;
    }
  });

  return filtered;
};

const filter = (data, value) => {
  if (!value) return data;

  let filtered = {};
  Object.entries(data).forEach(([id, book]) => {
    if (book.title.toLowerCase().startsWith(value.toLowerCase())) {
      filtered[id] = book;
    }
  });

  return filtered;
};

export { filterByGroup, filter };
