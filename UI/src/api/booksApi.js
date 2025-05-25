export const fetchBooks = async () => {
  const response = await fetch("/books");

  if (!response.ok) throw { status: response.status };

  return response.json();
};

export const createBook = async (newBook) => {
  const response = await fetch("/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newBook),
  });

  if (!response.ok) throw { status: response.status };

  return response.json();
};

export const updateBookApi = async (id, updatedBook) => {
  const response = await fetch(`/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedBook),
  });

  if (!response.ok) throw { status: response.status };

  return response.json();
};

export const deleteBookApi = async (id) => {
  const response = await fetch(`/books/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw { status: response.status };

  return response.json();
};
