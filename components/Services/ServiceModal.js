import React from 'react';
import { makeStyles } from 'tss-react/mui';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarIcon from '@mui/icons-material/Star';
import CodeIcon from '@mui/icons-material/Code';
import Zoom from '@mui/material/Zoom';
import Fade from '@mui/material/Fade';

const useStyles = makeStyles()((theme) => ({
  dialog: {
    '& .MuiDialog-paper': {
      maxWidth: 1000,
      width: '90%',
      borderRadius: 24,
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
    }
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    zIndex: 10,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      transform: 'rotate(90deg)',
      transition: 'all 0.3s ease'
    }
  },
  content: {
    padding: 0,
    position: 'relative',
    '&::-webkit-scrollbar': {
      width: 8,
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(255, 255, 255, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 4,
    },
  },
  header: {
    position: 'relative',
    height: 300,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
    }
  },
  headerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.3,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  headerContent: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    padding: theme.spacing(4),
  },
  title: {
    color: '#ffffff',
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    textShadow: '0 2px 20px rgba(0,0,0,0.3)',
    fontFamily: '"Poppins", sans-serif',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.8rem',
    }
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1.1rem',
    maxWidth: 600,
    margin: '0 auto',
    lineHeight: 1.6,
    fontFamily: '"Open Sans", sans-serif',
  },
  body: {
    background: '#ffffff',
    borderRadius: '24px 24px 0 0',
    marginTop: -24,
    position: 'relative',
    zIndex: 2,
    padding: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
    }
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#2d3748',
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    fontFamily: '"Poppins", sans-serif',
    '&::after': {
      content: '""',
      flex: 1,
      height: 2,
      background: 'linear-gradient(90deg, #667eea 0%, transparent 100%)',
      marginLeft: theme.spacing(2),
    }
  },
  overview: {
    fontSize: '1rem',
    lineHeight: 1.8,
    color: '#4a5568',
    marginBottom: theme.spacing(3),
    fontFamily: '"Open Sans", sans-serif',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: theme.spacing(3),
    marginBottom: theme.spacing(4),
  },
  card: {
    background: 'linear-gradient(135deg, #f6f8fb 0%, #ffffff 100%)',
    borderRadius: 16,
    padding: theme.spacing(3),
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 24px rgba(102, 126, 234, 0.15)',
      borderColor: '#667eea',
    }
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#667eea',
    marginBottom: theme.spacing(2),
    fontFamily: '"Poppins", sans-serif',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    fontSize: '0.95rem',
    color: '#4a5568',
    marginBottom: theme.spacing(1.5),
    paddingLeft: theme.spacing(3),
    position: 'relative',
    lineHeight: 1.6,
    fontFamily: '"Open Sans", sans-serif',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 8,
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }
  },
  listItemIcon: {
    position: 'absolute',
    left: 0,
    top: 2,
    fontSize: '1.2rem',
    color: '#667eea',
  },
  techStack: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1.5),
  },
  techChip: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    padding: '8px 16px',
    borderRadius: 20,
    fontSize: '0.85rem',
    fontWeight: 500,
    fontFamily: '"Poppins", sans-serif',
    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
    }
  },
  ctaSection: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: 16,
    padding: theme.spacing(4),
    textAlign: 'center',
    marginTop: theme.spacing(4),
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -50,
      right: -50,
      width: 200,
      height: 200,
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.1)',
    }
  },
  ctaTitle: {
    color: '#ffffff',
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    fontFamily: '"Poppins", sans-serif',
  },
  ctaText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1rem',
    marginBottom: theme.spacing(3),
    fontFamily: '"Open Sans", sans-serif',
  },
  ctaButton: {
    background: '#ffffff',
    color: '#667eea',
    padding: '12px 32px',
    borderRadius: 24,
    fontSize: '1rem',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    fontFamily: '"Poppins", sans-serif',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
    }
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

function ServiceModal({ open, onClose, service }) {
  const { classes } = useStyles();

  if (!service) return null;

  const { title, desc, img, detailedInfo } = service;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      className={classes.dialog}
      maxWidth="lg"
    >
      <IconButton
        className={classes.closeButton}
        onClick={onClose}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>
      
      <DialogContent className={classes.content}>
        <div className={classes.header}>
          <img src={img} alt={title} className={classes.headerImage} />
          <div className={classes.headerContent}>
            <h2 className={classes.title}>{title}</h2>
            <p className={classes.subtitle}>{desc}</p>
          </div>
        </div>

        <div className={classes.body}>
          <Fade in={open} timeout={600}>
            <div>
              <div className={classes.section}>
                <h3 className={classes.sectionTitle}>
                  <StarIcon />
                  Overview
                </h3>
                <p className={classes.overview}>{detailedInfo.overview}</p>
              </div>

              <div className={classes.grid}>
                <div className={classes.card}>
                  <h4 className={classes.cardTitle}>Key Features</h4>
                  <ul className={classes.list}>
                    {detailedInfo.features.map((feature, index) => (
                      <li key={index} className={classes.listItem}>
                        <CheckCircleOutlineIcon className={classes.listItemIcon} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={classes.card}>
                  <h4 className={classes.cardTitle}>Benefits</h4>
                  <ul className={classes.list}>
                    {detailedInfo.benefits.map((benefit, index) => (
                      <li key={index} className={classes.listItem}>
                        <CheckCircleOutlineIcon className={classes.listItemIcon} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={classes.section}>
                <h3 className={classes.sectionTitle}>
                  <CodeIcon />
                  Technologies & Tools
                </h3>
                <div className={classes.techStack}>
                  {detailedInfo.technologies.map((tech, index) => (
                    <span key={index} className={classes.techChip}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className={classes.ctaSection}>
                <h3 className={classes.ctaTitle}>Ready to Get Started?</h3>
                <p className={classes.ctaText}>
                  Let's discuss how we can help transform your business with our {title.toLowerCase()}
                </p>
                <button className={classes.ctaButton}>
                  Contact Us Today
                </button>
              </div>
            </div>
          </Fade>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ServiceModal;