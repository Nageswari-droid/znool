/**
 * TextBoxWithError component for input fields with error display and clear button.
 *
 * Provides an input field with error handling and a clear button. Supports text and number types.
 */
import React from "react";
import {
  Button,
  Input,
  InputContainer,
  Label,
  Utility,
  InputMessage,
} from "@visa/nova-react";
import { VisaClearAltTiny } from "@visa/nova-icons-react";
import { MAXIMUM_CHARACTERS } from "../../constants/characterLimit";

/**
 * TextBoxWithError component for input fields with error display and clear button.
 * @component
 * @param {Object} props
 * @param {string} props.type - Input type (e.g., 'text', 'number')
 * @param {string} props.label - Label for the input
 * @param {string|number} props.value - Value of the input
 * @param {string} props.id - ID for the input
 * @param {Function} props.onChangeHandler - Handler for input value change
 * @param {Function} props.onClearHandler - Handler for clearing the input
 * @param {string} props.errorMessage - Error message to display
 * @returns {JSX.Element}
 */
const TextBoxWithError = ({
  type,
  label,
  value,
  id,
  onChangeHandler,
  onClearHandler,
  errorMessage,
}) => {
  let isError = value.length > MAXIMUM_CHARACTERS;

  if (type === "number") {
    isError = !!errorMessage;
  }

  return (
    <Utility
      className="text-box-container"
      vFlex
      vGap={10}
      vAlignItems="center"
    >
      <Label htmlFor={id} className="book-form-label">
        {label}
        <span aria-hidden="true" style={{ color: "red" }}>
          *
        </span>
      </Label>
      <Utility className="input-with-error-container">
        <InputContainer style={{ width: "100%" }}>
          <Input
            aria-required="true"
            id={id}
            onChange={(e) => onChangeHandler(e.currentTarget.value)}
            type={type}
            value={value}
            aria-invalid={isError}
          />
          {value && (
            <Button
              aria-label={`Clear ${label}`}
              buttonSize="small"
              colorScheme="tertiary"
              iconButton
              onClick={onClearHandler}
              subtle
              tabIndex={0}
              type="button"
            >
              <VisaClearAltTiny />
            </Button>
          )}
        </InputContainer>
        {isError && (
          <InputMessage
            aria-atomic="true"
            aria-live="assertive"
            id={`${id}-message`}
            role="warning"
            className="textbox-error-message"
          >
            {errorMessage}
          </InputMessage>
        )}
      </Utility>
    </Utility>
  );
};

export default TextBoxWithError;
