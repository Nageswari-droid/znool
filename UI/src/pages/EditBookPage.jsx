import { useParams } from "react-router-dom";
import BookForm from "../components/BookForm";

const EditBookPage = () => {
  const handleUpdateBook = (bookData) => {
    // TODO: API call to add book
    console.log("Book updated:", bookData);
  };

  return (
    <div className="add-book-page-outer">
      <main className="add-book-main">
        <section className="add-book-section" aria-labelledby="add-book-form">
          
        </section>
      </main>
    </div>
  );
};

export default EditBookPage;
