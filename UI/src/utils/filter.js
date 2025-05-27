/**
 * Utility functions for filtering book data by group or title.
 */

/**
 * Filters grouped book data by a search value (title prefix).
 * @function
 * @param {Object} data - Grouped book data (e.g., by genre or author)
 * @param {string} value - Search value to filter by (title prefix)
 * @returns {Object} Filtered grouped book data
 */
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

/**
 * Filters book data by a search value (title prefix).
 * @function
 * @param {Object} data - Book data (id -> book object)
 * @param {string} value - Search value to filter by (title prefix)
 * @returns {Object} Filtered book data
 */
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
