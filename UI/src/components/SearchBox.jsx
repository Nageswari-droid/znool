import {
  Input,
  InputContainer,
  Button,
  Utility,
  Label,
} from "@visa/nova-react";
import { VisaClearAltTiny } from "@visa/nova-icons-react";
import { SEARCH_PLACEHOLDER } from "../constants/string";

const SearchBox = ({ label, value, onChangeHandler, onClearHandler }) => {
  return (
    <Utility className="search-box-wrapper">
      <Label
        htmlFor="search-books-input"
        className="search-box-label"
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
