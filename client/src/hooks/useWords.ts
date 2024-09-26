import useSWR, { mutate } from "swr";

import { API_URL } from "../contants";
import { Word } from "../types";

export const useWords = (term: string) => {
  const url = `${API_URL}/words?term=${term}`;
  return useSWR(url, (url: string) =>
    fetch(url).then((res) => res.json() as Promise<Word[]>),
  );
};

export const deleteWord = async (wordId: string) => {
  const url = `${API_URL}/words/${wordId}`;
  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete word");
  }

  await mutate(`${API_URL}/words`);
};
