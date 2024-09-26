import { Typography } from "@mui/material";
import { ARTICLE_COLORS } from "../../../../../../contants";

export const Article = ({ article }: { article: string }) => {
  let color = ARTICLE_COLORS.DER;

  if (article.toUpperCase() === "DAS") {
    color = ARTICLE_COLORS.DAS;
  } else if (article.toUpperCase() === "DIE") {
    color = ARTICLE_COLORS.DIE;
  }

  return (
    <Typography variant="h5" component="div" style={{ color }}>
      {article}
    </Typography>
  );
};
