/**
 * Page component for displaying all books with search, grouping, and sorting features.
 *
 * Allows users to search, group (by author/genre), and sort books. Handles loading and empty states.
 */
import React from "react";
import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useBooksContext } from "../../context/booksContext";
import {
  GET_WITHOUT_BOOK_TITLE,
  GET_WITHOUT_BOOK_SUBTITLE_ONE,
  GET_WITHOUT_BOOK_SUBTITLE_TWO,
  SEARCH_BOOKS,
} from "../../constants/string";
import { radioBtnsSideBar } from "../../constants/radioBtns";
import Loading from "../../components/Loading/Loading";
import NoBookFound from "../../components/NoBookFound/NoBookFound";
import SearchBox from "../../components/SearchBox/SearchBox";
import RadioButtonGroup from "../../components/RadioButtonGroup/RadioButtonGroup";
import Cards from "../../components/Cards/Cards";
import { filterByGroup, filter } from "../../utils/filter";
import "../../styles/DisplayAllBooks.css";

/**
 * Displays all books with search, grouping, and sorting options.
 * @component
 * @returns {JSX.Element}
 */
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
  const [viewOption, setViewOption] = useState("none");
  const location = useLocation();

  // Memoized grouped data based on view option
  const groupedData = useMemo(() => {
    if (viewOption === "author") return getBooksGroupedByAuthor();
    if (viewOption === "genre") return getBooksGroupedByGenre();
    return {};
  }, [viewOption, books]);

  // Memoized filtered books
  const filteredBooks = useMemo(() => {
    if (viewOption === "sort") {
      return filter(sortBooks(), searchValue);
    }

    return filter(books, searchValue);
  }, [books, searchValue, viewOption, sortBooks]);

  // Memoized filtered grouped data
  const filteredGroupedData = useMemo(() => {
    return filterByGroup(groupedData, searchValue);
  }, [groupedData, searchValue]);

  const isGroupedBy = viewOption === "author" || viewOption === "genre";
  const data = isGroupedBy ? filteredGroupedData : filteredBooks;

  const noEntriesFound = searchValue && Object.keys(data).length === 0;

  // Fetch books on mount or refresh
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

  /**
   * Handles search box value change.
   * @param {string} value - The new search value
   */
  const onChangeHandler = (value) => {
    setSearchValue(value);
  };

  /**
   * Clears the search box value.
   */
  const onClearHandler = () => {
    setSearchValue("");
  };

  if (loading) return <Loading />;

  if (!books || Object.entries(books).length === 0) {
    return (
      <NoBookFound
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
      <div className="display-books-sidebar">
        <SearchBox
          label={SEARCH_BOOKS}
          value={searchValue}
          onChangeHandler={onChangeHandler}
          onClearHandler={onClearHandler}
          noEntriesFound={noEntriesFound}
        />
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
