import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import SchedularConfigurations from '../components/SchedularConfigurations';

const useStyles = makeStyles((theme) => ({
  gridContainerStyle: {
    marginTop: theme.spacing(0.5),
  },
  cardStyle: {
    textAlign: 'center',
    maxWidth: 280,
  },
  cardMediaStyle: {
    height: 64,
    width: 64,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing(3),
  },
  scrollableTabsGridContainerStyle: {
    // backgroundColor: theme.palette.background.paper,
  },
  subCardMediaStyle: {
    height: 64,
    width: 64,
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  gridItemTextStyle: {
    marginTop: theme.spacing(0.2),
  },
  additionalGridContainerStyle: {
    marginTop: theme.spacing(2.5),
  },
  backIconButton: {},
  dataNotFoundStyle: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

function DeviceDetail() {
  const history = useHistory();
  const userToken = localStorage.getItem('userToken', '');

  useEffect(() => {
    if (!userToken || userToken === '') {
      history.push('/login');
    }
  }, [userToken, history]);

  const [deviceDetails, setDeviceDetails] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const [isDeviceDataAvailable, setIsDeviceDataAvailable] = useState(false);

  useEffect(() => {
    const deviceId = localStorage.getItem('deviceId', '');
    const userToken = localStorage.getItem('userToken', '');

    console.log(deviceId);

    axios
      .get(`http://52.15.213.150:5000/api/devices/details/${deviceId}`, {
        headers: {
          'Content-Type': 'application/json',
          jwtToken: userToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        setDeviceDetails(response.data);
        if (!deviceDetails) {
          setIsDeviceDataAvailable(false);
        } else {
          setIsDeviceDataAvailable(true);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [isLoading]);

  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const [toggleMotorButton, setToggleMotorButton] = useState(false);

  const toggleMotor = (buttonState) => {
    const buttonStateNum = buttonState ? 1 : 0;
    console.log(buttonStateNum);

    const userToken = localStorage.getItem('userToken', '');
    const deviceId = localStorage.getItem('deviceId', '');

    axios
      .post(
        'http://52.15.213.150:5000/api/devices/trigger',
        {
          device_id: deviceId,
          m_trig: buttonStateNum,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            jwtToken: userToken,
          },
        }
      )
      .then((response) => {
        const m_trig = Number(response.data.split(':')[1]);
        if (m_trig === 1) {
          setToggleMotorButton(true);
        } else {
          setToggleMotorButton(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setToggleMotorButton(false);
      });
  };

  useEffect(() => {
    toggleMotor(toggleMotorButton);
  }, [toggleMotorButton]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getCustomDate = (timestamp) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleString();
  };

  const isDeviceConnected = (ts) => {
    console.log(ts);
    const newTs = ts * 1000;
    console.log('newTs', newTs);
    const difference = Date.now() - newTs;
    console.log(Date.now());
    console.log('difference', difference);
    if (difference <= 3600000) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      style={{
        marginLeft: '2rem',
        marginTop: '5rem',
        width: '90%',
        height: '85vh',
        backgroundColor: '',
      }}
    >
      {isLoading ? (
        <div
          style={{
            width: '100%',
            height: '85vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          <Button color='primary' onClick={() => history.replace('/')}>
            Go Back
          </Button>
          {!isDeviceDataAvailable ? (
            <Typography
              className={classes.dataNotFoundStyle}
              color='textSecondary'
            >
              Data not found!
            </Typography>
          ) : (
            <Grid container className={classes.gridContainerStyle}>
              <Grid item xs={3}>
                <Card className={classes.cardStyle} elevation={6}>
                  <CardMedia
                    className={classes.cardMediaStyle}
                    image='/static/images/energy-meter.png'
                    title='Energy Meter'
                  />

                  <CardContent className={classes.cardContentStyle}>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {deviceDetails.devicename}
                    </Typography>
                    <Typography
                      variant='body1'
                      gutterBottom
                      color='textSecondary'
                      component='p'
                    >
                      Device Type: Engery Meter
                    </Typography>
                    <Typography
                      variant='body1'
                      gutterBottom
                      color='textSecondary'
                      component='p'
                    >
                      Device Id: {deviceDetails.deviceid}
                    </Typography>
                    <Typography
                      variant='body1'
                      gutterBottom
                      color='textSecondary'
                      component='p'
                    >
                      Added on: {getCustomDate(deviceDetails.timestamp)}
                    </Typography>
                    <Typography
                      variant='body1'
                      color='textSecondary'
                      component='p'
                    >
                      Connection:{' '}
                      {isDeviceConnected(deviceDetails.ts) ? (
                        <span style={{ color: 'green' }}>Connected</span>
                      ) : (
                        <span style={{ color: 'red' }}>Disconnected</span>
                      )}
                    </Typography>
                  </CardContent>
                </Card>
                <Grid
                  container
                  className={classes.additionalGridContainerStyle}
                  spacing={3}
                >
                  <Grid item xs={10}>
                    <Card className={classes.subCardStyle} elevation={6}>
                      <Grid container>
                        <Grid item>
                          <CardMedia
                            className={classes.subCardMediaStyle}
                            image='/static/images/motor.png'
                          />
                        </Grid>
                        <Grid item className={classes.gridItemTextStyle}>
                          <CardContent>
                            <Typography gutterBottom variant='body1'>
                              Motor
                            </Typography>
                            <span
                              style={{
                                paddingBottom: '2px',
                                paddingRight: '8px',
                              }}
                            >
                              Status: {toggleMotorButton ? 'On' : 'Off'}
                            </span>
                            <IconButton
                              size='small'
                              onClick={() =>
                                setToggleMotorButton((prevState) => !prevState)
                              }
                            >
                              {toggleMotorButton ? (
                                <ToggleOnIcon
                                  fontSize='large'
                                  color='primary'
                                />
                              ) : (
                                <ToggleOffIcon fontSize='large' />
                              )}
                            </IconButton>
                          </CardContent>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                  <Grid item xs={10}>
                    <Card className={classes.subCardStyle} elevation={6}>
                      <Grid container>
                        <Grid item>
                          <CardMedia
                            className={classes.subCardMediaStyle}
                            image='/static/images/mode.png'
                          />
                        </Grid>
                        <Grid item className={classes.gridItemTextStyle}>
                          <CardContent>
                            <Typography gutterBottom variant='body1'>
                              Auto / Manual Mode
                            </Typography>
                            <Typography variant='h5'>
                              {deviceDetails.a_m === 1 ? 'Auto' : 'Manual'}
                            </Typography>
                          </CardContent>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={9}>
                <div className={classes.scrollableTabsGridContainerStyle}>
                  <AppBar position='static' color='default'>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      indicatorColor='primary'
                      textColor='primary'
                      variant='scrollable'
                      scrollButtons='auto'
                      aria-label='scrollable auto tabs example'
                    >
                      <Tab label='Power' {...a11yProps(0)} />
                      <Tab label='Line-Line Voltage' {...a11yProps(1)} />
                      <Tab label='Schedular Configurations' {...a11yProps(2)} />
                      <Tab label='Forward Active Energy' {...a11yProps(3)} />
                      <Tab label='Flowmeter' {...a11yProps(4)} />
                      <Tab label='Misc.' {...a11yProps(5)} />
                      <Tab label='Configurations' {...a11yProps(6)} />
                    </Tabs>
                  </AppBar>
                  <TabPanel value={value} index={0}>
                    <Grid container spacing={3}>
                      <Grid item xs={3}>
                        <Card className={classes.subCardStyle} elevation={4}>
                          <Grid container>
                            <Grid item>
                              <CardMedia
                                className={classes.subCardMediaStyle}
                                image='/static/images/power.png'
                              />
                            </Grid>
                            <Grid item className={classes.gridItemTextStyle}>
                              <CardContent>
                                <Typography gutterBottom variant='body1'>
                                  PF
                                </Typography>
                                <Typography variant='h5'>
                                  {deviceDetails.pf} <small>kW</small>
                                </Typography>
                              </CardContent>
                            </Grid>
                          </Grid>
                        </Card>
                      </Grid>
                      <Grid item xs={3}>
                        <Card className={classes.subCardStyle} elevation={4}>
                          <Grid container>
                            <Grid item>
                              <CardMedia
                                className={classes.subCardMediaStyle}
                                image='/static/images/power.png'
                              />
                            </Grid>
                            <Grid item className={classes.gridItemTextStyle}>
                              <CardContent>
                                <Typography gutterBottom variant='body1'>
                                  PF1
                                </Typography>
                                <Typography variant='h5'>
                                  {deviceDetails.pf1} <small>kW</small>
                                </Typography>
                              </CardContent>
                            </Grid>
                          </Grid>
                        </Card>
                      </Grid>
                      <Grid item xs={3}>
                        <Card className={classes.subCardStyle} elevation={4}>
                          <Grid container>
                            <Grid item>
                              <CardMedia
                                className={classes.subCardMediaStyle}
                                image='/static/images/power.png'
                              />
                            </Grid>
                            <Grid item className={classes.gridItemTextStyle}>
                              <CardContent>
                                <Typography gutterBottom variant='body1'>
                                  PF2
                                </Typography>
                                <Typography variant='h5'>
                                  {deviceDetails.pf2} <small>kW</small>
                                </Typography>
                              </CardContent>
                            </Grid>
                          </Grid>
                        </Card>
                      </Grid>
                      <Grid item xs={3}>
                        <Card className={classes.subCardStyle} elevation={4}>
                          <Grid container>
                            <Grid item>
                              <CardMedia
                                className={classes.subCardMediaStyle}
                                image='/static/images/power.png'
                              />
                            </Grid>
                            <Grid item className={classes.gridItemTextStyle}>
                              <CardContent>
                                <Typography gutterBottom variant='body1'>
                                  PF3
                                </Typography>
                                <Typography variant='h5'>
                                  {deviceDetails.pf3} <small>kW</small>
                                </Typography>
                              </CardContent>
                            </Grid>
                          </Grid>
                        </Card>
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <Grid container spacing={3}>
                      <Grid item xs={3}>
                        <Card className={classes.subCardStyle} elevation={4}>
                          <Grid container>
                            <Grid item>
                              <CardMedia
                                className={classes.subCardMediaStyle}
                                image='/static/images/line-line-voltage.png'
                              />
                            </Grid>
                            <Grid item className={classes.gridItemTextStyle}>
                              <CardContent>
                                <Typography gutterBottom variant='body1'>
                                  VLL
                                </Typography>
                                <Typography variant='h5'>
                                  {deviceDetails.vll} <small>v</small>
                                </Typography>
                              </CardContent>
                            </Grid>
                          </Grid>
                        </Card>
                      </Grid>
                      <Grid item xs={3}>
                        <Card className={classes.subCardStyle} elevation={4}>
                          <Grid container>
                            <Grid item>
                              <CardMedia
                                className={classes.subCardMediaStyle}
                                image='/static/images/line-line-voltage.png'
                              />
                            </Grid>
                            <Grid item className={classes.gridItemTextStyle}>
                              <CardContent>
                                <Typography gutterBottom variant='body1'>
                                  VLN
                                </Typography>
                                <Typography variant='h5'>
                                  {deviceDetails.vln} <small>v</small>
                                </Typography>
                              </CardContent>
                            </Grid>
                          </Grid>
                        </Card>
                      </Grid>
                      <Grid item xs={3}>
                        <Card className={classes.subCardStyle} elevation={4}>
                          <Grid container>
                            <Grid item>
                              <CardMedia
                                className={classes.subCardMediaStyle}
                                image='/static/images/line-line-voltage.png'
                              />
                            </Grid>
                            <Grid item className={classes.gridItemTextStyle}>
                              <CardContent>
                                <Typography gutterBottom variant='body1'>
                                  V12
                                </Typography>
                                <Typography variant='h5'>
                                  {deviceDetails.v12} <small>v</small>
                                </Typography>
                              </CardContent>
                            </Grid>
                          </Grid>
                        </Card>
                      </Grid>
                      <Grid item xs={3}>
                        <Card className={classes.subCardStyle} elevation={4}>
                          <Grid container>
                            <Grid item>
                              <CardMedia
                                className={classes.subCardMediaStyle}
                                image='/static/images/line-line-voltage.png'
                              />
                            </Grid>
                            <Grid item className={classes.gridItemTextStyle}>
                              <CardContent>
                                <Typography gutterBottom variant='body1'>
                                  V23
                                </Typography>
                                <Typography variant='h5'>
                                  {deviceDetails.v23} <small>v</small>
                                </Typography>
                              </CardContent>
                            </Grid>
                          </Grid>
                        </Card>
                      </Grid>
                      <Grid item xs={3}>
                        <Card className={classes.subCardStyle} elevation={4}>
                          <Grid container>
                            <Grid item>
                              <CardMedia
                                className={classes.subCardMediaStyle}
                                image='/static/images/line-line-voltage.png'
                              />
                            </Grid>
                            <Grid item className={classes.gridItemTextStyle}>
                              <CardContent>
                                <Typography gutterBottom variant='body1'>
                                  V31
                                </Typography>
                                <Typography variant='h5'>
                                  {deviceDetails.v31} <small>v</small>
                                </Typography>
                              </CardContent>
                            </Grid>
                          </Grid>
                        </Card>
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <SchedularConfigurations />
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    Forward Active Energy
                  </TabPanel>
                  <TabPanel value={value} index={4}>
                    Flowmeter
                  </TabPanel>
                  <TabPanel value={value} index={5}>
                    Misc.
                  </TabPanel>
                  <TabPanel value={value} index={6}>
                    Configurations
                  </TabPanel>
                </div>
              </Grid>
            </Grid>
          )}
        </>
      )}
      {/* <IconButton className={classes.backIconButton}>
        <ArrowBackIcon />
      </IconButton> */}
    </div>
  );
}

export default DeviceDetail;
