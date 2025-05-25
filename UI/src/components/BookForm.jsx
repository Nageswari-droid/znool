import { useState } from "react";
import { Button } from "@visa/nova-react";
import {
  CLEAR_INPUT,
  INPUT_DESCRIPTION,
  INPUT_DESCRIPTION_PLACEHOLDER,
} from "../constants/string";
import GENRES from "../constants/genres";
import TextBox from "./TextBox";
import SelectBox from "./SelectBox";
import TextArea from "./TextArea";
import "../styles/BookPages.css";

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

  const titleHandler = (updatedTitle) => {
    setTitle(updatedTitle);
  };

  const authorHandler = (updatedAuthor) => {
    setAuthor(updatedAuthor);
  };

  const yearHandler = (updatedYear) => {
    setYear(updatedYear);
  };

  const genreHandler = (updatedGenre) => {
    setGenre(updatedGenre);
  };

  const descriptionHandler = (updatedDescription) => {
    setDescription(updatedDescription);
  };

  const onClearHandler = (e) => {
    e.preventDefault();
    setTitle("");
    setAuthor("");
    setYear("");
    setGenre("");
    setDescription("");
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
            <TextBox
              type="text"
              label={"Book Title"}
              value={title}
              id={"input-book-title"}
              onChangeHandler={titleHandler}
              onClearHandler={() => setTitle("")}
            />
            <TextBox
              type="text"
              label={"Author's Name"}
              value={author}
              id={"input-book-author"}
              onChangeHandler={authorHandler}
              onClearHandler={() => setAuthor("")}
            />
            <TextBox
              type="number"
              label={"Published year"}
              value={year}
              id={"input-book-year"}
              onChangeHandler={yearHandler}
              onClearHandler={() => setYear("")}
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
            />

            <div className="multiple-action-btns">
              <Button
                disabled={!title || !author || !genre || !year}
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
