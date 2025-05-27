/**
 * API functions for interacting with the books endpoints.
 */

/**
 * Fetches all books from the backend.
 * @function
 * @returns {Promise<Object[]>} Promise resolving to an array of book objects
 * @throws {Object} Error object with status code if the request fails
 */
export const fetchBooks = async () => {
  const response = await fetch("/books");

  if (!response.ok) throw { status: response.status };

  return response.json();
};

/**
 * Creates a new book in the backend.
 * @function
 * @param {Object} newBook - The new book data to create
 * @returns {Promise<Object>} Promise resolving to the created book object
 * @throws {Object} Error object with status code if the request fails
 */
export const createBook = async (newBook) => {
  const response = await fetch("/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newBook),
  });

  if (!response.ok) throw { status: response.status };

  return response.json();
};

/**
 * Updates an existing book in the backend by ID.
 * @function
 * @param {string} id - The ID of the book to update
 * @param {Object} updatedBook - The updated book data
 * @returns {Promise<Object>} Promise resolving to the updated book object
 * @throws {Object} Error object with status code if the request fails
 */
export const updateBookApi = async (id, updatedBook) => {
  const response = await fetch(`/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedBook),
  });

  if (!response.ok) throw { status: response.status };

  return response.json();
};

/**
 * Deletes a book from the backend by ID.
 * @function
 * @param {string} id - The ID of the book to delete
 * @returns {Promise<Object>} Promise resolving to the deletion result
 * @throws {Object} Error object with status code if the request fails
 */
export const deleteBookApi = async (id) => {
  const response = await fetch(`/books/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw { status: response.status };

  return response.json();
};
