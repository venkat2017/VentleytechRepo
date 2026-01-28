import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import useStyles from './cards-style';

function Testimonial(props) {
  const { classes } = useStyles();
  const {
    avatar,
    title,
    name,
      company,
    text,
    star,
  } = props;
  return (
    <div className={classes.testiCard}>
      <Paper className={classes.paper}>
        <Typography display="block" component="p">
          {text}
        </Typography>
        <div className={classes.rating}>
          {[...Array(star)].map((e, index) => (
            <StarIcon className={classes.starIcon} key={index.toString()} />
          ))}
          {[...Array(5 - star)].map((e, index) => (
            <StarIcon className={classes.starIconDisable} key={index.toString()} />
          ))}
        </div>
      </Paper>

    </div>
  );
}

Testimonial.propTypes = {
  avatar: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  star: PropTypes.number.isRequired,
};

export default Testimonial;
