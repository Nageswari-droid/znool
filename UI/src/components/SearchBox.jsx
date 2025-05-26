import {
  Input,
  InputContainer,
  Button,
  Utility,
  Label,
} from "@visa/nova-react";
import { VisaClearAltTiny } from "@visa/nova-icons-react";
import { SEARCH_PLACEHOLDER } from "../constants/string";
import "../styles/SearchBox.css";

const SearchBox = ({ label, value, onChangeHandler, onClearHandler, hideLabelOnMobile }) => {
  return (
    <Utility className="search-box-wrapper">
      <Label
        htmlFor="search-books-input"
        style={hideLabelOnMobile ? { display: "none" } : {}}
        className={hideLabelOnMobile ? "search-label-mobile" : ""}
      >
        {label}
      </Label>
      <InputContainer>
        <Input
          id="search-books-input"
          type="text"
          placeholder={SEARCH_PLACEHOLDER}
          value={value}
          onChange={(e) => onChangeHandler(e.target.value)}
          aria-label="Search books"
        />
        {value && (
          <Button
            aria-label="Clear search"
            buttonSize="small"
            colorScheme="tertiary"
            iconButton
            onClick={() => onClearHandler()}
            subtle
            tabIndex={0}
            type="button"
          >
            <VisaClearAltTiny />
          </Button>
        )}
      </InputContainer>
    </Utility>
  );
};

export default SearchBox;
