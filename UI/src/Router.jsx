import { Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}
