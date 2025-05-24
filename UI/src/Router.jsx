import { Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import AddNewBookPage from "./pages/AddNewBookPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/add-new-book" element={<AddNewBookPage />} />
    </Routes>
  );
}