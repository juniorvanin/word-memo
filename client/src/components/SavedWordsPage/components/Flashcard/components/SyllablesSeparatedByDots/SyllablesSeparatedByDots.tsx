import React from "react";
import { Box, Typography } from "@mui/material";

const Dot = () => (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export const SyllablesSeparatedByDots = ({
  syllables,
}: {
  syllables: string[];
}) => (
  <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
    {syllables.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < syllables.length - 1 && <Dot />}
      </React.Fragment>
    ))}
  </Typography>
);
