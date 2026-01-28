import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles({ uniqId: 'logo' })((theme) => ({
  root: {
    width: '100%',
    overflow: 'auto',
  },
  logo: {
    display: 'flex',
    position: 'relative',
    zIndex: 5,
    margin: theme.spacing(20, 0, 0),
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
    },
    '& img': {
      height: 42,
        width: 140,
      margin: theme.spacing(0, 4),
      filter: 'grayscale(0.3) brightness(0.9) contrast(1.1)',
    },
     '& img:last-child': {
       filter: 'none',
       height: 42,
       width: 140,
       opacity: 1,
       margin: theme.spacing(0, 4),
       backgroundColor: '#0B1C2D',   // deep navy (enterprise look)
       padding: '6px 10px',
       borderRadius: '6px',
     },


  }
}));

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export default useStyles;
