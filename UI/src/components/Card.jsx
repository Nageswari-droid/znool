import {
  Button,
  ContentCard,
  ContentCardBody,
  ContentCardSubtitle,
  ContentCardTitle,
  Typography,
  Utility,
} from "@visa/nova-react";
import { useState } from "react";
import {
  CANCEL,
  DELETE,
  EDIT,
  MODAL_TITLE,
  YEAR,
  CONFIRM,
} from "../constants/string";
import Modal from "./Modal";

const books = {
  "14da279a-3ce3-40a7-9c9f-3c95d8aa640e": {
    title: "The Great Gatsby",
    author: "Homer",
    genre: "Thriller",
    year: 1900,
    description: "A journey through fantastical lands.",
  },
  "e2e2afe6-1f37-447a-8ce9-e6619db62ff6": {
    title: "Jane Eyre",
    author: "Aldous Huxley",
    genre: "Adventure",
    year: 1959,
    description: "A fascinating exploration of society and norms.",
  },
  "1b72253c-8ef4-4eb3-9813-462e10de4121": {
    title: "The Lord of the Rings",
    author: "Leo Tolstoy",
    genre: "Historical",
    year: 1902,
    description: "A story that challenges perceptions and conventions.",
  },
  "1dfb555e-f089-4834-b75a-40883439def2": {
    title: "The Great Gatsby",
    author: "J.D. Salinger",
    genre: "Historical",
    year: 1858,
    description: "An emotional rollercoaster of a novel.",
  },
  "4b359c52-054f-4435-a127-f00bc79f9559": {
    title: "1984",
    author: "Fyodor Dostoevsky",
    genre: "Thriller",
    year: 1996,
    description: "An emotional rollercoaster of a novel.",
  },
  "46ac25ae-55d0-4d4c-994d-856b36602eb9": {
    title: "Moby Dick",
    author: "Aldous Huxley",
    genre: "Historical",
    year: 1933,
    description: "A deep dive into the human psyche.",
  },
  "408951e5-c357-4a73-a326-4e9fcb07276d": {
    title: "The Odyssey",
    author: "George Orwell",
    genre: "Fantasy",
    year: 1973,
    description: "A reflective and philosophical narrative.",
  },
  "af10bab5-0038-4c1c-a721-c909f6a714ab": {
    title: "The Catcher in the Rye",
    author: "Harper Lee",
    genre: "Adventure",
    year: 1852,
    description: "A masterpiece of storytelling and imagination.",
  },
  "2eaf73b3-93d8-4d56-a6d9-cb2d50b09de6": {
    title: "Hamlet",
    author: "Herman Melville",
    genre: "Mystery",
    year: 2011,
    description: "A masterpiece of storytelling and imagination.",
  },
};

const Card = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setBookToDelete(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // TODO: API call to delete book
    console.log("deleted");
    setModalOpen(false);
    setBookToDelete(null);
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
    setBookToDelete(null);
  };

  return (
    <div className="books-grid" role="list" aria-label="Book list">
      {Object.entries(books).map(([id, book]) => (
        <ContentCard role="listitem" key={id} className="book-card">
          <Utility element={<ContentCardBody />} vFlex vFlexCol vGap={4}>
            <ContentCardTitle variant="headline-4">
              {book.title}
            </ContentCardTitle>
            <ContentCardSubtitle
              className="truncate-2-lines"
              variant="subtitle-3"
            >
              {book.author}
            </ContentCardSubtitle>
            <Typography className="v-pt-4">
              {YEAR} {book.year} <br />
              {book.genre}
            </Typography>
            <Typography className="v-pt-4 truncate-2-lines" variant="body-2">
              {book.description}
            </Typography>
            <Utility
              vAlignItems="center"
              vFlex
              vFlexWrap
              vGap={16}
              vPaddingTop={12}
            >
              <Button size="small" colorScheme="primary">
                {EDIT}
              </Button>
              <Button
                size="small"
                colorScheme="destructive"
                onClick={() => handleDeleteClick(id)}
              >
                {DELETE}
              </Button>
            </Utility>
          </Utility>
        </ContentCard>
      ))}
      {modalOpen && (
        <Modal
          title={MODAL_TITLE}
          optionOne={CONFIRM}
          optionTwo={CANCEL}
          handleCancelDelete={handleCancelDelete}
          handleConfirmDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default Card;
