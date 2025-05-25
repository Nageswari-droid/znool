import { useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";
import "../styles/AddNewBook.css";
import { useBooksContext } from "../context/booksContext";
import { v4 as uuidv4 } from "uuid";

const AddNewBookPage = () => {
  const navigate = useNavigate();
  const { addBooks } = useBooksContext();

  const handleAddBook = (bookData) => {
    // TODO: Remove uuid after intgerating with server
    const id = uuidv4();
    bookData["id"] = id;
    addBooks(bookData);

    navigate("/get-all-books");
  };

  return (
    <div className="add-book-page-outer">
      <main className="add-book-main">
        <section className="add-book-section" aria-labelledby="add-book-form">
          <BookForm onSubmitHandler={handleAddBook} />
        </section>
      </main>
    </div>
  );
};

export default AddNewBookPage;
