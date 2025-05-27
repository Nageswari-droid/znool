/**
 * NoBookFound component for displaying a message and actions when no books are found.
 *
 * Shows a message and provides buttons to add a new book or display all books.
 */
import React from "react";
import { Button, Typography, Utility } from "@visa/nova-react";
import { useNavigate } from "react-router-dom";
import { ADD_BOOK, DISPLAY_BOOKS } from "../../constants/string";
import "../../styles/BookPages.css";

/**
 * NoBookFound component for displaying a message and actions when no books are found.
 * @component
 * @param {Object} props
 * @param {string} props.title - Main title message
 * @param {string} props.subtitleOne - First subtitle message
 * @param {string} props.subtitleTwo - Second subtitle message
 * @param {boolean} props.isAddBtnRequired - Whether to show the add book button
 * @param {boolean} [props.isGetBooksBtnRequired=false] - Whether to show the display books button
 * @returns {JSX.Element}
 */
const NoBookFound = ({
  title,
  subtitleOne,
  subtitleTwo,
  isAddBtnRequired,
  isGetBooksBtnRequired = false,
}) => {
  const navigate = useNavigate();

  return (
    <div className="no-book-found-page-outer">
      <main className="no-book-found-main">
        <section
          className="no-book-found-section"
          aria-labelledby="no-book-found-section"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <Typography
              className="no-book-found-content-title"
              variant="headline-4"
              as="h3"
              style={{ textAlign: "center" }}
            >
              {title}
            </Typography>
            <Typography
              className="no-book-found-content-title"
              variant="headline-5"
              as="h4"
              style={{ textAlign: "center" }}
            >
              {subtitleOne}
            </Typography>
            <Typography
              className="no-book-found-content-title"
              variant="headline-5"
              as="h4"
              style={{ textAlign: "center" }}
            >
              {subtitleTwo}
            </Typography>
            <Utility
              vFlex
              vAlignContent="center"
              vJustifyContent="center"
              vGap={16}
              vPaddingTop={16}
            >
              {isAddBtnRequired && (
                <Button alternate onClick={() => navigate("/add-new-book")}>
                  {ADD_BOOK}
                </Button>
              )}
              {isGetBooksBtnRequired && (
                <Button
                  colorScheme="primary"
                  onClick={() => navigate("/get-all-books")}
                >
                  {DISPLAY_BOOKS}
                </Button>
              )}
            </Utility>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NoBookFound;
