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
        <ContentCardTitle variant="headline-4">{book.title}</ContentCardTitle>
        <ContentCardSubtitle className="truncate-2-lines" variant="subtitle-3">
          {book.author}
        </ContentCardSubtitle>
        <Typography className="v-pt-4">
          {YEAR} {book.year} <br />
          {book.genre}
        </Typography>
        <Typography
          className="v-pt-4 truncate-2-lines"
          variant="body-2"
          style={{
            height: "45px",
            overflowY: "auto",
            marginBottom: "0.5rem",
          }}
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
            size="small"
            colorScheme="primary"
            onClick={() => naviagte(`/edit-book/${id}`)}
          >
            {EDIT}
          </Button>
          <Button
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
