import { filterByGroup, filter } from "./filter";

describe("filter", () => {
  const books = {
    1: { title: "The Odyssey" },
    2: { title: "The Catcher in the Rye" },
    3: { title: "Hamlet" },
  };

  it("returns all data if no value is provided", () => {
    expect(filter(books, "")).toEqual(books);
  });

  it("filters by title prefix", () => {
    expect(filter(books, "th")).toEqual({
      1: { title: "The Odyssey" },
      2: { title: "The Catcher in the Rye" },
    });
  });

  it("returns empty object if no matches", () => {
    expect(filter(books, "ab")).toEqual({});
  });
});

describe("filterByGroup", () => {
  const grouped = {
    "Herman Melville": {
      2: { title: "The Catcher in the Rye" },
      3: { title: "Hamlet" },
    },
    "George Orwell": {
      1: { title: "The Odyssey" },
    },
  };

  it("returns all data if no value is provided", () => {
    expect(filterByGroup(grouped, "")).toEqual(grouped);
  });

  it("filters groups by title prefix", () => {
    expect(filterByGroup(grouped, "th")).toEqual({
      "George Orwell": {
        1: { title: "The Odyssey" },
      },
      "Herman Melville": {
        2: { title: "The Catcher in the Rye" },
      },
    });
  });

  it("returns empty object if no matches in any group", () => {
    expect(filterByGroup(grouped, "zzz")).toEqual({});
  });
});
