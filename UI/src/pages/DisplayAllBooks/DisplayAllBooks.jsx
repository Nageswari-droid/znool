import React from "react";
import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useBooksContext } from "../../context/booksContext";
import {
  GET_WITHOUT_BOOK_TITLE,
  GET_WITHOUT_BOOK_SUBTITLE_ONE,
  GET_WITHOUT_BOOK_SUBTITLE_TWO,
  SEARCH_BOOKS,
  NO_ENTRIES_FOUND,
} from "../../constants/string";
import { radioBtnsSideBar } from "../../constants/radioBtns";
import Loading from "../../components/Loading";
import NoBookFound from "../../components/NoBookFound";
import SearchBox from "../../components/SearchBox";
import RadioButtonGroup from "../../components/RadioButtonGroup";
import Cards from "../../components/Cards";
import { filterByGroup, filter } from "../../utils/filter";
import "../../styles/DisplayAllBooks.css";

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

  const groupedData = useMemo(() => {
    if (viewOption === "author") return getBooksGroupedByAuthor();
    if (viewOption === "genre") return getBooksGroupedByGenre();
    return {};
  }, [viewOption, books]);

  const filteredBooks = useMemo(() => {
    return filter(books, searchValue);
  }, [books, searchValue]);

  const filteredGroupedData = useMemo(() => {
    return filterByGroup(groupedData, searchValue);
  }, [groupedData, searchValue]);

  const isGroupedBy = viewOption === "author" || viewOption === "genre";
  const data = isGroupedBy ? filteredGroupedData : filteredBooks;

  const noEntriesFound = searchValue && Object.keys(data).length === 0;

  useEffect(() => {
    if (viewOption === "sort") {
      sortBooks();
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
  };

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
