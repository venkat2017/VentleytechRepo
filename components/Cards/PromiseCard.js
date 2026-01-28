import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from 'tss-react/mui';
import { alpha } from '@mui/material/styles';

const useStyles = makeStyles()((theme) => ({
  card: {
    background: theme.palette.mode === 'dark'
      ? alpha(theme.palette.primary.main, 0.08)
      : theme.palette.background.paper,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    height: 320,
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
    transition: 'all 0.3s ease-in-out',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: theme.palette.mode === 'dark'
        ? `0 12px 32px ${alpha(theme.palette.primary.main, 0.25)}`
        : `0 12px 32px ${alpha(theme.palette.primary.main, 0.18)}`,
      borderColor: theme.palette.primary.main,
      '& $iconWrapper': {
        background: theme.palette.primary.main,
        transform: 'scale(1.1)',
      }
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 4,
      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      opacity: 0,
      transition: 'opacity 0.3s ease-in-out',
    },
    '&:hover::before': {
      opacity: 1,
    }
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    background: alpha(theme.palette.primary.main, 0.12),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(2.5),
    transition: 'all 0.3s ease-in-out',
  },
  icon: {
    fontSize: '2rem',
  },
  title: {
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
    fontSize: '1.35rem',
  },
  description: {
    color: theme.palette.text.secondary,
    lineHeight: 1.75,
    fontSize: '0.95rem',
    flex: 1,
  }
}));

function PromiseCard(props) {
  const { classes } = useStyles();
  const { icon, title, text } = props;

  return (
    <Paper className={classes.card} elevation={0}>
      <Box className={classes.iconWrapper}>
        <span className={classes.icon}>{icon}</span>
      </Box>
      <Typography variant="h5" className={classes.title}>
        {title}
      </Typography>
      <Typography className={classes.description}>
        {text}
      </Typography>
    </Paper>
  );
}

PromiseCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default PromiseCard;
