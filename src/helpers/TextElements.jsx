//react
import { useState, Fragment } from "react";
//mui
import {
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { AdsClick, Map } from "@mui/icons-material";

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

function LongText({ children }) {
  const [full, setFull] = useState(false);
  const handleClose = () => {
    setFull(false);
  };

  return (
    <Fragment>
      <InterActiveText action={() => setFull(true)}>
        Info
        <AdsClick fontSize="small" />
      </InterActiveText>

      <Dialog
        open={full}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
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
