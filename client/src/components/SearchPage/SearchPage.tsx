import {
  Button,
  TextField,
  Typography,
  Skeleton,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { createRandomWord, deleteWord, useWords } from "../../hooks/useWords";
import { PageWrapper } from "../PageWrapper/PageWrapper";
import { useState } from "react";
import { useUser } from "../../hooks/useUser";
import {
  addToSavedWords,
  removeFromSavedWords,
  useSavedWords,
} from "../../hooks/useSavedWords";
import { Table } from "../Table";
import { NewWordModal } from "../NewWordModal";

export const SearchPage = () => {
  const { user } = useUser();
  const myWordsResponse = useSavedWords(user.id);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const allWordsResponse = useWords(searchTerm);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchTerm(searchInputValue);
  };

  if (myWordsResponse.error || allWordsResponse.error)
    return <div>failed to load</div>;

  const handleOpenModal = async () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
      {myWordsResponse.isLoading || allWordsResponse.isLoading ? (
        <>
          <Skeleton variant="text" width={210} height={40} />
          <Skeleton variant="rectangular" width="100%" height={118} />
          <Skeleton variant="rectangular" width="100%" height={400} />
        </>
      ) : (
        <>
          <Typography variant="subtitle1" mt={1} mb={3}>
            Didn't find what you were looking for?{" "}
            <Link component="button" onClick={handleOpenModal}>
              Add a new word using AI!{" "}
            </Link>
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
        </>
      )}
      <NewWordModal isModalOpen={isModalOpen} onClose={handleCloseModal} />
    </PageWrapper>
  );
};
