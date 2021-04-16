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
import StickyFooter from '../components/StickyFooter';
import Alert from '@material-ui/lab/Alert';
import AuthContext from '../store/auth-context';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  alertStyle: {
    marginTop: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function LoginPage() {
  const classes = useStyles();

  const history = useHistory();

  const [email, setEmail] = useState('learnwithaman@gmail.com');
  const [password, setPassword] = useState('abcd@1234');
  const [loginError, setLoginError] = useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  // const authContext = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoginError(false);
    setOpenBackdrop(true);
    axios
      .post('http://52.15.213.150:5000/api/users/login', {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('token', response.data.jwtToken);
        localStorage.setItem(
          'username',
          response.data.userDetails.firstname +
            ' ' +
            response.data.userDetails.lastname
        );
        localStorage.setItem('userId', response.data.userDetails.id);
        setLoginError(false);
        setOpenBackdrop(false);
        history.replace('/');
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.data);
        setLoginError(true);
        setOpenBackdrop(false);
      });
  };

  const replaceWithSignup = (e) => {
    e.preventDefault();
    history.replace('/signup');
  };

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          {loginError && (
            <Alert severity='error' className={classes.alertStyle}>
              Wrong email or password is entered.
            </Alert>
          )}
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
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
}

export default LoginPage;
