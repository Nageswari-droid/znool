import React from "react";
import { Button } from "@visa/nova-react";
import "../styles/LandingPage.css";
import {
  TITLE,
  WELCOME,
  DESCRIPTION,
  SUBTITLE,
  ADD_BOOK,
  DISPLAY_BOOKS,
} from "../constants/string";

const LandingPage = () => {
  return (
    <main className="landing-main" tabIndex={-1}>
      <section className="landing-content" aria-labelledby="landing-title">
        <h1 id="landing-title" className="landing-title">
          {WELCOME} <span className="landing-title-highlight">{TITLE}</span> –
          {SUBTITLE}
        </h1>
        <p className="landing-subheading">{DESCRIPTION}</p>
        <div className="landing-actions">
          <Button
            className="landing-btn"
            aria-label={ADD_BOOK}
            onClick={() => {}}
          >
            {ADD_BOOK}
          </Button>
          <Button
            alternate
            className="landing-btn"
            aria-label={DISPLAY_BOOKS}
            onClick={() => {}}
          >
            {DISPLAY_BOOKS}
          </Button>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
