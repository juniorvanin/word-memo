import { render, screen } from "@testing-library/react";
import {
  useSavedWords,
  addToSavedWords,
  removeFromSavedWords,
} from "./useSavedWords";
import { API_URL } from "../contants";
import { v4 as uuidv4 } from "uuid";
import { mutate } from "swr";

import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

jest.mock("swr", () => {
  return {
    __esModule: true,
    ...jest.requireActual("swr"),
    mutate: jest.fn(),
  };
});

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("useSavedWords", () => {
  it("should fetch and return words", async () => {
    const userId = uuidv4();
    const mockData = [{ id: "1", word: "test" }];
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const TestComponent = () => {
      const { data } = useSavedWords(userId);
      return <div>{data ? data[0].word : "Loading..."}</div>;
    };

    render(<TestComponent />);

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/users/${userId}/words`);

    await screen.findByText("test");
  });

  it("should handle fetch error", async () => {
    const userId = uuidv4();
    fetchMock.mockRejectOnce(new Error("Failed to fetch"));

    const TestComponent = () => {
      const data = useSavedWords(userId);
      return <div>{data.error ? "Error" : "Loading..."}</div>;
    };

    render(<TestComponent />);

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/users/${userId}/words`);

    await screen.findByText("Error");
  });
});

describe("addToSavedWords", () => {
  it("should send a POST request and mutate SWR cache on success", async () => {
    const userId = uuidv4();
    const wordId = uuidv4();
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));

    await addToSavedWords(userId, wordId);

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/users/${userId}/words/${wordId}`,
      {
        method: "POST",
      },
    );

    expect(mutate).toHaveBeenCalledWith(`${API_URL}/users/${userId}/words`);
  });

  it("should throw an error on failure", async () => {
    const userId = uuidv4();
    const wordId = uuidv4();
    fetchMock.mockResponseOnce(JSON.stringify({ error: "Failed" }), {
      status: 500,
    });

    await expect(addToSavedWords(userId, wordId)).rejects.toThrow(
      "Failed to add to Saved Words",
    );
  });
});

describe("removeFromSavedWords", () => {
  it("should send a DELETE request and mutate SWR cache on success", async () => {
    const userId = uuidv4();
    const wordId = uuidv4();
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));

    await removeFromSavedWords(userId, wordId);

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/users/${userId}/words/${wordId}`,
      {
        method: "DELETE",
      },
    );

    expect(mutate).toHaveBeenCalledWith(`${API_URL}/users/${userId}/words`);
  });

  it("should throw an error on failure", async () => {
    const userId = uuidv4();
    const wordId = uuidv4();
    fetchMock.mockResponseOnce(JSON.stringify({ error: "Failed" }), {
      status: 500,
    });

    await expect(removeFromSavedWords(userId, wordId)).rejects.toThrow(
      "Failed to remove from Saved Words",
    );
  });
});
