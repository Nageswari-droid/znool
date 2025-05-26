import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useBooksContext } from "../context/booksContext";
import {
  GET_WITHOUT_BOOK_TITLE,
  GET_WITHOUT_BOOK_SUBTITLE_ONE,
  GET_WITHOUT_BOOK_SUBTITLE_TWO,
  SEARCH_BOOKS,
  CANCEL,
  CONFIRM,
  MODAL_TITLE,
  NO_ENTRIES_FOUND,
} from "../constants/string";
import Card from "../components/Card";
import LoadingPage from "./LoadingPage";
import NoBookFoundPage from "./NoBookFoundPage";
import SearchBox from "../components/SearchBox";
import Modal from "../components/Modal";
import RadioButtonGroup from "../components/RadioButtonGroup";
import "../styles/DisplayAllBooks.css";

import { Radio, Label, Utility } from "@visa/nova-react";

const DisplayAllBooks = () => {
  const { books, getBooks, deleteBook, loading } = useBooksContext();
  const [searchValue, setSearchValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [booksBySearch, setBooksBySearch] = useState({});
  const location = useLocation();

  const [viewOption, setViewOption] = useState("none");

  let data = books;
  if (searchValue) {
    data = Object.keys(booksBySearch).length > 0 ? booksBySearch : books;
  }

  const noEntriesFound = searchValue && Object.keys(booksBySearch).length === 0;

  useEffect(() => {
    const fetchBooks = async () => {
      if (
        !books ||
        Object.keys(books).length === 0 ||
        location.state?.refresh
      ) {
        await getBooks();
      }
    };
    fetchBooks();
  }, [location.state]);

  const onChangeHandler = (value) => {
    setSearchValue(value);
    let titleStartsWith = {};

    Object.entries(books).forEach(([id, book]) => {
      if (book.title.toLowerCase().startsWith(value.toLowerCase())) {
        titleStartsWith[id] = book;
      }
    });

    setBooksBySearch(titleStartsWith);
  };

  const onClearHandler = () => {
    setSearchValue("");
    setBooksBySearch({});
  };

  const handleConfirmDelete = async () => {
    await deleteBook(bookToDelete);
    setModalOpen(false);
    setBookToDelete(null);
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
    setBookToDelete(null);
  };

  const handleDeleteClick = (id) => {
    setBookToDelete(id);
    setModalOpen(true);
  };

  if (loading) return <LoadingPage />;

  if (!books || Object.entries(books).length === 0) {
    return (
      <NoBookFoundPage
        title={GET_WITHOUT_BOOK_TITLE}
        subtitleOne={GET_WITHOUT_BOOK_SUBTITLE_ONE}
        subtitleTwo={GET_WITHOUT_BOOK_SUBTITLE_TWO}
        isAddBtnRequired={true}
        isGetBooksBtnRequired={false}
      />
    );
  }

  return (
    <div className="display-books-outer">
      <div className="display-books-topbar">
        <SearchBox
          label={SEARCH_BOOKS}
          value={searchValue}
          onChangeHandler={onChangeHandler}
          onClearHandler={onClearHandler}
          hideLabelOnMobile={true}
        />
        {noEntriesFound && (
          <div className="no-entries-found-message">{NO_ENTRIES_FOUND}</div>
        )}
      </div>
      <div className="display-books-sidebar">
        <SearchBox
          label={SEARCH_BOOKS}
          value={searchValue}
          onChangeHandler={onChangeHandler}
          onClearHandler={onClearHandler}
        />
        {noEntriesFound && (
          <div className="no-entries-found-message">{NO_ENTRIES_FOUND}</div>
        )}
        <RadioButtonGroup />
      </div>
      <main className="display-books-main" aria-label="All books main content">
        <section
          className="display-books-section"
          aria-label="All books section"
        >
          <div className="books-grid" role="list" aria-label="Book list">
            {Object.entries(data).map(([id, book]) => (
              <Card
                key={id}
                book={book}
                id={id}
                onDeleteHandler={handleDeleteClick}
              />
            ))}
            {modalOpen && (
              <Modal
                title={MODAL_TITLE}
                optionOne={CONFIRM}
                optionTwo={CANCEL}
                handleCancelDelete={handleCancelDelete}
                handleConfirmDelete={handleConfirmDelete}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DisplayAllBooks;
