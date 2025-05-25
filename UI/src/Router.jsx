import { Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import AddNewBookPage from "./pages/AddNewBookPage";
import DisplayAllBooks from "./pages/DisplayAllBooks";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/add-new-book" element={<AddNewBookPage />} />
      <Route path="/get-all-books" element={<DisplayAllBooks />} />
    </Routes>
  );
}