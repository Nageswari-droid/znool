import { Button } from "@visa/nova-react";
import { ADD_BOOK, TITLE } from "../constants/string";
import { useNavigate } from "react-router-dom";
import "../styles/navBar.css";

const NavBar = () => {
  const naviagte = useNavigate();

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <h1 className="navbar-title">{TITLE}</h1>
      <Button
        alternate
        className="navbar-add-btn"
        onClick={() => naviagte("/add-new-book")}
        aria-label={ADD_BOOK}
      >
        {ADD_BOOK}
      </Button>
    </nav>
  );
};

export default NavBar;
