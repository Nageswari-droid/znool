const sortByTitle = (data) => {
  return Object.fromEntries(
    Object.entries(data).sort(([, a], [, b]) => a.title.localeCompare(b.title))
  );
};

const sortGroup = (data) => {
  return Object.fromEntries(
    Object.entries(data).sort(([a], [b]) => a.localeCompare(b))
  );
};

const groupByGenre = (data) => {
  let genres = {};

  for (const [id, value] of Object.entries(data)) {
    if (!genres[value.genre]) genres[value.genre] = {};
    genres[value.genre][id] = value;
  }

  return sortGroup(genres);
};

const groupByAuthor = (data) => {
  let authors = {};

  for (const [id, value] of Object.entries(data)) {
    if (!authors[value.author]) authors[value.author] = {};
    authors[value.author][id] = value;
  }

  return sortGroup(authors);
};

module.exports = {
  sortByTitle,
  groupByGenre,
  groupByAuthor,
};
