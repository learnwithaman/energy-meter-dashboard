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
import ReactSpeedometer from 'react-d3-speedometer';
import Compass from '../components/Compass';
import Thermometer from 'react-thermometer-component';
import BiaxialLineChart from '../components/BiaxialLineChart';

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
    minWidth: 180,
    minHeight: 100,
  },
  chartGridContainerStyle: {
    marginLeft: theme.spacing(0.5),
    marginTop: theme.spacing(6.5),
  },
}));

function Dashboard() {
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
  const [isStatusLoading, setIsStatusLoading] = useState(false);

  // totalExport state
  const [totalExport, setTotalExport] = useState(0);
  const [gaugePercent, setGaugePercent] = useState(0);

  // temperatures states (ambient and module)
  const [ambientTemp, setAmbientTemp] = useState(0);
  const [moduleTemp, setModuleTemp] = useState(0);

  // wind direction and speed states
  const [windDirection, setWindDirection] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);

  // useEffect for jwtToken
  useEffect(() => {
    console.log('useEffect for userToken');

    if (!userToken || userToken === '') {
      history.push('/login');
    }

    console.log(userToken);
  }, [userToken, history]);

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
    // setIsStatusLoading(true);
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
        // setIsStatusLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // setIsStatusLoading(false);
      });
  };

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

  // // useEffect for totalExport
  // useEffect(() => {
  //   console.log('useEffect for totalExport');

  //   getTotalExport();

  //   // Fetch data every 5.5 seconds
  //   const interval = setInterval(getTotalExport, 5500);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  // // useEffect for temperatures (ambient and module)
  // useEffect(() => {
  //   console.log('useEffect for temperatures (ambient and module)');

  //   getTemperatures();

  //   // Fetch data every 10 seconds
  //   const interval = setInterval(getTemperatures, 10000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  // // useEffect for wind direction and speed
  // useEffect(() => {
  //   console.log('useEffect for wind direction and speed');

  //   getWindDirectionAndSpeed();

  //   // Fetch data every 10 seconds
  //   const interval = setInterval(getWindDirectionAndSpeed, 10000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

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
    console.log(timestamp);
    const date = new Date(timestamp);
    // if (timestamp === undefined) {
    //   return 'Loading...';
    // } else {
    //   return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    // }
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
            <Typography>Chhattisgarh</Typography>
          </Grid>
          <Grid item>
            <Typography>15 MW/h</Typography>
          </Grid>
          <Grid item className={classes.grow} />
          <Grid item>
            {status === 0 ? (
              <Typography style={{ color: '#f44336' }}>Offline</Typography>
            ) : (
              <Typography style={{ color: '#4caf50' }}>Online</Typography>
            )}
          </Grid>
          <Grid item>
            {timestamp === undefined ? (
              <CircularProgress size='1.5rem' />
            ) : (
              <Typography>{getDateAndTimeString(timestamp)}</Typography>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          className={classes.cardGridContainerStyle}
          justify='space-between'
          alignItems='center'
        >
          <Grid>
            <Card className={classes.card} elevation={4}>
              <CardContent>
                <Typography>Abc</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card} elevation={4}>
              <CardContent>
                <Typography>Abc</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card} elevation={4}>
              <CardContent>
                <Typography>Abc</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card} elevation={4}>
              <CardContent>
                <Typography>Abc</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card} elevation={4}>
              <CardContent>
                <Typography>Abc</Typography>
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
                  id='gauge-chart2'
                  nrOfLevels={25}
                  colors={['#ffeb3b', '#ff9100']}
                  textColor='#5393ff'
                  needleColor='#757575'
                  needleBaseColor='#757575'
                  arcWidth={0.3}
                  percent={0.74}
                  formatTextValue={(value) => `${totalExport}  MW`}
                  marginInPercent={0.02}
                /> */}
                <ReactSpeedometer
                  minValue={0}
                  maxValue={50}
                  value={22}
                  startColor='#91ff35'
                  endColor='#4caf50'
                  width={400}
                  currentValueText='22 MW'
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card elevation={6}>
              <CardContent>
                <Typography style={{ marginBottom: '1.5rem' }} align='center'>
                  Wind direction and speed
                </Typography>
                <div style={{ marginLeft: '1.5rem', marginRight: '1.5rem' }}>
                  <Compass size={170} rotate={220} />
                </div>
                <Typography style={{ marginTop: '1.5rem' }} align='center'>
                  220°, 100 km/h
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card
              elevation={6}
              style={{
                height: '400px',
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
              }}
            >
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item>
                    <Typography align='center' style={{ marginBottom: '1rem' }}>
                      Title
                    </Typography>
                    <Thermometer
                      theme='light'
                      value='-18'
                      max='60'
                      steps='5'
                      format='°C'
                      // size='normal'
                      height='320'
                    />
                    {/* <Typography align='center'>30°C</Typography> */}
                  </Grid>
                  <Grid item>
                    <Typography align='center' style={{ marginBottom: '1rem' }}>
                      Title
                    </Typography>
                    <Thermometer
                      theme='light'
                      value='30'
                      max='60'
                      steps='5'
                      format='°C'
                      // size='large'
                      height='320'
                    />
                    {/* <Typography align='center'>30°C</Typography> */}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* <Grid item>
            <Card elevation={6}>
              <CardContent>
                <Typography>Title</Typography>
                <div
                  id='chartdiv'
                  style={{ height: '250px', width: '250px' }}
                />
              </CardContent>
            </Card>
          </Grid> */}
          {/* <Grid item>
            <Card elevation={6}>
              <CardContent>
                <Typography>Abc</Typography>
              </CardContent>
            </Card>
          </Grid> */}
        </Grid>
        <Grid container style={{ marginTop: '3rem', marginBottom: '2rem' }}>
          <Grid item>
            <Card elevation={6}>
              <CardContent style={{ marginTop: '2rem' }}>
                <BiaxialLineChart width={800} height={400} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export default Dashboard;
