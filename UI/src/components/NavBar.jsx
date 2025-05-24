import React from "react";
import { Button } from "@visa/nova-react";
import "../styles/navBar.css";

const NavBar = ({ onAddBook }) => (
  <nav className="navbar" role="navigation" aria-label="Main Navigation">
    <h1 className="navbar-title">Znool</h1>
    <Button
      alternate
      className="navbar-add-btn"
      onClick={onAddBook}
      aria-label="Add a new book"
    >
      Add a new book
    </Button>
  </nav>
);

export default NavBar;
