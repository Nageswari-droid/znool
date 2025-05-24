import BookForm from "../components/BookForm";
import { ADD_BOOK } from "../constants/string";
import "../styles/AddNewBook.css";

const AddNewBookPage = () => {
  const handleAddBook = (bookData) => {
    // TODO: API call to add book
    console.log("Book to add:", bookData);
  };

  return (
    <div className="add-book-page-outer">
      <main className="add-book-main">
        <section className="add-book-section" aria-labelledby="add-book-title">
          <BookForm />
        </section>
      </main>
    </div>
  );
};

export default AddNewBookPage;
