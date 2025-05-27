import "./App.css";
import Router from "./Router";
import NavBar from "./components/NavBar/NavBar";
import { BooksProvider } from "./context/booksContext";

function App() {
  return (
    <BooksProvider>
      <NavBar />
      <Router />
    </BooksProvider>
  );
}

export default App;
