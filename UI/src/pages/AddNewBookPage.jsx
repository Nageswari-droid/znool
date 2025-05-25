import { useNavigate } from "react-router-dom";
import { useBooksContext } from "../context/booksContext";
import { v4 as uuidv4 } from "uuid";
import { ADD_BOOK } from "../constants/string";
import BookForm from "../components/BookForm";

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

  return <BookForm onSubmitHandler={handleAddBook} submitLabel={ADD_BOOK} />;
};

export default AddNewBookPage;
