import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary'>
      {'Smart Energy Meter © '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    padding: theme.spacing(2, 0),
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Copyright />
    </footer>
  );
}
