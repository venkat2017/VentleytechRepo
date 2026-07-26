import { makeStyles } from 'tss-react/mui';
import { lighten, darken } from '@mui/material/styles';

const companyLogoStyles = makeStyles({ uniqId: 'company-logo' })((theme) => ({
  root: {
    width: '100%',
    position: 'relative',
    zIndex: 3,
    // The testimonial carousel's dots sit ~64px below the carousel box
    // (see .carousel ul[class*="slick-dots"] in testi-style.js), and the
    // decorative diamond behind "Our Promise To Clients" also extends down
    // past the carousel on large screens. Extra top padding here keeps this
    // section from crowding into either of those.
    padding: theme.spacing(10, 0, 8),
    [theme.breakpoints.up('lg')]: {
      paddingTop: theme.spacing(14),
    },
  },
  
  heading: {
    textAlign: 'center',
    marginBottom: theme.spacing(5),
    fontWeight: 700,
    color: '#0D47A1',
    fontSize: '2.1rem',
    letterSpacing: 2,
    fontFamily:'Roboto Condensed',
    position: 'relative',
    display: 'inline-block',
    left: '50%',
    transform: 'translateX(-50%)',
    paddingBottom: theme.spacing(2),
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 48,
      height: 3,
      borderRadius: 3,
      background: theme.palette.secondary.main || theme.palette.primary.main,
    },
  },
  headingWrap: {
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(2.5),
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'repeat(5, 1fr)',
    },
    [theme.breakpoints.up('xl')]: {
      gridTemplateColumns: 'repeat(6, 1fr)',
    },
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    borderRadius: theme.shape.borderRadius * 2,
    // Logos ship on white/transparent backgrounds. In dark mode we keep an
    // explicit light card behind every logo so none of them disappear or
    // clash against a dark page background.
    background: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.background.paper,
    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.06)' : theme.palette.divider}`,
    boxShadow: theme.palette.mode === 'dark'
      ? '0 2px 10px rgba(0,0,0,0.35)'
      : '0 2px 10px rgba(15,23,42,0.06)',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    padding: theme.spacing(2, 3),
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.palette.mode === 'dark'
        ? '0 8px 20px rgba(0,0,0,0.45)'
        : '0 8px 20px rgba(15,23,42,0.12)',
    },
  },
  logo: {
    maxWidth: '100%',
    maxHeight: 48,
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
    display: 'block',
    // Slight desaturation at rest, full color on hover — a common,
    // subtle way to keep a long logo wall visually calm.
    filter: 'grayscale(15%)',
    opacity: 0.9,
    transition: 'filter 0.25s ease, opacity 0.25s ease',
  },
  logoHover: {
    filter: 'grayscale(0%)',
    opacity: 1,
  },
}));

export default companyLogoStyles;
