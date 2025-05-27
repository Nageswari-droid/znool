import React from "react";
import { Button, Typography, Utility } from "@visa/nova-react";
import { useNavigate } from "react-router-dom";
import { ADD_BOOK, DISPLAY_BOOKS } from "../../constants/string";
import "../../styles/BookPages.css";

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
