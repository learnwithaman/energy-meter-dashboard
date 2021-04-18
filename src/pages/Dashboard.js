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
import EnergyMeterCard from '../components/EnergyMeterCard';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useHistory, useLocation } from 'react-router-dom';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { TextField } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import AddDevice from '../components/AddDeviceModal';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AppsIcon from '@material-ui/icons/Apps';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeviceDetail from './DeviceDetail';

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
    padding: theme.spacing(3),
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
}));

function Dashboard(props) {
  const classes = useStyles();
  const theme = useTheme();

  const username = localStorage.getItem('username', 'Admin');
  const userToken = localStorage.getItem('userToken');
  const userId = localStorage.getItem('userId');

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openAddDeviceModal, setAddDeviceModal] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openAccountMenu = Boolean(anchorEl);

  const history = useHistory();

  useEffect(() => {
    if (!userToken || userToken === '') {
      history.push('/login');
    }
  }, [userToken, history]);

  const [devices, setDevices] = useState([]);
  const [searchedDevices, setSearchedDevices] = useState([]);

  const getDevices = () => {
    console.log(userId, userToken);
    setIsLoading(true);
    axios
      .get('http://52.15.213.150:5000/api/devices/' + userId, {
        headers: {
          jwtToken: userToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        setDevices(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getDevices();
  }, []);

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

  const fabHandler = () => {
    setAddDeviceModal(true);
  };

  const handleAddDeviceModalClose = () => {
    setAddDeviceModal(false);
  };

  const getCustomDate = (timestamp) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleString();
  };

  const handleDeviceAdd = () => {
    getDevices();
  };

  const handleDeviceDelete = () => {
    getDevices();
  };

  const [enteredPhrase, setEnteredPhrase] = useState('');

  const handleDeviceSearch = () => {
    console.log(enteredPhrase);
    if (enteredPhrase !== '') {
      let searchedDevices = devices.filter((device) =>
        device.devicename.toLowerCase().includes(enteredPhrase.toLowerCase())
      );
      console.log(searchedDevices);
      setSearchedDevices(searchedDevices);
    } else {
      setSearchedDevices([]);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(handleDeviceSearch, 500);
    return () => {
      console.log('clearTimeout');
      clearTimeout(timeout);
    };
  }, [enteredPhrase]);

  const location = useLocation();

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
          <Typography variant='h6' noWrap>
            Dashboard
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <div>
              <Grid
                container
                direction='row'
                justify='center'
                alignItems='center'
              >
                {/* <IconButton
                  aria-label='show new notifications'
                  color='inherit'
                  className={classes.userNotificationIconButtonStyle}
                >
                  <Badge badgeContent={1} color='secondary'>
                    <NotificationsIcon />
                  </Badge>
                </IconButton> */}
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
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
          <Typography className={classes.companyNameStyle}>
            Datablare
          </Typography>
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
          {['Devices', 'Triggers', 'Reports'].map((text, index) => (
            <ListItem button key={text} selected={index === 0}>
              <ListItemIcon>
                {index === 0 && <DesktopMacIcon />}
                {index === 1 && <NotificationsIcon />}
                {index === 2 && <AssessmentIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      {/* <main className={classes.content}>
        <div className={classes.toolbar} />
        <TextField
          id='searchDeviceTextField'
          label='Search device'
          className={classes.textfield}
          onChange={(e) => setEnteredPhrase(e.target.value)}
        />

        <Grid
          container
          direction='row'
          justify='flex-start'
          alignItems='flex-start'
          spacing={4}
          className={classes.gridContainer}
        >
          {isLoading ? (
            <Grid item>
              <CircularProgress />
            </Grid>
          ) : searchedDevices.length > 0 || enteredPhrase !== '' ? (
            searchedDevices.map((device) => (
              <Grid item key={device.id}>
                <EnergyMeterCard
                  deviceId={device.deviceid}
                  deviceName={device.devicename}
                  deviceAdded={getCustomDate(device.timestamp)}
                  deviceType='Energy Meter'
                  onDeviceDelete={handleDeviceDelete}
                />
              </Grid>
            ))
          ) : (
            devices.map((device) => (
              <Grid item key={device.id}>
                <EnergyMeterCard
                  deviceId={device.deviceid}
                  deviceName={device.devicename}
                  deviceAdded={getCustomDate(device.timestamp)}
                  deviceType='Energy Meter'
                  onDeviceDelete={handleDeviceDelete}
                />
              </Grid>
            ))
          )}
        </Grid>

        <Fab
          color='secondary'
          aria-label='add'
          className={classes.fabStyle}
          onClick={fabHandler}
        >
          <AddIcon />
        </Fab>
      </main> */}
      {location.pathname === '/' ? (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <TextField
            id='searchDeviceTextField'
            label='Search device'
            className={classes.textfield}
            onChange={(e) => setEnteredPhrase(e.target.value)}
          />

          <Grid
            container
            direction='row'
            justify='flex-start'
            alignItems='flex-start'
            spacing={4}
            className={classes.gridContainer}
          >
            {isLoading ? (
              <Grid item>
                <CircularProgress />
              </Grid>
            ) : searchedDevices.length > 0 || enteredPhrase !== '' ? (
              searchedDevices.map((device) => (
                <Grid item key={device.id}>
                  <EnergyMeterCard
                    deviceId={device.deviceid}
                    deviceName={device.devicename}
                    deviceAdded={getCustomDate(device.timestamp)}
                    deviceType='Energy Meter'
                    onDeviceDelete={handleDeviceDelete}
                  />
                </Grid>
              ))
            ) : (
              devices.map((device) => (
                <Grid item key={device.id}>
                  <EnergyMeterCard
                    deviceId={device.deviceid}
                    deviceName={device.devicename}
                    deviceAdded={getCustomDate(device.timestamp)}
                    deviceType='Energy Meter'
                    onDeviceDelete={handleDeviceDelete}
                  />
                </Grid>
              ))
            )}
          </Grid>

          <Fab
            color='secondary'
            aria-label='add'
            className={classes.fabStyle}
            onClick={fabHandler}
          >
            <AddIcon />
          </Fab>
        </main>
      ) : (
        props.children
      )}
      <Modal
        open={openAddDeviceModal}
        onClose={handleAddDeviceModalClose}
        aria-labelledby='add-device-modal'
        aria-describedby='add-device'
      >
        <AddDevice
          onCancel={handleAddDeviceModalClose}
          onDeviceAdd={handleDeviceAdd}
        />
      </Modal>
    </div>
  );
}

export default Dashboard;
