import {
  Box,
  Button,
  Card,
  CardContent,
  Tooltip,
  Typography,
} from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import NotInterestedIcon from "@mui/icons-material/NotInterested";

import { Word } from "../../../../types";
import { SyllablesSeparatedByDots } from "./components/SyllablesSeparatedByDots";
import { Article } from "./components/Article";

export type Props = {
  word: Word;
  removeFromSavedWords: () => void;
};

export const Flashcard = ({ word, removeFromSavedWords }: Props) => {
  return (
    <Card
      sx={{
        height: 215,
        backgroundColor: "white",
        pointerEvents: "auto",
        opacity: 1,
      }}
      variant="outlined"
    >
      <CardContent>
        <SyllablesSeparatedByDots syllables={word.syllables.split("|")} />
        <Box sx={{ display: "flex", mb: 1 }}>
          <Article article={word.article} />
          <Typography variant="h5" component="div" sx={{ marginLeft: 1 }}>
            {word.word}
          </Typography>
          <Tooltip title={word.translation} arrow>
            <TranslateIcon fontSize="small" style={{ color: "grey" }} />
          </Tooltip>
        </Box>
        <Box sx={{ height: 50, mt: 2, mb: 2 }}>
          <Typography variant="body2">{word.example}</Typography>
        </Box>
        <Button
          variant="contained"
          color={"error"}
          startIcon={<NotInterestedIcon />}
          fullWidth
          size="small"
          onClick={removeFromSavedWords}
        >
          Remove from My Words
        </Button>
      </CardContent>
    </Card>
  );
};
