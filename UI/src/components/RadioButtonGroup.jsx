import { useState } from "react";
import { Radio, Label, Utility } from "@visa/nova-react";

const RadioButtonGroup = () => {
  const [viewOption, setViewOption] = useState("none");
  console.log(viewOption);

  return (
    <div className="radio-btn-side-container">
      <Utility vAlignItems="center" vFlex vGap={2}>
        <Radio
          id="radio-sort"
          name="viewOption"
          value="sort"
          checked={viewOption === "sort"}
          onChange={(e) => setViewOption(e.target.value)}
        />
        <Label htmlFor="radio-sort">Sort by title</Label>
      </Utility>
      <Utility vAlignItems="center" vFlex vGap={2}>
        <Radio
          id="radio-author"
          name="viewOption"
          value="author"
          checked={viewOption === "author"}
          onChange={(e) => setViewOption(e.target.value)}
        />
        <Label htmlFor="radio-author">Group by author</Label>
      </Utility>
      <Utility vAlignItems="center" vFlex vGap={2}>
        <Radio
          id="radio-genre"
          name="viewOption"
          value="genre"
          checked={viewOption === "genre"}
          onChange={(e) => setViewOption(e.target.value)}
        />
        <Label htmlFor="radio-genre">Group by genre</Label>
      </Utility>
    </div>
  );
};

export default RadioButtonGroup;
