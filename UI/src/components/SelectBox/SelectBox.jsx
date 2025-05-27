/**
 * SelectBox component for selecting a genre from a dropdown.
 *
 * Provides a dropdown select input for choosing a genre.
 */
import React from "react";
import { VisaChevronDownTiny } from "@visa/nova-icons-react";
import {
  InputContainer,
  InputControl,
  Label,
  Select,
  Utility,
} from "@visa/nova-react";

/**
 * SelectBox component for selecting a genre from a dropdown.
 * @component
 * @param {Object} props
 * @param {string} props.id - ID for the select input
 * @param {string} props.label - Label for the select input
 * @param {string} props.value - Current selected value
 * @param {Array<string>} props.options - Array of genre options
 * @param {Function} props.onChangeHandler - Handler for value change
 * @returns {JSX.Element}
 */
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
