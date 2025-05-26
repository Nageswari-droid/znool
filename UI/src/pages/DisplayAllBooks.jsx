import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useBooksContext } from "../context/booksContext";
import {
  GET_WITHOUT_BOOK_TITLE,
  GET_WITHOUT_BOOK_SUBTITLE_ONE,
  GET_WITHOUT_BOOK_SUBTITLE_TWO,
  SEARCH_BOOKS,
  NO_ENTRIES_FOUND,
} from "../constants/string";
import { radioBtnsTopBar, radioBtnsSideBar } from "../constants/radioBtns";
import LoadingPage from "./LoadingPage";
import NoBookFoundPage from "./NoBookFoundPage";
import SearchBox from "../components/SearchBox";
import RadioButtonGroup from "../components/RadioButtonGroup";
import CardGroup from "../components/CardGroup";
import "../styles/DisplayAllBooks.css";

const DisplayAllBooks = () => {
  const { books, getBooks, sortBooks, loading } = useBooksContext();
  const [searchValue, setSearchValue] = useState("");
  const [booksBySearch, setBooksBySearch] = useState({});
  const [viewOption, setViewOption] = useState("none");
  const location = useLocation();

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

  useEffect(() => {
    if (viewOption === "sort") {
      sortBooks();
    }
  }, [viewOption]);

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
        <RadioButtonGroup arr={radioBtnsTopBar} />
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
        <RadioButtonGroup
          arr={radioBtnsSideBar}
          viewOption={viewOption}
          setViewOption={setViewOption}
        />
      </div>
      <CardGroup data={data} />
    </div>
  );
};

export default DisplayAllBooks;
