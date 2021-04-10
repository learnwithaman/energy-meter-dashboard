import React from 'react'
import { makeStyles, AppBar, Toolbar, Typography, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Energy Meter Dashboard
        </Typography>
        <Button color="inherit">Register</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
