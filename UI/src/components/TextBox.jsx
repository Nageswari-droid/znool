import {
  Button,
  Input,
  InputContainer,
  Label,
  Utility,
  InputMessage,
} from "@visa/nova-react";
import { VisaClearAltTiny } from "@visa/nova-icons-react";
import { MAXIMUM_CHARACTERS } from "../constants/characterLimit";

const TextBox = ({
  type,
  label,
  value,
  id,
  onChangeHandler,
  onClearHandler,
  errorMessage
}) => {
  const isError = value.length > MAXIMUM_CHARACTERS;

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
            style={{
              fontSize: "0.7rem",
              color: "#C62F2F",
            }}
          >
            {errorMessage}
          </InputMessage>
        )}
      </Utility>
    </Utility>
  );
};

export default TextBox;
