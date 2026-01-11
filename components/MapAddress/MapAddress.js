import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ScrollAnimation from 'react-scroll-animation-wrapper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/LocalPhone';
import LocationIcon from '@mui/icons-material/LocationOn';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react18';
import { useTranslation } from 'next-i18next';
import useStyles from './map-address-style';
import TitleDeco from '../Title/WithDecoration';

function MapContainer(props) {
    const { google } = props;
    return (
        <Map
            google={google}
            style={{ width: '100%', height: '700px', position: 'relative' }}
            initialCenter={{
                lat: 40.0285832, // ✅ Exton, PA
                lng: -75.6012623,
            }}
            zoom={15}
            disableDefaultUI={true}
        >
            <Marker position={{ lat: 40.0285832, lng: -75.6012623 }} />
        </Map>
    );
}

MapContainer.propTypes = {
    google: PropTypes.object.isRequired,
};

const MapWithAMarker = GoogleApiWrapper({
    apiKey: 'AIzaSyBirsYzliUpekBPJBvUIcfg3lZSSFgoytc', // ✅ replace with your real key
    libraries: ['places'],
    language: 'en',
    version: '3',
    loading: 'async', // ✅ ensures async loading
})(MapContainer);

function MapAddress() {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    const { t } = useTranslation('common');
    const { classes } = useStyles();

    return (
        <div className={classes.root}>
            <Container fixed>
                <Grid container spacing={6}>
                    {isDesktop && <Grid item md={1} />}
                    <Grid item md={isDesktop ? 5 : 6} xs={12}>
                        <TitleDeco text={t('ventleytech-landing.office_title')} />
                        <div className={classes.block}>
                            <ScrollAnimation
                                animateOnce
                                animateIn="fadeInLeftShort"
                                offset={-100}
                                delay={200}
                                duration={0.3}
                            >
                                <Paper className={classes.paper}>
                                    <Typography variant="h6" display="block">
                                        {t('ventleytech-landing.office_head')}
                                    </Typography>
                                    <Grid container spacing={1}>
                                        <Grid item sm={6} xs={12}>
                                            <PhoneIcon className={classes.icon} /> +1 (223) 221-9994
                                        </Grid>
                                        <Grid item sm={6} xs={12}>
                                            <EmailIcon className={classes.icon} /> info@ventleytech.com
                                        </Grid>
                                        <Grid item xs={12}>
                                            <LocationIcon className={classes.icon} /> 801 Springdale
                                            Drive, Suite 100i, Exton, PA 19341
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </ScrollAnimation>


                        </div>
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <Paper className={classes.map} elevation={10}>
                            <MapWithAMarker />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default MapAddress;
