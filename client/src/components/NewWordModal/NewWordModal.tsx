import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  Skeleton,
} from "@mui/material";
import { Word } from "../../types";
import { useEffect, useState } from "react";
import { createRandomWord } from "../../hooks/useWords";

export type Props = {
  isModalOpen: boolean;
  onClose: () => void;
};
export const NewWordModal = ({ isModalOpen, onClose }: Props) => {
  const [newWord, setNewWord] = useState<Word | null>(null);

  useEffect(() => {
    const fetchWord = async () => {
      if (isModalOpen) {
        const word = await createRandomWord();
        setNewWord(word);
      }
    };

    if (!isModalOpen) {
      setNewWord(null);
    }

    fetchWord();
  }, [isModalOpen]);

  return (
    <Dialog
      open={isModalOpen}
      onClose={() => {
        onClose();
      }}
    >
      <DialogTitle>
        {" "}
        {newWord
          ? "New word created!"
          : "A random word is being created..."}{" "}
      </DialogTitle>
      <DialogContent>
        {newWord ? (
          <div>
            <Typography>
              <strong>Word:</strong> {newWord.article} {newWord.word}
            </Typography>
            <Typography>
              <strong>Syllables:</strong> {newWord.syllables}
            </Typography>
            <Typography>
              <strong>Example:</strong> {newWord.example}
            </Typography>
            <Typography>
              <strong>Translation:</strong> {newWord.translation}
            </Typography>
            <Typography>
              <strong>Type:</strong> {newWord.type}
            </Typography>
          </div>
        ) : (
          <div>
            <Skeleton variant="text" width={100} height={30} />
            <Skeleton variant="text" width={200} height={30} />
            <Skeleton variant="text" width={150} height={30} />
            <Skeleton variant="text" width={250} height={30} />
            <Skeleton variant="text" width={180} height={30} />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
