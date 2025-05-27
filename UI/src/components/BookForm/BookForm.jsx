/**
 * BookForm component for adding or editing a book.
 *
 * Provides a form with fields for title, author, year, genre, and description, including validation and clear functionality.
 */
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
import SelectBox from "../SelectBox/SelectBox";
import TextArea from "../TextArea/TextArea";
import "../../styles/BookPages.css";
import TextBoxWithError from "../TextBoxWithError/TextBoxWithError";

/**
 * Returns the current year as a number.
 * @returns {number}
 */
const getCurrentYear = () => new Date().getFullYear();

/**
 * BookForm component for adding or editing a book.
 * @component
 * @param {Object} props
 * @param {Object} [props.initialValue={}] - Initial values for the form fields
 * @param {Function} props.onSubmitHandler - Handler for form submission
 * @param {string} props.submitLabel - Label for the submit button
 * @returns {JSX.Element}
 */
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

  /**
   * Handles title input change.
   * @param {string} updatedTitle
   */
  const titleHandler = (updatedTitle) => {
    setTitle(updatedTitle);
  };

  /**
   * Handles author input change.
   * @param {string} updatedAuthor
   */
  const authorHandler = (updatedAuthor) => {
    setAuthor(updatedAuthor);
  };

  /**
   * Handles year input change and validates it.
   * @param {string} updatedYear
   */
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

  /**
   * Handles genre input change.
   * @param {string} updatedGenre
   */
  const genreHandler = (updatedGenre) => {
    setGenre(updatedGenre);
  };

  /**
   * Handles description input change and truncates to max length.
   * @param {string} updatedDescription
   */
  const descriptionHandler = (updatedDescription) => {
    const truncated = updatedDescription.slice(0, MAXIMUM_CHARACTERS);
    setDescription(truncated);
  };

  /**
   * Clears all form fields.
   * @param {Event} e
   */
  const onClearHandler = (e) => {
    e.preventDefault();
    setTitle("");
    setAuthor("");
    setYear("");
    setGenre("");
    setDescription("");
    setYearError("");
  };

  /**
   * Checks if the submit button should be disabled based on validation.
   * @returns {boolean}
   */
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
