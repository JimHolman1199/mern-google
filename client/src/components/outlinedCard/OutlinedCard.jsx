import React from 'react';
import {Card, CardActions, CardContent, Typography, Grid, SvgIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import GoogleButton from '../googleButton/GoogleButton';
import { ReactComponent as ResLogoText } from '../../assets/resultify_logo_text.svg';
import vikingIcon from '../../assets/viking-logo.png';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: 'transparent',
    border:'none'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const OutlinedCard = () => {

  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined" style={{marginTop:75}}>
      <CardContent>
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="center"
        >
          <img src={vikingIcon} alt="Viking icon" style = {{height: '12vh'}}/>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
              Make your dream come true
          </Typography>
          <SvgIcon style={{width:'100%'}} viewBox='0 0 810.08 124.67' component={ResLogoText}/>
          <Typography variant="body2" component="p">
            well meaning and kindly.
          </Typography>
          <CardActions>
            <GoogleButton />
          </CardActions>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default OutlinedCard;
