import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {Card, CardActions, CardContent, Typography, Link, CardMedia } from '@material-ui/core';
import removeMe from '../../assets/Andriy.jpg'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
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
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            Make your dream come true
        </Typography>
        <CardMedia
        image={removeMe}
        title="Paella dish"
        style = {{height:300}}
        />
        <Typography variant="h5" component="h2">
            With Resultify
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
        </Typography>
      </CardContent>
      <CardActions>
        <Link href="http://localhost:5000/api/drive" >Login with Google</Link>
      </CardActions>
    </Card>
  );
}

export default OutlinedCard;
