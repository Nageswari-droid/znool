import React from "react";
import { VisaChevronDownTiny } from "@visa/nova-icons-react";
import {
  InputContainer,
  InputControl,
  Label,
  Select,
  Utility,
} from "@visa/nova-react";

const SelectBox = ({ id, label, value, options, onChangeHandler }) => {
  return (
    <Utility
      tag="fieldset"
      vFlex
      vAlignItems="center"
      vJustifyContent="between"
      style={{
        marginBottom: "1rem",
      }}
    >
      <Label htmlFor={id} className="book-form-label">
        {label}
        <span aria-hidden="true" style={{ color: "red" }}>
          *
        </span>
      </Label>
      <InputContainer className="select-option-container">
        <Select
          id={id}
          name={`${id}-name`}
          value={value}
          onChange={(e) => onChangeHandler(e.target.value)}
        >
          <option value="">Select a genre</option>
          {options.map((option, index) => (
            <option key={`${id}-option-${index}`} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <InputControl>
          <VisaChevronDownTiny />
        </InputControl>
      </InputContainer>
    </Utility>
  );
};

export default SelectBox;
