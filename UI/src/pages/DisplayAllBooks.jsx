import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useBooksContext } from "../context/booksContext";
import {
  GET_WITHOUT_BOOK_TITLE,
  GET_WITHOUT_BOOK_SUBTITLE_ONE,
  GET_WITHOUT_BOOK_SUBTITLE_TWO,
} from "../constants/string";
import Card from "../components/Card";
import LoadingPage from "./LoadingPage";
import NoBookFoundPage from "./NoBookFoundPage";
import "../styles/DisplayAllBooks.css";

const DisplayAllBooks = () => {
  const { books, getBooks, loading } = useBooksContext();
  const location = useLocation();

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
      <div className="display-books-sidebar"></div>
      <main className="display-books-main" aria-label="All books main content">
        <section
          className="display-books-section"
          aria-label="All books section"
        >
          <Card />
        </section>
      </main>
    </div>
  );
};

export default DisplayAllBooks;
