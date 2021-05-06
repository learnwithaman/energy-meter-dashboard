import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
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
import ReactEnvironmentChart from 'react-environment-chart';
import { Temperature } from 'react-environment-chart';
import Thermometer from 'react-thermometer-chart';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import Compass from '../components/Compass';

am4core.useTheme(am4themes_animated);

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
  textfield: {
    [theme.breakpoints.down('sm')]: {
      width: '50%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '25%',
    },
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
  fabStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: theme.spacing(8),
    marginRight: theme.spacing(8),
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
    marginTop: theme.spacing(5),
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(4),
    width: '100%',
  },
  card: {
    minWidth: 200,
    minHeight: 100,
  },
  chartGridContainerStyle: {
    marginLeft: theme.spacing(0.5),
    marginTop: theme.spacing(6.5),
  },
}));

function Dashboard(props) {
  const classes = useStyles();
  const theme = useTheme();

  const history = useHistory();

  const username = localStorage.getItem('username', 'Admin');
  const userToken = localStorage.getItem('userToken');
  const userId = localStorage.getItem('userId');

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openAccountMenu = Boolean(anchorEl);

  // Status and Time states
  const [status, setStatus] = useState(0);
  const [timestamp, setTimestamp] = useState(Date.now());
  const [isStatusLoading, setIsStatusLoading] = useState(false);

  // totalExport state
  const [totalExport, setTotalExport] = useState(0);

  useEffect(() => {
    if (!userToken || userToken === '') {
      history.push('/login');
    }
    console.log('useEffect running...');
  }, [userToken, history]);

  useEffect(() => {
    const interval = setInterval(getTotalExport, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getTotalExport = () => {
    setTotalExport(5);
    console.log(totalExport);
  };

  const getStatusAndTime = () => {
    setIsStatusLoading(true);
    axios
      .get('http://localhost:5000/api/site/', {
        headers: {
          jwtToken: userToken,
        },
      })
      .then((response) => {
        setStatus(response.data.status);
        setTimestamp(response.data.timestamp);
        setIsStatusLoading(false);
      })
      .catch((error) => {
        setIsStatusLoading(false);
      });
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
    const newDate = new Date(Date.now());
    return `${newDate.toLocaleDateString()}  ${newDate.toLocaleTimeString()}`;
  };

  useLayoutEffect(() => {
    // create chart
    let chart = am4core.create('chartdiv', am4charts.GaugeChart);
    // chart.exporting.menu = new am4core.ExportMenu();
    // chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.startAngle = -90;
    chart.endAngle = 270;

    let axis = chart.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    axis.max = 360;

    axis.renderer.line.strokeWidth = 8;
    axis.renderer.line.strokeOpacity = 1;
    axis.renderer.line.stroke = am4core.color('#999');
    axis.renderer.inside = true;

    axis.renderer.axisFills.template.disabled = true;
    axis.renderer.grid.template.disabled = true;
    axis.renderer.ticks.template.disabled = false;
    axis.renderer.ticks.template.length = 12;
    axis.renderer.ticks.template.strokeOpacity = 1;

    axis.renderer.labels.template.radius = 35;
    axis.renderer.labels.template.disabled = true;
    axis.renderer.ticks.template.disabled = true;

    function createLabel(label, deg) {
      let range = axis.axisRanges.create();
      range.value = deg;
      range.grid.disabled = true;
      range.label.text = label;
    }

    createLabel('N', 0);
    createLabel('', 22.5);
    createLabel('NE', 45);
    createLabel('', 67.5);
    createLabel('E', 90);
    createLabel('', 112.5);
    createLabel('SE', 135);
    createLabel('', 157.5);
    createLabel('S', 180);
    createLabel('', 202.5);
    createLabel('SW', 225);
    createLabel('', 247.5);
    createLabel('W', 270);
    createLabel('', 292.5);
    createLabel('NW', 315);
    createLabel('', 337.5);

    // hands
    let northHand = chart.hands.push(new am4charts.ClockHand());
    northHand.radius = am4core.percent(80);
    northHand.startWidth = 20;
    northHand.endWidth = 1;
    northHand.rotationDirection = 'clockWise';
    northHand.pin.disabled = true;
    northHand.zIndex = 0;
    northHand.fill = am4core.color('#c00');
    northHand.stroke = am4core.color('#c00');
    northHand.value = 2;

    let southHand = chart.hands.push(new am4charts.ClockHand());
    southHand.radius = am4core.percent(80);
    southHand.startWidth = 20;
    southHand.endWidth = 1;
    southHand.rotationDirection = 'clockWise';
    southHand.pin.disabled = true;
    southHand.zIndex = 0;
    southHand.fill = am4core.color('#555');
    southHand.stroke = am4core.color('#555');
    southHand.value = 182;

    // setInterval(rotateCompass, 5000);

    function rotateCompass() {
      let angle = am4core.utils.random(-100, 100);

      // chart.startAngle = -90 + angle;
      // chart.endAngle = 270 + angle;
      // northHand.value = 0 - angle;
      // southHand.value = 180 - angle;

      chart.animate(
        { property: 'startAngle', to: angle },
        1000,
        am4core.ease.cubicOut
      );
      chart.animate(
        { property: 'endAngle', to: angle + 360 },
        1000,
        am4core.ease.cubicOut
      );

      northHand.animate(
        { property: 'value', to: -90 - angle },
        1000,
        am4core.ease.cubicOut
      );
      southHand.animate(
        { property: 'value', to: 90 - angle },
        1000,
        am4core.ease.cubicOut
      );
    }

    return () => {
      chart.dispose();
    };
  }, []);

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
        <Grid container spacing={4} style={{ paddingLeft: '.25rem' }}>
          <Grid item>
            <Typography>Chhattisgarh</Typography>
          </Grid>
          <Grid item>
            <Typography>15 MW/h</Typography>
          </Grid>
          <div className={classes.grow}></div>
          {false ? (
            <>
              <div style={{ paddingTop: '1rem', marginRight: '6rem' }}>
                <CircularProgress size={30} />
              </div>
            </>
          ) : (
            <>
              <Grid item>
                <Typography>
                  {status === 0 ? (
                    <span style={{ color: '#f44336' }}>Offline</span>
                  ) : (
                    <span style={{ color: '#4caf50' }}>Online</span>
                  )}
                </Typography>
              </Grid>
              <Grid item>
                {timestamp && <Typography>{getDateAndTimeString()}</Typography>}
              </Grid>
              <div style={{ marginRight: '2rem' }}></div>
            </>
          )}
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
              style={{ height: '290px', width: 'max-content' }}
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
                  width={350}
                  currentValueText='22 MW'
                />
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
                    <Typography
                      align='center'
                      style={{ marginBottom: '.25rem' }}
                    >
                      Title
                    </Typography>
                    <Thermometer
                      steps={8}
                      minValue={-20}
                      maxValue={60}
                      height='300px'
                    />
                    <Typography align='center'>30°C</Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      align='center'
                      style={{ marginBottom: '.25rem' }}
                    >
                      Title
                    </Typography>
                    <Thermometer
                      steps={8}
                      minValue={-20}
                      maxValue={60}
                      height='300px'
                    />
                    <Typography align='center'>30°C</Typography>
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
                  style={{ height: '380px', width: '380px' }}
                />
              </CardContent>
            </Card>
          </Grid> */}
          <Grid item>
            <Card elevation={6}>
              <CardContent>
                <Typography gutterBottom>Title</Typography>
                <div style={{ marginLeft: '1.5rem', marginRight: '1.5rem' }}>
                  <Compass size={280} rotate={350} />
                </div>
              </CardContent>
            </Card>
          </Grid>
          {/* <Grid item>
            <Card elevation={6}>
              <CardContent>
                <Typography>Abc</Typography>
              </CardContent>
            </Card>
          </Grid> */}
        </Grid>
      </main>
    </div>
  );
}

export default Dashboard;
