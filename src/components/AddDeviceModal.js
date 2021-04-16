import React, { useState, useContext } from 'react';
import axios from 'axios';
// import styles from './Login.module.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import StickyFooter from './StickyFooter';
import Alert from '@material-ui/lab/Alert';
import AuthContext from '../store/auth-context';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 360,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '25vh',
    padding: theme.spacing(1),
    textAlign: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginLeft: theme.spacing(1.5),
  },
  alertStyle: {
    marginTop: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  buttonContainerStyle: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2),
  },
  circularProgressStyle: {
    marginTop: theme.spacing(3),
    color: '#C0C0C0',
  },
}));

function AddDevice({ onCancel }) {
  const classes = useStyles();

  const history = useHistory();

  const [deviceName, setDeviceName] = useState('Energy Meter 1');
  const [deviceId, setDeviceId] = useState('E0:152:24:D4');
  const [addDeviceError, setAddDeviceError] = useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const userId = localStorage.getItem('userId', '');

  // const authContext = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    setAddDeviceError(false);
    setOpenBackdrop(true);
    // axios
    //   .post('http://52.15.213.150:5000/api/devices', {
    //     userId: userId,
    //     deviceName: deviceName,
    //     deviceId: deviceId,
    //     timestamp: Date.now(),
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     setAddDeviceError(false);
    //     setOpenBackdrop(false);
    //   })
    //   .catch((error) => {
    //     console.log(error.response.status);
    //     console.log(error.response.data);
    //     setAddDeviceError(true);
    //     setOpenBackdrop(false);
    //   });
  };

  const getDevices = () => {
    axios
      .get('http://52.15.213.150:5000/api/devices', {
        userId: userId,
      })
      .then((response) => {
        console.log(response.data);
        // setAddDeviceError(false);
        // setOpenBackdrop(false);
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.data);
        // setAddDeviceError(true);
        // setOpenBackdrop(false);
      });
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component='h1' variant='h5' color='primary'>
          Add device
        </Typography>
        {addDeviceError && (
          <Alert severity='error' className={classes.alertStyle}>
            Device alreay exists.
          </Alert>
        )}
        <form className={classes.form} onSubmit={submitHandler}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='deviceName'
            label='Device Name'
            name='deviceName'
            type='text'
            autoComplete='deviceName'
            autoFocus
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='deviceId'
            label='Device Id'
            type='text'
            id='deviceId'
            autoComplete='deviceId'
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
          />
          <div className={classes.buttonContainerStyle}>
            <Button
              type='button'
              variant='contained'
              color='textSecondary'
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Add
            </Button>
          </div>
        </form>
        {/* <CircularProgress className={classes.circularProgressStyle} /> */}
      </CardContent>
    </Card>
  );
}

export default AddDevice;
