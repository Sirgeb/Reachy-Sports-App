import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const SignoutModal = ({ open, handleClose }) => {
  const classes = useStyles();
  const handleSignout = () => {
    return null
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Do you really want to sign out?</h2>
            <div className={classes.btnWrapper}>
              <button className="btn modal-button" onClick={handleSignout}>Yes</button>
              <button className="btn modal-button" onClick={handleClose}>No</button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #F58634',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'space-around', 
    alignItems: 'center', 
    width: '80%'
  }
}));

export default SignoutModal;
