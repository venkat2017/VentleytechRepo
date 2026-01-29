import React from 'react';
import useStyles from './logo-style';

const logos = [
  '/images/logos/hcltech-new-logo.png',
  '/images/logos/capgeminiBlue.png',
  '/images/logos/Saicon.png',
  '/images/logos/Sira-Group.png',
  '/images/logos/barclays-wordmark.png',
  '/images/logos/techmatrix-logo-white.png',
];

function CompanyLogo() {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.logo}>

      </div>
    </div>
  );
}

export default CompanyLogo;
