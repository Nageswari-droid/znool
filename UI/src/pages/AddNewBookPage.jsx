import { useNavigate } from "react-router-dom";
import { useBooksContext } from "../context/booksContext";
import { ADD_BOOK } from "../constants/string";
import BookForm from "../components/BookForm";
import LoadingPage from "./LoadingPage";

const AddNewBookPage = () => {
  const navigate = useNavigate();
  const { addBooks, loading } = useBooksContext();

  const handleAddBook = async (bookData) => {
    await addBooks(bookData);
    navigate("/get-all-books");
  };

  if (loading) return <LoadingPage />;

  return <BookForm onSubmitHandler={handleAddBook} submitLabel={ADD_BOOK} />;
};

export default AddNewBookPage;
