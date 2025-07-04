/**
 * Home page component for the library management system.
 *
 * Provides navigation to add a new book or display all books.
 */
import React from "react";
import { Button } from "@visa/nova-react";
import { useNavigate } from "react-router-dom";
import {
  TITLE,
  WELCOME,
  DESCRIPTION,
  SUBTITLE,
  ADD_BOOK,
  DISPLAY_BOOKS,
} from "../../constants/string";
import "../../styles/Home.css";

/**
 * Home page for the library management system.
 * @component
 * @returns {JSX.Element}
 */
const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="landing-main" tabIndex={-1}>
      <section className="landing-content" aria-labelledby="landing-title">
        <h1 id="landing-title" className="landing-title">
          {WELCOME} <span className="landing-title-highlight">{TITLE}</span> –
          {SUBTITLE}
        </h1>
        <p className="landing-subheading">{DESCRIPTION}</p>
        <div className="multiple-action-btns">
          <Button
            className="common-btn"
            aria-label={ADD_BOOK}
            onClick={() => navigate("/add-new-book")}
          >
            {ADD_BOOK}
          </Button>
          <Button
            alternate
            className="common-btn"
            aria-label={DISPLAY_BOOKS}
            onClick={() => {
              navigate("/get-all-books");
            }}
          >
            {DISPLAY_BOOKS}
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Home;
