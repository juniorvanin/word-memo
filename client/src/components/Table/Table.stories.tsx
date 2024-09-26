import { Table } from "./Table";
import type { Word } from "../../types";
import type { Props } from "./Table";

export default {
  title: "Components/Table",
  component: Table,
  argTypes: {
    words: { control: "array" },
    savedWords: { control: "array" },
    handleDelete: { action: "handleDelete" },
    handleToggleSaved: { action: "handleToggleSaved" },
  },
};

const mockWords: Word[] = [
  {
    id: "1",
    article: "Das",
    word: "Handy",
    syllables: "Han-dy",
    example: "Das Handy ist kaputt.",
    translation: "Phone",
    type: "noun",
  },
  {
    id: "2",
    article: "Der",
    word: "Hund",
    syllables: "Hund",
    example: "Der Hund bellt.",
    translation: "Dog",
    type: "noun",
  },
  {
    id: "3",
    article: "Die",
    word: "Blume",
    syllables: "Blu-me",
    example: "Die Blume ist schön.",
    translation: "Flower",
    type: "noun",
  },
];

const mockSavedWords: Word[] = [
  {
    id: "3",
    article: "Die",
    word: "Blume",
    syllables: "Blu-me",
    example: "Die Blume ist schön.",
    translation: "Flower",
    type: "noun",
  },
];

export const DefaultTable = (args: Props) => <Table {...args} />;
DefaultTable.args = {
  words: mockWords,
  savedWords: [],
};

export const TableWithSavedWords = (args: Props) => <Table {...args} />;
TableWithSavedWords.args = {
  words: mockWords,
  savedWords: mockSavedWords,
};

export const TableWithNoWords = (args: Props) => <Table {...args} />;
TableWithNoWords.args = {
  words: [],
  savedWords: [],
};
