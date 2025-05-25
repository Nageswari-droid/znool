import { useEffect } from "react";
import Card from "../components/Card";
import { useBooksContext } from "../context/booksContext";
import LoadingScreen from "./LoadingPage";
import "../styles/DisplayAllBooks.css";

const DisplayAllBooks = () => {
  const { getBooks, loading } = useBooksContext();

  useEffect(() => {
    const fetchBooks = async () => {
      await getBooks();
    };
    fetchBooks();
  }, []);

  if (loading) return <LoadingScreen />;

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
