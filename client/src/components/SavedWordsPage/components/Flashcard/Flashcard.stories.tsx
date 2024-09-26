import { Flashcard } from "./Flashcard";
import type { Props } from "./Flashcard";

export default {
  title: "Components/Flashcard",
  component: Flashcard,
  argTypes: {
    word: {
      control: "object",
      defaultValue: {
        id: "1",
        article: "Das",
        word: "Handy",
        syllables: "Han-dy",
        example: "Das Handy ist kaputt.",
        translation: "Phone",
        type: "noun",
      },
    },
  },
};

export const NeuterWord = (args: Props) => <Flashcard {...args} />;
NeuterWord.args = {
  word: {
    id: "1",
    article: "Das",
    word: "Handy",
    syllables: "Han-dy",
    example: "Das Handy ist kaputt.",
    translation: "Phone",
    type: "noun",
  },
};

export const MasculineWord = (args: Props) => <Flashcard {...args} />;
MasculineWord.args = {
  word: {
    id: "1",
    article: "Der",
    word: "Hund",
    syllables: "Hund",
    example: "Der Hund bellt.",
    translation: "Dog",
    type: "noun",
  },
};

export const FeminineWord = (args: Props) => <Flashcard {...args} />;
FeminineWord.args = {
  word: {
    id: "1",
    article: "Die",
    word: "Blume",
    syllables: "Blu-me",
    example: "Die Blume ist schön.",
    translation: "Flower",
    type: "noun",
  },
};

export const WordAlreadyAddedToMyWords = (args: Props) => (
  <Flashcard {...args} />
);
WordAlreadyAddedToMyWords.args = {
  word: {
    id: "1",
    article: "Die",
    word: "Blume",
    syllables: "Blu-me",
    example: "Die Blume ist schön.",
    translation: "Flower",
    type: "noun",
  },
};
