import { useNavigate, useParams } from "react-router-dom";
import { useBooksContext } from "../context/booksContext";
import { UPDATE_BOOK } from "../constants/string";
import BookForm from "../components/BookForm";
import LoadingPage from "./LoadingPage";

const EditBookPage = () => {
  const navigate = useNavigate();
  const { books, updateBook, loading } = useBooksContext();
  const { id } = useParams();

  const initalValue = books[id];

  const isChanged = (book) => {
    return (
      initalValue.title === book.title &&
      initalValue.author === book.author &&
      initalValue.year === book.year &&
      initalValue.genre === book.genre &&
      initalValue.description === book.description
    );
  };

  const handleUpdateBook = async (bookData) => {
    let refresh = false;
    
    if (!isChanged(bookData)) {
      await updateBook(id, bookData);
      refresh = true;
    }

    navigate("/get-all-books", { state: { refresh } });
  };

  if (loading) return <LoadingPage />;

  return (
    <BookForm
      initialValue={initalValue}
      onSubmitHandler={handleUpdateBook}
      submitLabel={UPDATE_BOOK}
    />
  );
};

export default EditBookPage;
