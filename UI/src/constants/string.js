import { MAXIMUM_CHARACTERS } from "./characterLimit";

const TITLE = "Znool";
const SUBTITLE = "Your Smart Library Manager";
const DESCRIPTION =
  "Easily add, update, and delete books in one place with Znool’s intuitive interface.";
const WELCOME = "Welcome to";
const ADD_BOOK = "Add new book";
const UPDATE_BOOK = "Update book";
const DISPLAY_BOOKS = "Show all books";
const CLEAR_INPUT = "Clear";
const EDIT = "Edit";
const DELETE = "Delete";
const YEAR = "Year:";
const MODAL_TITLE = "Are you sure you want to delete?";
const CONFIRM = "Confirm";
const CANCEL = "Cancel";
const INPUT_DESCRIPTION = "Description";
const INPUT_DESCRIPTION_PLACEHOLDER = "Enter book description";
const EDIT_WITHOUT_BOOK_TITLE = "No book selected!";
const EDIT_WITHOUT_BOOK_SUBTITLE_ONE =
  "Your library is empty or no book is currently selected.";
const EDIT_WITHOUT_BOOK_SUBTITLE_TWO =
  " Add a new book or pick one from your collection to edit its details.";
const GET_WITHOUT_BOOK_TITLE = "No books found!";
const GET_WITHOUT_BOOK_SUBTITLE_ONE =
  "Your library is waiting for its first book.";
const GET_WITHOUT_BOOK_SUBTITLE_TWO =
  "Use the “Add new book” button below to begin building your collection!";
const MAX_LEN_MESSAGE = `Cannot exceed ${MAXIMUM_CHARACTERS} characters.`;
const YEAR_ERROR_MESSAGE = "Year cannot exceed ";
const SEARCH_BOOKS = "Search books";
const SEARCH_PLACEHOLDER = "Type to search by title";
const NO_ENTRIES_FOUND = "No entries found";
const SORT_BY_TITLE = "Sort by title";
const GROUP_BY_AUTHOR = "Sort by author";
const GROUP_BY_GENRE = "Sort by genre";
const RETURN = "Return";
const SERVER_DOWN = "Server is down";
const NOT_FOUND = "Not found";
const BAD_REQUEST = "Bad Request";
const SERVER_ERROR =
  "Sorry, we couldn't connect to the server. Please try again later.";
const BOOK_NOT_FOUND = "Book doesn't exists!";
const SAME_AUTHOR_ERROR =
  "Book with the same author already exists! Please create a new book";

export {
  TITLE,
  SUBTITLE,
  DESCRIPTION,
  WELCOME,
  ADD_BOOK,
  UPDATE_BOOK,
  DISPLAY_BOOKS,
  CLEAR_INPUT,
  EDIT,
  DELETE,
  YEAR,
  MODAL_TITLE,
  CONFIRM,
  CANCEL,
  INPUT_DESCRIPTION,
  INPUT_DESCRIPTION_PLACEHOLDER,
  EDIT_WITHOUT_BOOK_TITLE,
  EDIT_WITHOUT_BOOK_SUBTITLE_ONE,
  EDIT_WITHOUT_BOOK_SUBTITLE_TWO,
  GET_WITHOUT_BOOK_TITLE,
  GET_WITHOUT_BOOK_SUBTITLE_ONE,
  GET_WITHOUT_BOOK_SUBTITLE_TWO,
  MAX_LEN_MESSAGE,
  YEAR_ERROR_MESSAGE,
  SEARCH_BOOKS,
  SEARCH_PLACEHOLDER,
  NO_ENTRIES_FOUND,
  SORT_BY_TITLE,
  GROUP_BY_AUTHOR,
  GROUP_BY_GENRE,
  RETURN,
  SERVER_DOWN,
  NOT_FOUND,
  BAD_REQUEST,
  SERVER_ERROR,
  BOOK_NOT_FOUND,
  SAME_AUTHOR_ERROR,
};
