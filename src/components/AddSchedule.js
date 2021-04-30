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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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
  formControl: {
    marginLeft: theme.spacing(2),
    minWidth: '30%',
  },
  flexDiv: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const randomSchedularName = 'Schedule ' + Math.floor(Math.random() * 10);

const getHours = () => {
  let hoursArray = [];
  for (let i = 0; i < 24; i++) {
    hoursArray.push(String(i));
  }
  return hoursArray;
};

const getMinutes = () => {
  let minutesArray = [];
  for (let i = 0; i < 60; i++) {
    minutesArray.push(String(i));
  }
  return minutesArray;
};

export default function AddSchedule({ onCancel, onDeviceAdd }) {
  const classes = useStyles();

  const [schedularName, setSchedularName] = useState(randomSchedularName);

  const userId = localStorage.getItem('userId', '');
  const userToken = localStorage.getItem('userToken', '');
  const deviceId = localStorage.getItem('deviceId', '');

  const [schedularAdded, setSchedularAdded] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [sensor, setSensor] = React.useState('');
  const [day, setDay] = React.useState('');
  const [hour, setHour] = React.useState('');
  const [minutes, setMinutes] = React.useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    setSchedularAdded(true);
    setIsLoading(true);
    console.log(userId, userToken, deviceId);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        jwtToken: userToken,
      },
    };
    axios
      .post(
        'http://52.15.213.150:5000/api/devices/schedule/' + deviceId,
        {
          schedularName: schedularName,
          sensor: 'Motor',
          days: [],
          s_time: '063000',
          e_time: '101500',
          state: '0',
        },
        config
      )
      .then((response) => {
        console.log(response.data);
        setSchedularAdded(true);
        setIsLoading(false);
        onCancel();
        onDeviceAdd();
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.data);
        setSchedularAdded(false);
        setIsLoading(false);
      });
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component='h1' variant='h5' color='primary'>
          Add Schedule
        </Typography>
        {!schedularAdded && (
          <Alert severity='error' className={classes.alertStyle}>
            Device alreay exists.
          </Alert>
        )}
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.flexDiv}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='schedularName'
              label='Schedule Name'
              name='schedularName'
              type='text'
              autoComplete='schedularName'
              autoFocus
              value={schedularName}
              onChange={(e) => setSchedularName(e.target.value)}
            />
            <FormControl className={classes.formControl}>
              <InputLabel id='sensor-select-label'>Sensor</InputLabel>
              <Select
                labelId='sensor-select-label'
                id='sensor-select'
                value={sensor}
                onChange={(event) => setSensor(event.target.value)}
              >
                <MenuItem value='motor' selected>
                  Motor
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <Typography color='textSecondary'>Set On Time</Typography>
            <FormControl className={classes.formControl}>
              <InputLabel id='day-select-label'>Day</InputLabel>
              <Select
                labelId='day-select-label'
                id='day-select'
                value={day}
                onChange={(event) => setDay(event.target.value)}
              >
                <MenuItem value='0'>Sun</MenuItem>
                <MenuItem value='1'>Mon</MenuItem>
                <MenuItem value='2'>Tue</MenuItem>
                <MenuItem value='3'>Wed</MenuItem>
                <MenuItem value='4'>Thu</MenuItem>
                <MenuItem value='5'>Fri</MenuItem>
                <MenuItem value='6'>Sat</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id='hour-select-label'>Hour</InputLabel>
              <Select
                labelId='hour-select-label'
                id='hour-select'
                value={hour}
                onChange={(event) => setHour(event.target.value)}
              >
                {getHours().map((element) => (
                  <MenuItem value={element}>{element}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id='minutes-select-label'>Minutes</InputLabel>
              <Select
                labelId='minutes-select-label'
                id='minutes-select'
                value={minutes}
                onChange={(event) => setMinutes(event.target.value)}
              >
                {getMinutes().map((element) => (
                  <MenuItem value={element}>{element}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <Typography color='textSecondary'>Set Off Time</Typography>
            <FormControl className={classes.formControl}>
              <InputLabel id='day-select-label'>Day</InputLabel>
              <Select
                labelId='day-select-label'
                id='day-select'
                value={day}
                onChange={(event) => setDay(event.target.value)}
              >
                <MenuItem value='0'>Sun</MenuItem>
                <MenuItem value='1'>Mon</MenuItem>
                <MenuItem value='2'>Tue</MenuItem>
                <MenuItem value='3'>Wed</MenuItem>
                <MenuItem value='4'>Thu</MenuItem>
                <MenuItem value='5'>Fri</MenuItem>
                <MenuItem value='6'>Sat</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id='hour-select-label'>Hour</InputLabel>
              <Select
                labelId='hour-select-label'
                id='hour-select'
                value={hour}
                onChange={(event) => setHour(event.target.value)}
              >
                {getHours().map((element) => (
                  <MenuItem value={element}>{element}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id='minutes-select-label'>Minutes</InputLabel>
              <Select
                labelId='minutes-select-label'
                id='minutes-select'
                value={minutes}
                onChange={(event) => setMinutes(event.target.value)}
              >
                {getMinutes().map((element) => (
                  <MenuItem value={element}>{element}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {/* <Typography color='textSecondary'>Set Off Time</Typography> */}
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
