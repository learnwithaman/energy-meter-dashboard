import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('L1 V', 159, 6.0, 24, 4.0),
  createData('L2 V', 237, 9.0, 37, 4.3),
  createData('L3 V', 262, 16.0, 24, 6.0),
  createData('L1 I', 305, 3.7, 67, 4.3),
  createData('L2 I', 356, 16.0, 49, 3.9),
  createData('L3 I', 356, 16.0, 49, 3.9),
  createData('Freq', 356, 16.0, 49, 3.9),
  createData('PR', 356, 16.0, 49, 3.9),
  createData('IGBT Temp', 356, 16.0, 49, 3.9),
  createData('AC kwh Day', 356, 16.0, 49, 3.9),
  createData('DC kwh Day', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} elevation={6}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align='left'>Inv 1</StyledTableCell>
            <StyledTableCell align='left'>Inv 2</StyledTableCell>
            <StyledTableCell align='left'>Inv 2</StyledTableCell>
            <StyledTableCell align='left'>Inv 3</StyledTableCell>
            {/* <StyledTableCell align='right'>L1 V</StyledTableCell>
            <StyledTableCell align='right'>L2 V</StyledTableCell>
            <StyledTableCell align='right'>L3 V</StyledTableCell>
            <StyledTableCell align='right'>L1 I</StyledTableCell>
            <StyledTableCell align='right'>L2 I</StyledTableCell>
            <StyledTableCell align='right'>L3 I</StyledTableCell>
            <StyledTableCell align='right'>Freq</StyledTableCell>
            <StyledTableCell align='right'>PR</StyledTableCell>
            <StyledTableCell align='right'>IGBT Temp</StyledTableCell>
            <StyledTableCell align='right'>AC kwh Day</StyledTableCell>
            <StyledTableCell align='right'>DC kwh Day</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component='th' scope='row'>
                <strong>{row.name}</strong>
              </StyledTableCell>
              <StyledTableCell>{row.calories}</StyledTableCell>
              <StyledTableCell>{row.fat}</StyledTableCell>
              <StyledTableCell>{row.carbs}</StyledTableCell>
              <StyledTableCell>{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
