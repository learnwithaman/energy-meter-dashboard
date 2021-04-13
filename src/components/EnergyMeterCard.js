import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import { IconButton } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles({
  root: {
    maxWidth: 256,
  },
  media: {
    height: 64,
    width: 64,
  },
  cardContentStyle: {
    paddingTop: 4,
    paddingBottom: 2,
  },
  cardActionsStyle: {},
  starBorderIconButtonStyle: {
    margin: 4,
  },
});

function EnergyMeterCard({ deviceId, deviceName, deviceAdded, deviceType }) {
  const classes = useStyles();

  const [favorite, setFavorite] = useState(false);

  function toggleFavorite() {
    setFavorite((prevFavorite) => !prevFavorite);
  }

  return (
    <Card className={classes.root} elevation={4}>
      <IconButton
        size='small'
        className={classes.starBorderIconButtonStyle}
        onClick={toggleFavorite}
      >
        {favorite ? (
          <StarIcon fontSize='small' color='secondary' />
        ) : (
          <StarBorderIcon fontSize='small' />
        )}
      </IconButton>
      <CardContent className={classes.cardContentStyle}>
        <CardMedia
          className={classes.media}
          image='/static/images/energy-meter.png'
          title='Energy Meter'
        />
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
      </CardContent>
      <CardActions disableSpacing className={classes.cardActionsStyle}>
        <IconButton size='small'>
          <SettingsIcon fontSize='small' />
        </IconButton>
        <IconButton size='small' color='secondary'>
          <DeleteIcon fontSize='small' />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default EnergyMeterCard;

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import { IconButton } from '@material-ui/core';
// import SettingsIcon from '@material-ui/icons/Settings';
// import DeleteIcon from '@material-ui/icons/Delete';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     margin: 'auto',
//     maxWidth: 256,
//   },
//   image: {},
//   img: {
//     margin: 'auto',
//     display: 'block',
//     height: 64,
//   },
// }));

// export default function EnergyMeterCard() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Paper className={classes.paper}>
//         <Grid container spacing={2}>
//           <Grid item>
//             <img
//               className={classes.img}
//               alt='complex'
//               src='/static/images/energy-meter.png'
//             />
//           </Grid>
//           <Grid item xs={12} sm container>
//             <Grid item xs container direction='column' spacing={2}>
//               <Grid item xs>
//                 <Typography gutterBottom variant='subtitle1'>
//                   Standard license
//                 </Typography>
//                 <Typography variant='body2' gutterBottom>
//                   Full resolution 1920x1080 • JPEG
//                 </Typography>
//                 <Typography variant='body2' color='textSecondary'>
//                   ID: 1030114
//                 </Typography>
//               </Grid>
//               <Grid item>
//                 <IconButton size='small'>
//                   <SettingsIcon fontSize='small' />
//                 </IconButton>
//                 <IconButton size='small' color='secondary'>
//                   <DeleteIcon fontSize='small' />
//                 </IconButton>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Paper>
//     </div>
//   );
// }
