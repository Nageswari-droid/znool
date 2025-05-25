import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useBooksContext } from "../context/booksContext";
import Card from "../components/Card";
import LoadingPage from "./LoadingPage";
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
