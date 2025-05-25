import { useNavigate, useParams } from "react-router-dom";
import BookForm from "../components/BookForm";
import { useBooksContext } from "../context/booksContext";

const EditBookPage = () => {
  const navigate = useNavigate();
  const { books, updateBook } = useBooksContext();
  const { id } = useParams();

  const handleUpdateBook = (bookData) => {
    updateBook(id, bookData);
    navigate("/get-all-books");
  };

  return (
    <div className="edit-book-page-outer">
      <main className="edit-book-main">
        <section className="edit-book-section" aria-labelledby="edit-book-form">
          <BookForm
            initialValue={books[id]}
            onSubmitHandler={handleUpdateBook}
          />
        </section>
      </main>
    </div>
  );
};

export default EditBookPage;
