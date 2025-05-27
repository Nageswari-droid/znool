/**
 * Utility functions for transforming and grouping book data.
 */

/**
 * Sorts book data by title alphabetically.
 * @function
 * @param {Object} data - Book data (id -> book object)
 * @returns {Object} Sorted book data by title
 */
const sortByTitle = (data) => {
  return Object.fromEntries(
    Object.entries(data).sort(([, a], [, b]) => a.title.localeCompare(b.title))
  );
};

/**
 * Sorts grouped data by group key alphabetically.
 * @function
 * @param {Object} data - Grouped data (group -> books)
 * @returns {Object} Sorted grouped data by group key
 */
const sortGroup = (data) => {
  return Object.fromEntries(
    Object.entries(data).sort(([a], [b]) => a.localeCompare(b))
  );
};

/**
 * Groups book data by genre and sorts the groups.
 * @function
 * @param {Object} data - Book data (id -> book object)
 * @returns {Object} Grouped and sorted book data by genre
 */
const groupByGenre = (data) => {
  let genres = {};

  for (const [id, value] of Object.entries(data)) {
    if (!genres[value.genre]) genres[value.genre] = {};
    genres[value.genre][id] = value;
  }

  return sortGroup(genres);
};

/**
 * Groups book data by author and sorts the groups.
 * @function
 * @param {Object} data - Book data (id -> book object)
 * @returns {Object} Grouped and sorted book data by author
 */
const groupByAuthor = (data) => {
  let authors = {};

  for (const [id, value] of Object.entries(data)) {
    if (!authors[value.author]) authors[value.author] = {};
    authors[value.author][id] = value;
  }

  return sortGroup(authors);
};

export { sortByTitle, groupByGenre, groupByAuthor };
