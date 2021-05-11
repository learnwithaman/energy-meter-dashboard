import 'date-fns';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useHistory, useLocation } from 'react-router-dom';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { TextField } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AppsIcon from '@material-ui/icons/Apps';
import CircularProgress from '@material-ui/core/CircularProgress';
import GaugeChart from 'react-gauge-chart';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ReactSpeedomter from 'react-d3-speedometer';
// import Thermometer from 'react-thermometer-chart';
import Compass from '../components/Compass';
import Thermometer from 'react-thermometer-component';
import BiaxialLineChart from '../components/BiaxialLineChart';
import BlockTable from '../components/BlockTable';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { CSVLink, CSVDownload } from 'react-csv';
import DescriptionIcon from '@material-ui/icons/Description';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CardActions from '@material-ui/core/CardActions';
import Alert from '@material-ui/lab/Alert';
import WarningIcon from '@material-ui/icons/Warning';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(12),
    paddingLeft: theme.spacing(6),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  gridContainer: {
    marginTop: theme.spacing(3),
  },
  sectionDesktop: {
    // display: 'none',
    // [theme.breakpoints.up('md')]: {
    //   display: 'flex',
    // },
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  expandMoreIconButtonStyle: {
    marginLeft: theme.spacing(0.5),
  },
  userNotificationIconButtonStyle: {
    marginRight: theme.spacing(2),
  },
  companyNameStyle: {
    marginRight: 'auto',
    marginLeft: theme.spacing(2),
  },
  gaugeChartStyle: {
    marginTop: theme.spacing(12),
  },
  cardGridContainerStyle: {
    width: '100%',
    marginTop: theme.spacing(5),
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(4),
  },
  card: {
    height: 80,
  },
  chartGridContainerStyle: {
    marginLeft: theme.spacing(0.5),
    marginTop: theme.spacing(6.5),
  },
  formControl: {
    minWidth: 120,
  },
  modalCardStyle: {
    width: 260,
    height: 'fit-content',
  },
}));

function Dashboard(props) {
  const classes = useStyles();
  const theme = useTheme();

  const history = useHistory();
  const location = useLocation();
  const serverUrl = 'http://10.10.0.102:5000/api/';

  const username = localStorage.getItem('username', 'Admin');
  const userToken = localStorage.getItem('userToken');
  const userId = localStorage.getItem('userId');

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openAccountMenu = Boolean(anchorEl);

  // Status and Time states
  const [status, setStatus] = useState(0);
  const [timestamp, setTimestamp] = useState(undefined);

  // totalExport state
  const [totalExport, setTotalExport] = useState(0);
  const [gaugePercent, setGaugePercent] = useState(0);

  // temperatures states (ambient and module)
  const [ambientTemp, setAmbientTemp] = useState(0);
  const [moduleTemp, setModuleTemp] = useState(0);

  // wind direction and speed states
  const [windDirection, setWindDirection] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);

  // irradiance / generation data
  const [irradianceGenerationData, setIrradianceGenerationData] = useState([
    {
      time: '00:00',
      gti: '0.00',
      ghi: '0.00',
      pg: '0.00',
    },
  ]);

  // block select button state
  const [block, setBlock] = React.useState(1);

  // arrayOfObjects from Inverter Values
  const [arrayOfObjects, setArrayOfObjects] = useState([]);

  // cards/ boxes states (generation, revenue, peak power, plant pr, and grid availability)
  const [cardsValues, setCardsValues] = useState({});

  // downloadExcelModal states
  const [openDownloadExcelModal, setOpenDownloadExcelModal] = useState(false);

  // From and To dates for Excel
  const [excelFromDate, setExcelFromDate] = useState(
    new Date('2021-01-01T00:00:00')
  );
  const [excelToDate, setExcelToDate] = useState(Date.now());

  // Show or hide download excel alert
  const [displayDownloadExcelAlert, setDisplayDownloadExcelAlert] = useState(
    false
  );

  // useEffect for jwtTokens
  useEffect(() => {
    console.log('useEffect for userToken');

    if (!userToken || userToken === '') {
      history.push('/login');
    }

    console.log(userToken);
  }, []);

  // useEffect for status and time
  useEffect(() => {
    console.log('useEffect for status and time');

    getStatusAndTime();

    // Fetch data every 5.5 seconds
    const interval = setInterval(getStatusAndTime, 5500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // useEffect for totalExport
  useEffect(() => {
    console.log('useEffect for totalExport');

    getTotalExport();

    // Fetch data every 5.5 seconds
    const interval = setInterval(getTotalExport, 5500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // useEffect for temperatures (ambient and module)
  useEffect(() => {
    console.log('useEffect for temperatures (ambient and module)');

    getTemperatures();

    // Fetch data every 10 seconds
    const interval = setInterval(getTemperatures, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // useEffect for wind direction and speed
  useEffect(() => {
    console.log('useEffect for wind direction and speed');

    getWindDirectionAndSpeed();

    // Fetch data every 10 seconds
    const interval = setInterval(getWindDirectionAndSpeed, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // useEffect for wind direction and speed
  useEffect(() => {
    console.log('useEffect for wind direction and speed');

    getIrradianceGenerationData();

    // Fetch data every 10 minutes
    const interval = setInterval(getIrradianceGenerationData, 60 * 1000 * 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // useEffect for inverter values
  useEffect(() => {
    console.log('useEffect for inverter values');

    getInverterValues(1);
  }, []);

  // useEffect for cards/ boxes
  useEffect(() => {
    console.log('useEffect for cards/ boxes running');

    getCardsValues();

    // Fetch data every 10 minutes
    const interval = setInterval(getCardsValues, 60 * 1000 * 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getCardsValues = () => {
    console.log('getCardsValues function called');
    axios
      .get(serverUrl + 'boxes', {
        headers: {
          jwtToken: userToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCardsValues(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getInverterValues = (block) => {
    console.log('getInverterValues function called');
    axios
      .get(serverUrl + 'grid/' + 'B0' + block, {
        headers: {
          jwtToken: userToken,
        },
      })
      .then((response) => {
        console.log('block' + 'B0' + block + ':', response.data);
        // format the data
        formatInverterValues(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formatInverterValues = (data) => {
    let arrayOfObjectsX = [];

    let arrayFromObject = Object.entries(data);

    const heading = [
      'L1 V',
      'L2 V',
      'L3 V',
      'L1 I',
      'L2 I',
      'L3 I',
      'Freq',
      'PR',
      'IGBT Temp',
      'AC kwh Day',
      'DC kwh Day',
    ];

    for (let i = 0; i < 11; i++) {
      arrayOfObjectsX.push({
        heading: heading[i],
        inv1: arrayFromObject[i][1],
        inv2: arrayFromObject[i + 11][1],
        inv3: arrayFromObject[i + 22][1],
        inv4: arrayFromObject[i + 33][1],
      });
    }

    console.log(arrayOfObjectsX);

    setArrayOfObjects([...arrayOfObjectsX]);
    console.log(arrayOfObjects);
  };

  const getIrradianceGenerationData = () => {
    console.log('getIrradianceGenerationData function called');
    axios
      .get(serverUrl + 'graph', {
        headers: {
          jwtToken: userToken,
        },
      })
      .then((response) => {
        console.log('i/g data: ', response.data);
        setIrradianceGenerationData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getWindDirectionAndSpeed = () => {
    console.log('getWindDirectionAndSpeed function called');
    axios
      .get(serverUrl + 'wind', {
        headers: {
          jwtToken: userToken,
        },
      })
      .then((response) => {
        console.log('wind: ', response.data);
        const windDirectionStr = response.data.direction;
        const windSpeedStr = response.data.speed;
        console.log(windDirectionStr, windSpeedStr);
        setWindDirection(Number(windDirectionStr).toFixed(0));
        setWindSpeed(Number(windSpeedStr).toFixed(1));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTemperatures = () => {
    console.log('getTemperatures function called');
    axios
      .get(serverUrl + 'temperature', {
        headers: {
          jwtToken: userToken,
        },
      })
      .then((response) => {
        console.log('temperatures: ', response.data);
        const ambientTempStr = response.data.ambientTemp;
        const moduleTempStr = response.data.moduleTemp;
        console.log(ambientTempStr);
        setAmbientTemp(Number(ambientTempStr).toFixed(1));
        setModuleTemp(Number(moduleTempStr).toFixed(1));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTotalExport = () => {
    console.log('getTotalExport function called');
    axios
      .get(serverUrl + 'gauge', {
        headers: {
          jwtToken: userToken,
        },
      })
      .then((response) => {
        console.log('totalExport: ', response.data.value);
        const value = response.data.value;
        setTotalExport(Number(value).toFixed(1));
        // Dividing by 50 because upper limit is 50 MW
        setGaugePercent(Number(value).toFixed(1) / 50);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getStatusAndTime = () => {
    console.log('getStatusAndTime function called');
    axios
      .get(serverUrl + 'site', {
        headers: {
          jwtToken: userToken,
        },
      })
      .then((response) => {
        console.log('status: ', response.data.status);
        console.log('time: ', response.data.time);
        setStatus(response.data.status);
        setTimestamp(response.data.time * 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFormattedRevenue = (revenue) => {
    const revenueNum = Number(revenue).toFixed(0);
    const revenueStr = revenueNum;
    let lastThree = revenueStr.substring(revenueStr.length - 3);
    let otherNumbers = revenueStr.substring(0, revenueStr.length - 3);
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
    return res;
  };

  const handleBlockChange = (event) => {
    setBlock(event.target.value);
    getInverterValues(event.target.value);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    history.replace('/login');
  };

  const getDateAndTimeString = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const handleSideMenuClick = (index) => {
    if (index === 1) {
      setOpenDownloadExcelModal(true);
      compareExcelDates(excelFromDate, excelToDate);
    }
  };

  const handleDownloadExcelModalClose = () => {
    setOpenDownloadExcelModal(false);
  };

  const handleExcelFromDate = (date) => {
    console.log(date);
    setExcelFromDate(date);
  };

  const handleExcelToDate = (date) => {
    console.log(date);
    setExcelToDate(date);
  };

  const handleDownloadExcelButtonClick = () => {
    let state = compareExcelDates(excelFromDate, excelToDate);

    try {
      setDisplayDownloadExcelAlert(state);
    } finally {
      getExcelFile();
    }
  };

  const getExcelFile = () => {
    console.log('getExcelFile function called...');
  };

  const compareExcelDates = (from, to) => {
    let fromDate = new Date(from).getTime();
    let toDate = new Date(to).getTime();

    let differenceInTime = toDate - fromDate;

    console.log(differenceInTime);

    if (differenceInTime >= 0) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className={classes.root}>
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: openDrawer,
            })}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.grow} style={{ textAlign: 'center' }}>
            <Typography variant='h6' noWrap>
              ACME CMS
            </Typography>
          </div>
          <div className={classes.sectionDesktop}>
            <div>
              <Grid
                container
                direction='row'
                justify='center'
                alignItems='center'
              >
                <Typography>{username}</Typography>
                <IconButton
                  edge='end'
                  aria-label='expand more icon button'
                  color='inherit'
                  onClick={handleMenu}
                  size='small'
                  className={classes.expandMoreIconButtonStyle}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Grid>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openAccountMenu}
                onClose={handleClose}
              >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </Menu>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: openDrawer,
          [classes.drawerClose]: !openDrawer,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: openDrawer,
            [classes.drawerClose]: !openDrawer,
          }),
        }}
      >
        <div className={classes.toolbar}>
          {/* <AppsIcon /> */}
          <Typography className={classes.companyNameStyle}>CMS</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Dashboard', 'Download Excel'].map((text, index) => (
            <ListItem
              button
              key={text}
              selected={index === 0}
              onClick={() => {
                handleSideMenuClick(index);
              }}
            >
              <ListItemIcon>
                {index === 0 && <DashboardIcon />}
                {index === 1 && <DescriptionIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <main className={classes.content}>
        <Grid
          container
          alignItems='center'
          spacing={4}
          style={{ paddingLeft: '.25rem', paddingRight: '2rem' }}
        >
          <Grid item>
            <span style={{ fontSize: '1.25rem' }}>Chhattisgarh</span>
          </Grid>
          <Grid item>
            <span style={{ fontSize: '1.25rem' }}>30 MW</span>
          </Grid>
          <Grid item className={classes.grow} />
          <Grid item>
            {status === 0 ? (
              <span style={{ fontSize: '1rem', color: '#f44336' }}>
                Offline
              </span>
            ) : (
              <span style={{ fontSize: '1rem', color: '#4caf50' }}>Online</span>
            )}
          </Grid>
          <Grid item>
            {timestamp === undefined ? (
              <CircularProgress
                size='1.5rem'
                style={{ marginRight: '.5rem' }}
              />
            ) : (
              <span style={{ fontSize: '1rem' }}>
                {getDateAndTimeString(timestamp)}
              </span>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          className={classes.cardGridContainerStyle}
          justify='space-between'
          alignItems='center'
        >
          <Grid item>
            <Card className={classes.card} elevation={4}>
              <CardContent
                style={{
                  paddingTop: '.5rem',
                  paddingRight: '1rem',
                  paddingBottom: '.5rem',
                  paddingLeft: '1rem',
                }}
              >
                <Grid
                  container
                  style={{ paddingTop: '.1rem' }}
                  alignItems='center'
                  spacing={2}
                >
                  <Grid item>
                    <img
                      src='/static/images/powerGeneration.png'
                      alt='power'
                      style={{ width: 56, height: 56 }}
                    />
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Typography>Power Generation</Typography>
                    </Grid>
                    <Grid container justify='flex-end'>
                      <Grid item>
                        <Typography color='primary'>
                          {Number(cardsValues.day_generation).toFixed(2)} KWH
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card} elevation={4}>
              <CardContent
                style={{
                  paddingTop: '.5rem',
                  paddingRight: '1rem',
                  paddingBottom: '.5rem',
                  paddingLeft: '1rem',
                  height: 'inherit',
                }}
              >
                <Grid
                  container
                  style={{ paddingTop: '.5rem' }}
                  alignItems='center'
                  spacing={1}
                >
                  <Grid item>
                    <img
                      src='/static/images/revenue.png'
                      alt='power'
                      style={{ height: 44 }}
                    />
                  </Grid>
                  <Grid item>
                    <Grid container justify='flex-end'>
                      <Typography>Revenue</Typography>
                    </Grid>
                    <Grid container justify='flex-end'>
                      <Grid item>
                        <Typography color='primary'>
                          ₹{' '}
                          {getFormattedRevenue(
                            cardsValues.day_generation * 6.46
                          )}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card} elevation={4}>
              <CardContent
                style={{
                  paddingTop: '.5rem',
                  paddingRight: '1rem',
                  paddingBottom: '.5rem',
                  paddingLeft: '1rem',
                }}
              >
                <Grid
                  container
                  style={{ paddingTop: '.25rem' }}
                  alignItems='center'
                  spacing={1}
                >
                  <Grid item>
                    <img
                      src='/static/images/peakPower.png'
                      alt='power'
                      style={{ width: 52, height: 52 }}
                    />
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Typography>Peak Power</Typography>
                    </Grid>
                    <Grid container justify='flex-end'>
                      <Grid item>
                        <Typography color='primary'>
                          {Number(cardsValues.peak_power).toFixed(2)} MW
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card} elevation={4}>
              <CardContent
                style={{
                  paddingTop: '.5rem',
                  paddingRight: '1rem',
                  paddingBottom: '.5rem',
                  paddingLeft: '1rem',
                }}
              >
                <Grid container alignItems='center' spacing={1}>
                  <Grid item>
                    <img
                      src='/static/images/plantPR.png'
                      alt='power'
                      style={{ height: 60 }}
                    />
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Typography>Plant PR</Typography>
                    </Grid>
                    <Grid container justify='flex-end'>
                      <Grid item>
                        <Typography color='primary'>
                          {Number(cardsValues.plant_pr).toFixed(2)}%
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card} elevation={4}>
              <CardContent
                style={{
                  paddingTop: '.5rem',
                  paddingRight: '1rem',
                  paddingBottom: '.5rem',
                  paddingLeft: '1rem',
                }}
              >
                <Grid container alignItems='center' spacing={2}>
                  <Grid item>
                    <img
                      src='/static/images/gridAvailability.png'
                      alt='power'
                      style={{ width: 60, height: 60 }}
                    />
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Typography>Grid Availability</Typography>
                    </Grid>
                    <Grid container justify='flex-end'>
                      <Grid item>
                        <Typography color='primary'>
                          {Number(cardsValues.grid_availability).toFixed(0)}%
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid
          container
          className={classes.chartGridContainerStyle}
          direction='row'
          justify='space-between'
          alignItems='flex-start'
          style={{ paddingRight: '2.5rem' }}
        >
          <Grid item>
            <Card
              elevation={6}
              style={{ height: '310px', width: 'max-content' }}
            >
              <CardContent>
                <Typography
                  variant='h6'
                  color='textSecondary'
                  style={{ marginLeft: '0.75rem', marginBottom: '1rem' }}
                >
                  Power Generation
                </Typography>
                {/* <GaugeChart
                  id='gauge-chart1'
                  marginInPercent={0.02}
                  nrOfLevels={25}
                  colors={['#ffeb3b', '#ff9100']}
                  textColor='#5393ff'
                  needleColor='#757575'
                  needleBaseColor='#757575'
                  arcWidth={0.3}
                  percent={gaugePercent}
                  formatTextValue={value =>  `${totalExport} MW`} /> */}
                <ReactSpeedomter
                  minValue={0}
                  maxValue={50}
                  value={totalExport}
                  startColor='#91ff35'
                  endColor='#4caf50'
                  width={400}
                  currentValueText={`${totalExport} MW`}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card
              elevation={6}
              style={{
                height: '310px',
                paddingLeft: '1rem',
                paddingRight: '1rem',
              }}
            >
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item>
                    <Typography
                      align='center'
                      style={{ marginBottom: '.75rem' }}
                    >
                      Ambient
                    </Typography>
                    <Thermometer
                      theme='light'
                      value={String(ambientTemp)}
                      max='75'
                      steps='5'
                      format='°C'
                      height='210'
                    />
                    <Typography align='center' style={{ marginTop: '.75rem' }}>
                      {String(ambientTemp)}°C
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      align='center'
                      style={{ marginBottom: '.75rem' }}
                    >
                      Module
                    </Typography>
                    <Thermometer
                      theme='light'
                      value={String(moduleTemp)}
                      max='75'
                      steps='5'
                      format='°C'
                      height='210'
                    />
                    <Typography align='center' style={{ marginTop: '.75rem' }}>
                      {String(moduleTemp)}°C
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card
              elevation={6}
              style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
            >
              <CardContent>
                <Typography align='center' style={{ marginBottom: '1.5rem' }}>
                  Wind <strong>direction</strong> and{' '}
                  <span style={{ color: 'blue' }}>speed</span>
                </Typography>
                <div style={{ textAlign: 'center' }}>
                  <Compass size={165} rotate={windDirection} />
                </div>
                <Typography align='center' style={{ marginTop: '1.5rem' }}>
                  <strong>{String(windDirection)}°</strong>
                  <span style={{ marginLeft: '1rem', color: 'blue' }}>
                    {String(windSpeed)} m/s
                  </span>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid
          container
          style={{
            marginTop: '3.5rem',
            marginBottom: '2rem',
            paddingRight: '2.5rem',
          }}
          className={classes.grow}
        >
          <Grid item style={{ width: '100%', height: '80vh' }}>
            <Card elevation={6} style={{ width: '100%', height: '100%' }}>
              <CardContent style={{ width: '100%', height: '100%' }}>
                <Typography
                  variant='h6'
                  color='textSecondary'
                  style={{
                    marginLeft: '2rem',
                    marginTop: '.5rem',
                    marginBottom: '2rem',
                  }}
                >
                  Irradiance / Generation
                </Typography>
                <div style={{ width: '100%', height: '85%' }}>
                  <BiaxialLineChart
                    width={600}
                    height={300}
                    data={irradianceGenerationData}
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid
          container
          style={{
            marginTop: '3rem',
            marginBottom: '4rem',
            paddingRight: '2.5rem',
          }}
        >
          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              alignItems='center'
              style={{ marginBottom: '.5rem' }}
            >
              <Grid item>
                <Typography variant='h6' color='textSecondary'>
                  Inverter Values
                </Typography>
              </Grid>
              <Grid item className={classes.grow} />
              <Grid item>
                <Typography style={{ marginLeft: '.25rem' }}>
                  Selected Block:{' '}
                </Typography>
              </Grid>
              <Grid item>
                <FormControl className={classes.formControl}>
                  <Select value={block} onChange={handleBlockChange}>
                    <MenuItem value={1}>BO1</MenuItem>
                    <MenuItem value={2}>B02</MenuItem>
                    <MenuItem value={3}>B03</MenuItem>
                    <MenuItem value={4}>B04</MenuItem>
                    <MenuItem value={5}>B05</MenuItem>
                    <MenuItem value={6}>B06</MenuItem>
                    <MenuItem value={7}>B07</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* <Grid item>
                <Button variant='outlined'>
                  <CSVLink
                    filename={'my-file.csv'}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    data={[]}
                  >
                    Download CSV
                  </CSVLink>
                </Button>
              </Grid> */}
            </Grid>
            <BlockTable values={arrayOfObjects} />
          </Grid>
        </Grid>
      </main>

      <noscript>Download Excel file modal</noscript>
      <Modal
        open={openDownloadExcelModal}
        onClose={handleDownloadExcelModalClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '12rem',
        }}
      >
        <Card
          className={classes.modalCardStyle}
          style={{ textAlign: 'center', paddingBottom: '1.5rem' }}
        >
          <CardContent>
            <Typography variant='h6' color='primary'>
              Excel File
            </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                style={{ width: '80%' }}
                disableToolbar
                variant='inline'
                format='dd/MM/yyyy'
                margin='normal'
                id='from-date-picker-inline'
                label='From'
                value={excelFromDate}
                onChange={handleExcelFromDate}
                autoOk={true}
              />
              <KeyboardDatePicker
                style={{ width: '80%' }}
                disableToolbar
                variant='inline'
                format='dd/MM/yyyy'
                margin='normal'
                id='from-date-picker-inline'
                label='To'
                value={excelToDate}
                onChange={handleExcelToDate}
                autoOk={true}
              />
            </MuiPickersUtilsProvider>
          </CardContent>
          <Button
            variant='outlined'
            color='primary'
            onClick={handleDownloadExcelButtonClick}
          >
            Download
          </Button>
          {displayDownloadExcelAlert && (
            <div
              style={{
                marginTop: '1.25rem',
              }}
            >
              <span style={{ color: '#ff9800', fontSize: '1rem' }}>
                Select larger 'To' date.
              </span>
            </div>
          )}
        </Card>
      </Modal>
    </div>
  );
}

export default Dashboard;
