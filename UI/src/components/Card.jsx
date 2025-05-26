import {
  Button,
  ContentCard,
  ContentCardBody,
  ContentCardSubtitle,
  ContentCardTitle,
  Typography,
  Utility,
} from "@visa/nova-react";
import { useNavigate } from "react-router-dom";
import { DELETE, EDIT, YEAR } from "../constants/string";

const Card = ({ book, id, onDeleteHandler }) => {
  const naviagte = useNavigate();

  return (
    <ContentCard role="listitem" key={id} className="book-card">
      <Utility element={<ContentCardBody />} vFlex vFlexCol vGap={4}>
        <ContentCardTitle variant="headline-4 card-title">
          {book.title}
        </ContentCardTitle>
        <ContentCardSubtitle
          className="truncate-2-lines card-author"
          variant="subtitle-3"
        >
          {book.author}
        </ContentCardSubtitle>
        <Typography className="v-pt-4 card-year-genre">
          {YEAR} {book.year} <br />
          {book.genre}
        </Typography>
        <Typography
          className="v-pt-4 card-description"
          variant="body-2"
        >
          {book.description}
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <Utility
          vAlignItems="center"
          vFlex
          vFlexWrap
          vGap={16}
          vPaddingTop={12}
          style={{ justifyContent: "flex-end" }}
        >
          <Button
            className="card-action-btn"
            size="small"
            colorScheme="primary"
            onClick={() => naviagte(`/edit-book/${id}`)}
          >
            {EDIT}
          </Button>
          <Button
            className="card-action-btn"
            size="small"
            colorScheme="destructive"
            onClick={() => onDeleteHandler(id)}
          >
            {DELETE}
          </Button>
        </Utility>
      </Utility>
    </ContentCard>
  );
};

export default Card;
