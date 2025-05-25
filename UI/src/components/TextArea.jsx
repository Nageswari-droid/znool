import { InputContainer, Label, Textarea, Utility } from "@visa/nova-react";

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
      <Utility style={{ width: "60%" }}>
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
          <div
            style={{
              color: "rgb(33, 27, 51, 0.6)",
              fontSize: "0.8rem",
              marginBottom: "0.5rem",
              width: "100%",
            }}
          >
            {helperText}
          </div>
        )}
      </Utility>
    </Utility>
  );
};

export default TextArea;
