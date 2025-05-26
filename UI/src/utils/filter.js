const filterByGroup = (data, value) => {
  if (!value) return data;

  let filtered = {};

  Object.entries(data).forEach(([key, books]) => {
    let titleStartsWith = {};
    Object.entries(books).forEach(([id, book]) => {
      if (book.title.toLowerCase().startsWith(value.toLowerCase())) {
        titleStartsWith[id] = book;
      }
    });

    if (Object.keys(titleStartsWith).length > 0) {
      filtered[key] = titleStartsWith;
    }
  });

  return filtered;
};

const filterWithoutGroup = (data, value) => {
  if (!value) return data;

  let filtered = {};

  Object.entries(data).forEach(([id, book]) => {
    if (book.title.toLowerCase().startsWith(value.toLowerCase())) {
      filtered[id] = book;
    }
  });

  return filtered;
};

export { filterByGroup, filterWithoutGroup };
