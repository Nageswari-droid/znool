import React from "react";
import { Radio, Label, Utility } from "@visa/nova-react";

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
