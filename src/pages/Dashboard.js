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
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import createTypography from '@material-ui/core/styles/createTypography';

const drawerWidth = 240;

const graphDummyData = [
  {
    time: '05:03',
    gti: '0.00',
    ghi: '0.00',
    pg: '0.00',
  },
  {
    time: '05:18',
    gti: '1.15',
    ghi: '0.99',
    pg: '0.00',
  },
  {
    time: '05:33',
    gti: '10.34',
    ghi: '10.32',
    pg: '0.00',
  },
  {
    time: '05:48',
    gti: '31.06',
    ghi: '33.55',
    pg: '0.57',
  },
  {
    time: '06:03',
    gti: '63.55',
    ghi: '69.36',
    pg: '1.28',
  },
  {
    time: '06:18',
    gti: '105.31',
    ghi: '114.61',
    pg: '2.27',
  },
  {
    time: '06:33',
    gti: '150.97',
    ghi: '162.16',
    pg: '3.39',
  },
  {
    time: '06:49',
    gti: '202.90',
    ghi: '214.55',
    pg: '4.77',
  },
  {
    time: '07:04',
    gti: '250.89',
    ghi: '263.49',
    pg: '6.07',
  },
  {
    time: '07:19',
    gti: '310.28',
    ghi: '323.39',
    pg: '7.65',
  },
  {
    time: '07:34',
    gti: '369.04',
    ghi: '382.82',
    pg: '9.34',
  },
  {
    time: '07:49',
    gti: '423.40',
    ghi: '435.44',
    pg: '10.78',
  },
  {
    time: '08:04',
    gti: '478.76',
    ghi: '491.14',
    pg: '12.12',
  },
  {
    time: '08:19',
    gti: '531.89',
    ghi: '544.10',
    pg: '13.38',
  },
  {
    time: '08:34',
    gti: '581.38',
    ghi: '593.16',
    pg: '14.62',
  },
  {
    time: '08:49',
    gti: '629.34',
    ghi: '640.84',
    pg: '15.77',
  },
  {
    time: '09:04',
    gti: '678.21',
    ghi: '689.28',
    pg: '16.78',
  },
  {
    time: '09:19',
    gti: '714.11',
    ghi: '723.88',
    pg: '17.68',
  },
  {
    time: '09:34',
    gti: '752.73',
    ghi: '761.02',
    pg: '18.44',
  },
  {
    time: '09:49',
    gti: '802.13',
    ghi: '809.20',
    pg: '19.23',
  },
  {
    time: '10:04',
    gti: '826.47',
    ghi: '833.80',
    pg: '19.79',
  },
  {
    time: '10:19',
    gti: '860.72',
    ghi: '864.86',
    pg: '20.33',
  },
  {
    time: '10:34',
    gti: '885.24',
    ghi: '888.92',
    pg: '20.80',
  },
  {
    time: '10:49',
    gti: '909.73',
    ghi: '915.13',
    pg: '21.23',
  },
  {
    time: '11:04',
    gti: '924.23',
    ghi: '926.37',
    pg: '21.66',
  },
  {
    time: '11:19',
    gti: '929.90',
    ghi: '932.16',
    pg: '21.03',
  },
  {
    time: '11:34',
    gti: '1011.88',
    ghi: '1013.92',
    pg: '21.65',
  },
  {
    time: '11:49',
    gti: '348.80',
    ghi: '342.59',
    pg: '9.90',
  },
  {
    time: '12:04',
    gti: '1029.75',
    ghi: '1033.01',
    pg: '15.77',
  },
  {
    time: '12:19',
    gti: '561.56',
    ghi: '575.33',
    pg: '22.29',
  },
  {
    time: '12:34',
    gti: '1013.05',
    ghi: '1017.06',
    pg: '23.25',
  },
  {
    time: '12:49',
    gti: '317.61',
    ghi: '310.43',
    pg: '12.02',
  },
  {
    time: '13:05',
    gti: '947.58',
    ghi: '951.84',
    pg: '20.10',
  },
  {
    time: '13:20',
    gti: '928.14',
    ghi: '931.55',
    pg: '16.12',
  },
  {
    time: '13:35',
    gti: '882.99',
    ghi: '888.31',
    pg: '21.05',
  },
  {
    time: '13:50',
    gti: '852.02',
    ghi: '856.90',
    pg: '20.33',
  },
  {
    time: '14:05',
    gti: '819.91',
    ghi: '822.59',
    pg: '20.20',
  },
  {
    time: '14:20',
    gti: '809.61',
    ghi: '818.61',
    pg: '20.09',
  },
  {
    time: '15:31',
    gti: '112.99',
    ghi: '108.70',
    pg: '3.09',
  },
  {
    time: '15:33',
    gti: '110.26',
    ghi: '105.48',
    pg: '3.05',
  },
  {
    time: '15:48',
    gti: '85.21',
    ghi: '80.90',
    pg: '2.34',
  },
  {
    time: '17:27',
    gti: '7.94',
    ghi: '8.01',
    pg: '0.07',
  },
];

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
    // minWidth: 180,
    // minHeight: 80,
  },
  chartGridContainerStyle: {
    marginLeft: theme.spacing(0.5),
    marginTop: theme.spacing(6.5),
  },
  formControl: {
    minWidth: 120,
  },
}));

function Dashboard(props) {
  const classes = useStyles();
  const theme = useTheme();

  const history = useHistory();
  const serverUrl = 'http://localhost:5000/api/';

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

  // useEffect for jwtToken
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
        setIrradianceGenerationData(graphDummyData);
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

  const handleBlockChange = (event) => {
    setBlock(event.target.value);
  };

  const handleDownloadCSV = (event) => {
    const rows = [
      ['name1', 'city1', 'some other info'],
      ['name2', 'city2', 'more info'],
    ];

    let csvContent =
      'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');

    let encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
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
          {['Dashboard'].map((text, index) => (
            <ListItem button key={text} selected={index === 0}>
              <ListItemIcon>
                {index === 0 && <DashboardIcon />}
                {index === 1 && <NotificationsIcon />}
                {index === 2 && <AssessmentIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <main className={classes.content}>
        <Grid
          container
          spacing={4}
          style={{ paddingLeft: '.25rem', paddingRight: '2rem' }}
          alignItems='center'
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
                <Grid container alignItems='center' spacing={1}>
                  <Grid item>
                    <img
                      src='/static/images/power-generation.png'
                      alt='power'
                      style={{ width: 64, height: 64 }}
                    />
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Typography>Power Generation</Typography>
                    </Grid>
                    <Grid container justify='flex-end'>
                      <Grid item>
                        <Typography color='primary'>100 KWH</Typography>
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
                      src='/static/images/power-generation.png'
                      alt='power'
                      style={{ width: 64, height: 64 }}
                    />
                  </Grid>
                  <Grid item>
                    <Grid container justify='flex-end'>
                      <Typography>Revenue</Typography>
                    </Grid>
                    <Grid container justify='flex-end'>
                      <Grid item>
                        <Typography color='primary'>100 KWH</Typography>
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
                      src='/static/images/power-generation.png'
                      alt='power'
                      style={{ width: 64, height: 64 }}
                    />
                  </Grid>
                  <Grid item>
                    <Grid container justify='flex-end'>
                      <Typography>Peak Power</Typography>
                    </Grid>
                    <Grid container justify='flex-end'>
                      <Grid item>
                        <Typography color='primary'>100 KWH</Typography>
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
                      src='/static/images/power-generation.png'
                      alt='power'
                      style={{ width: 64, height: 64 }}
                    />
                  </Grid>
                  <Grid item>
                    <Grid container justify='flex-end'>
                      <Typography>Plant PR</Typography>
                    </Grid>
                    <Grid container justify='flex-end'>
                      <Grid item>
                        <Typography color='primary'>100 KWH</Typography>
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
                      src='/static/images/power-generation.png'
                      alt='power'
                      style={{ width: 64, height: 64 }}
                    />
                  </Grid>
                  <Grid item>
                    <Grid container justify='flex-end'>
                      <Typography>Grid Availability</Typography>
                    </Grid>
                    <Grid container justify='flex-end'>
                      <Grid item>
                        <Typography color='primary'>100 KWH</Typography>
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
                  Total Export
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
          <Grid item xs={7}>
            <Grid
              container
              spacing={2}
              alignItems='center'
              style={{ marginBottom: '.5rem' }}
            >
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
              <Grid item className={classes.grow}></Grid>
              <Grid item>
                <Button variant='outlined'>
                  <CSVLink
                    filename={'my-file.csv'}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    data={graphDummyData}
                  >
                    Download CSV
                  </CSVLink>
                </Button>
              </Grid>
            </Grid>
            <BlockTable />
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export default Dashboard;
