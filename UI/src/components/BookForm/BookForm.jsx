import React from "react";
import { useState } from "react";
import { Button } from "@visa/nova-react";
import {
  CLEAR_INPUT,
  INPUT_DESCRIPTION,
  INPUT_DESCRIPTION_PLACEHOLDER,
  MAX_LEN_MESSAGE,
  YEAR_ERROR_MESSAGE,
} from "../../constants/string";
import { MAXIMUM_CHARACTERS } from "../../constants/characterLimit";
import GENRES from "../../constants/genres";
import SelectBox from "../SelectBox";
import TextArea from "../TextArea";
import "../../styles/BookPages.css";
import TextBoxWithError from "../TextBoxWithError";

const getCurrentYear = () => new Date().getFullYear();

export default function BookForm({
  initialValue = {},
  onSubmitHandler,
  submitLabel,
}) {
  const [title, setTitle] = useState(initialValue.title || "");
  const [author, setAuthor] = useState(initialValue.author || "");
  const [year, setYear] = useState(initialValue.year || "");
  const [genre, setGenre] = useState(initialValue.genre || "");
  const [description, setDescription] = useState(
    initialValue.description || ""
  );
  const [yearError, setYearError] = useState("");

  const titleHandler = (updatedTitle) => {
    setTitle(updatedTitle);
  };

  const authorHandler = (updatedAuthor) => {
    setAuthor(updatedAuthor);
  };

  const yearHandler = (updatedYear) => {
    let yearValue = updatedYear;

    if (updatedYear.length > 4) {
      yearValue = updatedYear.slice(0, 4);
    }

    const currentYear = getCurrentYear();
    if (yearValue && parseInt(yearValue) > currentYear) {
      setYearError(YEAR_ERROR_MESSAGE + currentYear);
      setYear(yearValue);
      return;
    }

    setYearError("");
    setYear(yearValue);
  };

  const genreHandler = (updatedGenre) => {
    setGenre(updatedGenre);
  };

  const descriptionHandler = (updatedDescription) => {
    const truncated = updatedDescription.slice(0, MAXIMUM_CHARACTERS);
    setDescription(truncated);
  };

  const onClearHandler = (e) => {
    e.preventDefault();
    setTitle("");
    setAuthor("");
    setYear("");
    setGenre("");
    setDescription("");
    setYearError("");
  };

  const isSubmitBtnDisabled = () => {
    return (
      !title ||
      !author ||
      !genre ||
      !year ||
      title.length > MAXIMUM_CHARACTERS ||
      author.length > MAXIMUM_CHARACTERS ||
      !!yearError
    );
  };

  return (
    <div className="add-update-book-page-outer">
      <main className="add-update-book-main">
        <section
          className="add-update-book-section"
          aria-labelledby="add-update-book-form"
        >
          <form
            className="book-form"
            noValidate
            aria-label="Add or update book form"
          >
            <TextBoxWithError
              type="text"
              label={"Book Title"}
              value={title}
              id={"input-book-title"}
              onChangeHandler={titleHandler}
              onClearHandler={() => setTitle("")}
              errorMessage={MAX_LEN_MESSAGE}
            />
            <TextBoxWithError
              type="text"
              label={"Author's Name"}
              value={author}
              id={"input-book-author"}
              onChangeHandler={authorHandler}
              onClearHandler={() => setAuthor("")}
              errorMessage={MAX_LEN_MESSAGE}
            />
            <TextBoxWithError
              type="number"
              label={"Published year"}
              value={year}
              id={"input-book-year"}
              onChangeHandler={yearHandler}
              onClearHandler={() => {
                setYear("");
                setYearError("");
              }}
              errorMessage={yearError}
            />
            <SelectBox
              id={"input-book-genre"}
              label={"Genre"}
              value={genre}
              options={GENRES}
              onChangeHandler={genreHandler}
            />
            <TextArea
              label={INPUT_DESCRIPTION}
              value={description}
              placeholder={INPUT_DESCRIPTION_PLACEHOLDER}
              onChangeHandler={descriptionHandler}
              helperText={MAX_LEN_MESSAGE}
            />

            <div className="multiple-action-btns">
              <Button
                disabled={isSubmitBtnDisabled()}
                type="submit"
                className="common-btn"
                aria-label={submitLabel}
                onClick={(e) => {
                  e.preventDefault();
                  onSubmitHandler({
                    title: title,
                    author: author,
                    genre: genre,
                    year: year,
                    description: description,
                  });
                }}
              >
                {submitLabel}
              </Button>
              <Button
                disabled={!title && !author && !genre && !year}
                alternate
                className="common-btn"
                aria-label={CLEAR_INPUT}
                onClick={(e) => {
                  onClearHandler(e);
                }}
              >
                {CLEAR_INPUT}
              </Button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
