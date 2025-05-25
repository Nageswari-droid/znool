import { Button } from "@visa/nova-react";
import { ADD_BOOK, TITLE } from "../constants/string";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const showAddBookButton = location.pathname !== "/add-new-book";

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <h1 className="navbar-title" onClick={() => navigate("/")}>
        {TITLE}
      </h1>
      {showAddBookButton && (
        <Button
          className="add-book-btn"
          aria-label={ADD_BOOK}
          onClick={() => navigate("/add-new-book")}
        >
          {ADD_BOOK}
        </Button>
      )}
    </nav>
  );
};

export default NavBar;
