import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import { IconButton } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {},
  media: {
    height: '100%',
    width: 64,
  },
  cardContentStyle: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  cardActionsStyle: {
    justifyContent: 'flex-end',
  },
  starBorderIconButtonStyle: {},
});

function EnergyMeterCard({
  deviceId,
  deviceName,
  deviceAdded,
  deviceType,
  onDeviceDelete,
}) {
  const classes = useStyles();

  const [favorite, setFavorite] = useState(false);

  function toggleFavorite() {
    setFavorite((prevFavorite) => !prevFavorite);
  }

  const userToken = localStorage.getItem('userToken', '');

  const handleDeviceDelete = () => {
    const result = window.confirm('Are you sure?');
    if (result) {
      axios
        .delete('http://52.15.213.150:5000/api/devices/' + deviceId, {
          headers: {
            'Content-Type': 'application/json',
            jwtToken: userToken,
          },
        })
        .then((response) => {
          console.log(response.data);
          onDeviceDelete();
        })
        .catch((error) => {
          console.log(error.response.status);
          console.log(error.response.data);
        });
    }
  };

  const history = useHistory();

  const handleDeviceCardClick = () => {
    localStorage.setItem('deviceId', deviceId);
    history.push('/device/details');
  };

  return (
    <Card className={classes.root} elevation={6}>
      <CardActionArea onClick={handleDeviceCardClick}>
        <CardActions className={classes.cardActionsStyle}>
          <IconButton
            size='small'
            className={classes.starBorderIconButtonStyle}
            onClick={toggleFavorite}
          >
            {favorite ? (
              <StarIcon fontSize='small' color='primary' />
            ) : (
              <StarBorderIcon fontSize='small' />
            )}
          </IconButton>
        </CardActions>
        <CardContent className={classes.cardContentStyle}>
          <Grid container spacing={2}>
            <Grid item>
              <CardMedia
                className={classes.media}
                image='/static/images/energy-meter.png'
                title='Energy Meter'
              />
            </Grid>
            <Grid item>
              <Typography variant='h6' component='h6' color='textSecondary'>
                {deviceName}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                <strong>Added: </strong>
                {deviceAdded}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                <strong>Type: </strong>
                {deviceType}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions disableSpacing className={classes.cardActionsStyle}>
          <IconButton size='small'>
            <SettingsIcon fontSize='small' />
          </IconButton>
          <IconButton size='small'>
            <DeleteIcon fontSize='small' onClick={handleDeviceDelete} />
          </IconButton>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

export default EnergyMeterCard;
