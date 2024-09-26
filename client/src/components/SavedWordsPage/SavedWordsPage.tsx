import { Grid2 as Grid } from "@mui/material";
import { PageWrapper } from "../PageWrapper/PageWrapper";
import { Flashcard } from "./components/Flashcard";
import { removeFromSavedWords, useSavedWords } from "../../hooks/useSavedWords";
import { DEV_USER_ID } from "../../contants";
import { useUser } from "../../hooks/useUser";

export const SavedWordsPage = () => {
  const myWordsResponse = useSavedWords(DEV_USER_ID);
  const { user } = useUser();

  if (myWordsResponse.error) return <div>failed to load</div>;
  if (myWordsResponse.isLoading) return <div>loading...</div>;

  return (
    <PageWrapper pageTitle="Saved words">
      <Grid container spacing={2}>
        {myWordsResponse.data?.map((word) => (
          <Grid size={3} key={word.id}>
            <Flashcard
              word={word}
              removeFromSavedWords={() => {
                removeFromSavedWords(user.id, word.id);
              }}
            />
          </Grid>
        ))}
      </Grid>
    </PageWrapper>
  );
};
