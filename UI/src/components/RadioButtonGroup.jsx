import { useState } from "react";
import { Radio, Label, Utility } from "@visa/nova-react";
import { useBooksContext } from "../context/booksContext";

const RadioButtonGroup = ({ arr }) => {
  const [viewOption, setViewOption] = useState("none");
  const { sortBooks } = useBooksContext();

  const onChangeHandler = async (e) => {
    setViewOption(e.target.value);

    if (e.target.value === "sort") {
      sortBooks();
    }
  };

  return (
    <div className="radio-btn-side-container">
      {arr &&
        arr.map((element) => {
          const { id, value, label } = element;

          return (
            <Utility key={id} vAlignItems="center" vFlex vGap={2}>
              <Radio
                id={id}
                name="viewOption"
                value={value}
                checked={viewOption === value}
                onChange={(e) => {
                  onChangeHandler(e);
                }}
              />
              <Label htmlFor={id}>{label}</Label>
            </Utility>
          );
        })}
    </div>
  );
};

export default RadioButtonGroup;
