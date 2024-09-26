import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Word } from "../../types";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, Snackbar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";

export type Props = {
  words?: Word[];
  savedWords?: Word[];
  handleDelete: (id: string) => void;
  handleToggleSaved: (id: string) => void;
};
export const Table = ({
  words = [],
  savedWords = [],
  handleDelete,
  handleToggleSaved,
}: Props) => {
  const [openSnackbar, setOpenSnackBar] = useState(false);

  const columns: GridColDef[] = [
    {
      field: "clipboard",
      headerName: "ID",
      sortable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      width: 70,
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            navigator.clipboard.writeText(params.id.toString());
            setOpenSnackBar(true);
          }}
        >
          <ContentCopyIcon />
        </IconButton>
      ),
    },
    {
      field: "article",
      headerName: "Article",
      sortable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      width: 70,
    },
    {
      field: "word",
      headerName: "Word",
      sortable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      width: 150,
    },
    {
      field: "syllables",
      headerName: "Syllables",
      sortable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      width: 150,
    },
    {
      field: "example",
      headerName: "Example Sentence",
      sortable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "translation",
      sortable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      headerName: "Translation",
      width: 150,
    },
    {
      field: "type",
      headerName: "Type",
      sortable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      description: "The type of the word (noun, verb, etc.)",
      width: 100,
    },
    {
      field: "saved",
      headerName: "Saved",
      sortable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      width: 60,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleToggleSaved(params.id.toLocaleString())}
        >
          {savedWords.some((word) => word.id === params.id.toString()) ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      ),
    },
    {
      field: "actions",
      headerName: "Delete",
      sortable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      width: 65,
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            handleDelete(params.id.toString());
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <DataGrid
        rows={words}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        message="ID copied to clipboard."
        onClose={() => setOpenSnackBar(false)}
      />
    </>
  );
};
