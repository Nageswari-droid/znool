import { groupByGenre, sortByTitle, groupByAuthor } from "./transform";

describe("Transform Utilities", () => {
  const books = {
    "90-7890-678": {
      title: "The Odyssey",
      author: "George Orwell",
      genre: "Fantasy",
      year: 1973,
      description: "A reflective and philosophical narrative.",
    },
    "90-7890-654": {
      title: "The Catcher in the Rye",
      author: "Herman Melville",
      genre: "Adventure",
      year: 1852,
      description: "A masterpiece of storytelling and imagination.",
    },
    "90-7789-654": {
      title: "Hamlet",
      author: "Herman Melville",
      genre: "Fantasy",
      year: 2011,
      description: "A masterpiece of storytelling and imagination.",
    },
  };

  test("sortByTitle sorts books by title", () => {
    const sorted = sortByTitle(books);

    expect(Object.values(sorted).map((b) => b.title)).toEqual([
      "Hamlet",
      "The Catcher in the Rye",
      "The Odyssey",
    ]);
  });

  test("groupByGenre groups books by genre", () => {
    const grouped = groupByGenre(books);

    expect(Object.keys(grouped)).toEqual(["Adventure", "Fantasy"]);
    expect(Object.keys(grouped["Adventure"])).toEqual(["90-7890-654"]);
    expect(Object.keys(grouped["Fantasy"])).toEqual([
      "90-7890-678",
      "90-7789-654",
    ]);
  });

  test("groupByAuthor groups books by author", () => {
    const grouped = groupByAuthor(books);

    expect(Object.keys(grouped)).toEqual(["George Orwell", "Herman Melville"]);
    expect(Object.keys(grouped["George Orwell"])).toEqual(["90-7890-678"]);
    expect(Object.keys(grouped["Herman Melville"])).toEqual([
      "90-7890-654",
      "90-7789-654",
    ]);
  });
});
