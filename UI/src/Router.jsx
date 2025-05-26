import { Route, Routes, Navigate } from "react-router";
import Home from "./pages/Home/Home";
import AddNewBook from "./pages/AddNewBook/AddNewBook";
import DisplayAllBooks from "./pages/DisplayAllBooks/DisplayAllBooks";
import EditBook from "./pages/EditBook/EditBook";
import Error from "./pages/Error/Error";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-new-book" element={<AddNewBook />} />
      <Route path="/get-all-books" element={<DisplayAllBooks />} />
      <Route path="/edit-book/:id" element={<EditBook />} />
      <Route path="/error/:id" element={<Error />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
