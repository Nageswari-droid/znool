/**
 * SearchBox component for searching books by title or other criteria.
 *
 * Provides a text input with a clear button for searching books.
 */
import React from "react";
import {
  Input,
  InputContainer,
  Button,
  Utility,
  Label,
} from "@visa/nova-react";
import { VisaClearAltTiny } from "@visa/nova-icons-react";
import { SEARCH_PLACEHOLDER, NO_ENTRIES_FOUND } from "../../constants/string";

/**
 * SearchBox component for searching books by title or other criteria.
 * @component
 * @param {Object} props
 * @param {string} props.label - Label for the search box
 * @param {string} props.value - Current search value
 * @param {Function} props.onChangeHandler - Handler for search value change
 * @param {Function} props.onClearHandler - Handler to clear the search value
 * @returns {JSX.Element}
 */
const SearchBox = ({
  label,
  value,
  onChangeHandler,
  onClearHandler,
  noEntriesFound,
}) => {
  return (
    <Utility className="search-box-wrapper">
      <Label htmlFor="search-books-input" className="search-box-label">
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
      {noEntriesFound && (
        <div className="no-entries-found-message">{NO_ENTRIES_FOUND}</div>
      )}
    </Utility>
  );
};

export default SearchBox;
