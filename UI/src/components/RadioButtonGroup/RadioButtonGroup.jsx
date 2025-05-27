/**
 * RadioButtonGroup component for selecting view options.
 *
 * Renders a group of radio buttons for selecting how to view books (e.g., by author, genre).
 */
import React from "react";
import { Radio, Label, Utility } from "@visa/nova-react";

/**
 * RadioButtonGroup component for selecting view options.
 * @component
 * @param {Object} props
 * @param {Array} props.arr - Array of radio button options ({ id, value, label })
 * @param {string} props.viewOption - Currently selected view option
 * @param {Function} props.setViewOption - Handler to set the selected view option
 * @returns {JSX.Element}
 */
const RadioButtonGroup = ({ arr, viewOption, setViewOption }) => {
  return (
    <div className="radio-btn-side-container">
      {arr &&
        arr.map((element) => {
          const { id, value, label } = element;

          return (
            <Utility key={id} vAlignItems="center" vFlex vGap={2}>
              <Radio
                id={id}
                name={`viewOption-${id}`}
                value={value}
                checked={viewOption === value}
                onChange={(e) => {
                  setViewOption(e.target.value);
                }}
              />
              <Label className="radio-label" htmlFor={id}>
                {label}
              </Label>
            </Utility>
          );
        })}
    </div>
  );
};

export default RadioButtonGroup;
