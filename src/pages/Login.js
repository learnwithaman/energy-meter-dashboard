import React, { useState, useRef, useEffect } from 'react';
// import styles from './Login.module.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import StickyFooter from '../components/StickyFooter';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginPage() {
  const classes = useStyles();

  const history = useHistory();

  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('abcd@1234');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email, password);
    history.replace('/');
  };

  const replaceWithSignup = (e) => {
    e.preventDefault();
    history.replace('/signup');
  };

  return (
    <>
      <Container component='main' maxWidth='xs'>
        {/* <CssBaseline /> */}
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={submitHandler}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              type='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link variant='body2' onClick={replaceWithSignup}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <StickyFooter />
    </>
  );
}

export default LoginPage;
