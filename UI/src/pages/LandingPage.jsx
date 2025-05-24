import { Button } from "@visa/nova-react";
import {
  TITLE,
  WELCOME,
  DESCRIPTION,
  SUBTITLE,
  ADD_BOOK,
  DISPLAY_BOOKS,
} from "../constants/string";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
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
