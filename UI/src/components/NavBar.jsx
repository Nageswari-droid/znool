import React from "react";
import { Button } from "@visa/nova-react";
import "../styles/navBar.css";
import { ADD_BOOK, TITLE } from "../constants/string";

const NavBar = ({ onAddBook }) => (
  <nav className="navbar" role="navigation" aria-label="Main Navigation">
    <h1 className="navbar-title">{TITLE}</h1>
    <Button
      alternate
      className="navbar-add-btn"
      onClick={onAddBook}
      aria-label={ADD_BOOK}
    >
      {ADD_BOOK}
    </Button>
  </nav>
);

export default NavBar;
