import {
  Button,
  Input,
  InputContainer,
  Label,
  Utility,
} from "@visa/nova-react";
import { VisaClearAltTiny } from "@visa/nova-icons-react";

const TextBox = ({
  type,
  label,
  value,
  id,
  onChangeHandler,
  onClearHandler,
}) => {
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
      <InputContainer className="input-container">
        <Input
          aria-required="true"
          id={id}
          onChange={(e) => onChangeHandler(e.currentTarget.value)}
          type={type}
          value={value}
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
    </Utility>
  );
};

export default TextBox;
