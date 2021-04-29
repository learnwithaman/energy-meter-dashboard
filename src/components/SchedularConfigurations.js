import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  // scheduleIconParent: {
  //   marginLeft: theme.spacing(3),
  //   backgroundColor: '#4caf50',
  //   width: 'max-content',
  //   padding: theme.spacing(1, 1, 0.25, 1),
  // },
  // scheduleIcon: {
  //   color: '#fff',
  // },
  table: {
    outline: 'none',
  },
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    marginRight: theme.spacing(10),
    marginBottom: theme.spacing(10),
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
];

function SchedularConfigurations() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Paper className={classes.scheduleIconParent} elevation={6}>
        <ScheduleIcon className={classes.scheduleIcon} fontSize='large' />
      </Paper> */}
      <Typography variant='subtitle1' color='textSecondary' gutterBottom>
        Manage Weekly Automation Schedules
      </Typography>
      <TableContainer component={Paper} elevation={4}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align='right'>Sensor</TableCell>
              <TableCell align='right'>Time</TableCell>
              <TableCell align='right'>Repeat</TableCell>
              <TableCell align='right'>State</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell>1</TableCell>
                <TableCell>Schedular Name 1</TableCell>
                <TableCell align='right'>Motor</TableCell>
                <TableCell align='right'>18:00 - 20:00</TableCell>
                <TableCell align='right'>Box</TableCell>
                <TableCell align='right'>Off</TableCell>
                <TableCell align='right'>Actions</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab color='primary' aria-label='add' className={classes.fab}>
        <AddIcon />
      </Fab>
    </div>
  );
}

export default SchedularConfigurations;
