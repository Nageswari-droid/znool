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
import Cards from "../components/Cards";
import "../styles/DisplayAllBooks.css";
import { filterByGroup, filterWithoutGroup } from "../utils/filter";

const DisplayAllBooks = () => {
  const {
    books,
    getBooks,
    loading,
    sortBooks,
    getBooksGroupedByAuthor,
    getBooksGroupedByGenre,
  } = useBooksContext();
  const [searchValue, setSearchValue] = useState("");
  const [booksBySearch, setBooksBySearch] = useState({});
  const [groupedBooksBySearch, setGroupedBooksBySearch] = useState({});
  const [viewOption, setViewOption] = useState("none");
  const [groupedByData, setGroupedByData] = useState({});
  const location = useLocation();

  let data = books;
  let isGroupedBy = false;

  if (viewOption === "author" || viewOption === "genre") {
    data =
      Object.keys(groupedBooksBySearch).length > 0
        ? groupedBooksBySearch
        : groupedByData;
    isGroupedBy = true;
  } else if (searchValue) {
    data = Object.keys(booksBySearch).length > 0 ? booksBySearch : books;
  }

  const noEntriesFound = searchValue && Object.keys(booksBySearch).length === 0;

  useEffect(() => {
    if (viewOption === "sort") {
      sortBooks();
    } else if (viewOption === "author") {
      setGroupedByData(getBooksGroupedByAuthor());
    } else if (viewOption === "genre") {
      setGroupedByData(getBooksGroupedByGenre());
    }
  }, [viewOption]);

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

    if (isGroupedBy) {
      setGroupedBooksBySearch(filterByGroup(groupedByData, value));
    } else setBooksBySearch(filterWithoutGroup(data, value));
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
        <RadioButtonGroup
          arr={radioBtnsTopBar}
          viewOption={viewOption}
          setViewOption={setViewOption}
        />
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
      <Cards data={data} isGroupedBy={isGroupedBy} />
    </div>
  );
};

export default DisplayAllBooks;
