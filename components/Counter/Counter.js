import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useTranslation } from 'next-i18next';
import { useText } from 'theme/common';
import useStyles from './counter-style';

function Counter() {
  const { t } = useTranslation('common');
  const { classes } = useStyles();
  const { classes: text } = useText();
  return (
    <div className={classes.counterWrap}>
      <Container fixed>
        <Grid container justify-content="center" alignItems="center" spacing={6}>


        </Grid>
      </Container>
    </div>
  );
}

export default Counter;
