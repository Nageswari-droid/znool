import { FocusEvent, useEffect, useRef, useState } from "react";
import { Button } from "@visa/nova-react";

import GENRES from "../constants/genres";
import "../styles/BookForm.css";
import TextBox from "./TextBox";
import SelectBox from "./SelectBox";
import { ADD_BOOK, CLEAR_INPUT } from "../constants/string";

export default function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");

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

  const onClearHandler = (e) => {
    e.preventDefault();
    setTitle("");
    setAuthor("");
    setYear("");
    setGenre("");
  };

  return (
    <form className="book-form" noValidate aria-label="Add or update book form">
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

      <div className="multiple-action-btns">
        <Button
          disabled={!title || !author || !genre || !year}
          type="submit"
          className="common-btn"
          aria-label="Add a new book"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {ADD_BOOK}
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
  );
}
