//mui
import { Button, Typography } from "@mui/material";

export function HText({ children, link }) {
  const openLink = () => {
    window.open(link, "__blank");
  };

  return (
    <Button onClick={openLink}>
      <Typography variant="h4" color="text.main">
        {children}
      </Typography>
    </Button>
  );
}

export function SecText({ children }) {
  return (
    <Typography variant="overline" color="text.secondary">
      {children}
    </Typography>
  );
}

function InterActiveText({ children, action }) {
  return (
    <Typography
      onClick={action}
      sx={{ cursor: "pointer" }}
      variant="subtitle2"
      color="text.secondary"
    >
      {children}
    </Typography>
  );
}
