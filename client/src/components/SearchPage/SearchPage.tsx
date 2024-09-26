import { Button, TextField, Typography } from "@mui/material";
import { deleteWord, useWords } from "../../hooks/useWords";
import { PageWrapper } from "../PageWrapper/PageWrapper";
import { useState } from "react";
import { useUser } from "../../hooks/useUser";
import {
  addToSavedWords,
  removeFromSavedWords,
  useSavedWords,
} from "../../hooks/useSavedWords";
import { Table } from "../Table";

export const SearchPage = () => {
  const { user } = useUser();
  const myWordsResponse = useSavedWords(user.id);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const allWordsResponse = useWords(searchTerm);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchTerm(searchInputValue);

  };

  if (myWordsResponse.error || allWordsResponse.error)
    return <div>failed to load</div>;
  if (myWordsResponse.isLoading || allWordsResponse.isLoading)
    return <div>loading...</div>;

  return (
    <PageWrapper pageTitle="Search words">
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexGrow: 1, alignItems: "center" }}
      >
        <TextField
          id="search-word-input"
          variant="outlined"
          fullWidth
          sx={{ mr: 2 }}
          value={searchInputValue}
          autoFocus
          onChange={(event) => setSearchInputValue(event.target.value)}

        />
        <Button type="submit" variant="contained">
          Search
        </Button>
      </form>
      <Typography variant="subtitle1" mt={1} mb={2}>
        {allWordsResponse.data?.length} words have been found. Didn't find what
        you were looking for? Add a new word!
      </Typography>
      <Table
        words={allWordsResponse.data}
        savedWords={myWordsResponse.data}
        handleDelete={deleteWord}
        handleToggleSaved={(id: string) => {
          if (myWordsResponse.data?.some((word) => word.id === id)) {
            removeFromSavedWords(user.id, id);
          } else {
            addToSavedWords(user.id, id);
          }
        }}
      />
    </PageWrapper>
  );
};
