import React from "react";
import Link from "next/link";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 100,
    flexGrow: 1,
    minWidth: 300,
  },
  login: {
    color: "purple",
    fontWeight: '800',
    fontSize: "18px",
    cursor: "pointer",
  },
  modal_i: {
    textAlign: "center",
  },

  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const authModal = () => {
  const classes = useStyles();
  const rootRef = React.useRef(null);

  return (
    <div className={classes.root} ref={rootRef}>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        className={classes.modal}
        container={() => rootRef.current}
      >
        <div className={classes.paper}>
          <p id="server-modal-description">You are not authenticated or your session has expired!</p>
          
          <Link href="/admin/login">
          <p className={classes.modal_i}>Please click <span className={classes.login}><u>Here</u></span> to login</p>
          </Link>
        </div>
      </Modal>
    </div>
  );
} 

export default authModal
