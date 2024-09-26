import useSWR, { mutate } from "swr";

import { API_URL } from "../contants";
import { Word } from "../types";

export const useSavedWords = (userId: string) => {
  const url = `${API_URL}/users/${userId}/words`;

  return useSWR<Word[]>(url, (url: string) =>
    fetch(url).then((res) => res.json() as Promise<Word[]>),
  );
};

export const addToSavedWords = async (userId: string, wordId: string) => {
  const url = `${API_URL}/users/${userId}/words/${wordId}`;
  const response = await fetch(url, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to add to Saved Words");
  }

  await mutate(`${API_URL}/users/${userId}/words`);
};

export const removeFromSavedWords = async (userId: string, wordId: string) => {
  const url = `${API_URL}/users/${userId}/words/${wordId}`;
  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to remove from Saved Words");
  }

  await mutate(`${API_URL}/users/${userId}/words`);
};
