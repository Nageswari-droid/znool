/**
 * NavBar component for the application navigation bar.
 *
 * Displays the app title and an add book button (except on add or error pages).
 */
import React from "react";
import { Button } from "@visa/nova-react";
import { ADD_BOOK, TITLE } from "../../constants/string";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/NavBar.css";

/**
 * NavBar component for the application navigation bar.
 * @component
 * @returns {JSX.Element}
 */
const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const showAddBookButton =
    location.pathname !== "/add-new-book" &&
    !location.pathname.startsWith("/edit-book/") &&
    !location.pathname.startsWith("/error/");

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
