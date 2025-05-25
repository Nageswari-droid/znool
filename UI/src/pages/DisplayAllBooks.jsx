import Card from "../components/Card";
import "../styles/DisplayAllBooks.css";

const DisplayAllBooks = () => {
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
