import { Collapse, Alert, Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AlertNotification = ({
  openAlert,
  setOpenAlert,
  severity,
  styles,
  message,
}) => {
  return (
    <Collapse in={openAlert}>
      <Alert
        severity={severity}
        sx={styles}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => setOpenAlert(false)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Collapse>
  );
};

const SnackbarNotification = ({
  openSnackbar,
  setOpenSnackbar,
  severity,
  message,
}) => {
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={5000}
      onClose={() => setOpenSnackbar(false)}
    >
      <Alert
        onClose={() => setOpenSnackbar(false)}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export { AlertNotification, SnackbarNotification };
