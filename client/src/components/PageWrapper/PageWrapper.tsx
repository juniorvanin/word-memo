import { Box, Typography, Button, Container } from "@mui/material";
import React from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../contants";

type Props = {
  pageTitle: string;
};

export const PageWrapper = (props: React.PropsWithChildren<Props>) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingY: 2,
            borderBottomColor: "black",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 1,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            WORD
          </Typography>
          <MenuBookIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, mb: 0.5 }}
          />

          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MEMO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => navigate(APP_ROUTES.SEARCH)}
              sx={{ my: 2, color: "black", display: "block" }}
            >
              Search
            </Button>
            <Button
              onClick={() => navigate(APP_ROUTES.SAVED_WORDS)}
              sx={{ my: 2, color: "black", display: "block" }}
            >
              SAVED Words
            </Button>
          </Box>
        </Box>
      </Container>

      <Box sx={{ backgroundColor: "black", height: 5 }}></Box>
      <Container sx={{ mt: 5 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {props.pageTitle}
        </Typography>
        {props.children}
      </Container>
    </Box>
  );
};
