import { useNavigate, useParams } from "react-router-dom";
import { useBooksContext } from "../context/booksContext";
import { UPDATE_BOOK } from "../constants/string";
import BookForm from "../components/BookForm";
import LoadingPage from "./LoadingPage";

const EditBookPage = () => {
  const navigate = useNavigate();
  const { books, updateBook, loading } = useBooksContext();
  const { id } = useParams();

  const handleUpdateBook = async (bookData) => {
    await updateBook(id, bookData);
    navigate("/get-all-books");
  };

  if (loading) return <LoadingPage />;

  return (
    <BookForm
      initialValue={books[id]}
      onSubmitHandler={handleUpdateBook}
      submitLabel={UPDATE_BOOK}
    />
  );
};

export default EditBookPage;
