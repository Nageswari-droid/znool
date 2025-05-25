import { useNavigate, useParams } from "react-router-dom";
import { useBooksContext } from "../context/booksContext";
import { UPDATE_BOOK } from "../constants/string";
import BookForm from "../components/BookForm";

const EditBookPage = () => {
  const navigate = useNavigate();
  const { books, updateBook } = useBooksContext();
  const { id } = useParams();

  const handleUpdateBook = (bookData) => {
    updateBook(id, bookData);
    navigate("/get-all-books");
  };

  return (
    <BookForm
      initialValue={books[id]}
      onSubmitHandler={handleUpdateBook}
      submitLabel={UPDATE_BOOK}
    />
  );
};

export default EditBookPage;
