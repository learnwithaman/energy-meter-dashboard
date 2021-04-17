import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    padding: theme.spacing(0.5, 0.5, 0, 0.5),
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

function AddDevice({ onCancel, onDeviceAdd }) {
  const classes = useStyles();

  const deviceNameNum = Math.floor(Math.random() * 100);
  const deviceIdNum1 = deviceNameNum;
  const deviceIdNum2 = Math.floor(Math.random() * 10);

  const deviceNamePlaceholder = 'Energy Meter ' + deviceNameNum;
  const deviceIdPlaceholder = 'E0:152:' + deviceIdNum1 + ':D' + deviceIdNum2;

  const [deviceName, setDeviceName] = useState(deviceNamePlaceholder);
  const [deviceId, setDeviceId] = useState(deviceIdPlaceholder);

  const userId = localStorage.getItem('userId', '');
  const userToken = localStorage.getItem('userToken', '');

  const [deviceAdded, setDeviceAdded] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setDeviceAdded(true);
    setIsLoading(true);
    console.log(userId, userToken, deviceId, deviceName);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        jwtToken: userToken,
      },
    };
    axios
      .post(
        'http://52.15.213.150:5000/api/devices',
        {
          userId: userId,
          deviceName: deviceName,
          deviceId: deviceId,
          timestamp: Date.now(),
        },
        config
      )
      .then((response) => {
        console.log(response.data);
        setDeviceAdded(true);
        setIsLoading(false);
        onCancel();
        onDeviceAdd();
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.data);
        setDeviceAdded(false);
        setIsLoading(false);
      });
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component='h1' variant='h5' color='primary'>
          Add device
        </Typography>
        {!deviceAdded && (
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
          {isLoading ? (
            <CircularProgress className={classes.circularProgressStyle} />
          ) : (
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
          )}
        </form>
      </CardContent>
    </Card>
  );
}

export default AddDevice;
