/**
 * TextArea component for multiline text input (e.g., book description).
 *
 * Provides a textarea input with optional helper text.
 */
import React from "react";
import { InputContainer, Label, Textarea, Utility } from "@visa/nova-react";

/**
 * TextArea component for multiline text input (e.g., book description).
 * @component
 * @param {Object} props
 * @param {string} props.label - Label for the textarea
 * @param {string} props.value - Value of the textarea
 * @param {string} props.placeholder - Placeholder text
 * @param {Function} props.onChangeHandler - Handler for value change
 * @param {string} [props.helperText] - Optional helper or error text
 * @returns {JSX.Element}
 */
const TextArea = ({
  label,
  value,
  placeholder,
  onChangeHandler,
  helperText,
}) => {
  return (
    <Utility
      vFlex
      vGap={10}
      className="text-area-container"
      style={{
        marginBottom: "1rem",
      }}
    >
      <Label htmlFor="input-book-description" className="book-form-label">
        {label}
      </Label>
      <Utility className="input-text-area-container">
        <InputContainer className="v-flex-row input-container">
          <Textarea
            id="input-book-description"
            name="input-book-description"
            value={value}
            onChange={(e) => onChangeHandler(e.target.value)}
            style={{ blockSize: "50px", resize: "none" }}
            aria-label={label}
            aria-required="false"
            placeholder={placeholder}
          />
        </InputContainer>
        {helperText && (
          <div className="textarea-error-message">{helperText}</div>
        )}
      </Utility>
    </Utility>
  );
};

export default TextArea;
