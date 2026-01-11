import React, { useEffect, useRef } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import Carousel from 'react-slick';
import PrevIcon from '@mui/icons-material/ArrowBack';
import NextIcon from '@mui/icons-material/ArrowForward';
import { useTranslation } from 'next-i18next';
import imgApi from 'public/images/imgAPI';
import useStyles from './services-style';
import TitleIcon from '../Title/WithIcon';
import Card from '../Cards/Default';
import DotsParallax from '../Parallax/Dots';

const servicesList = [
  {
    title: 'Software Development & Project Services',
    desc: 'We deliver custom software solutions tailored to meet the unique needs of each client.',
    img: imgApi.ventleytech[0]
  },
    {
    title: 'Quality Assurance & Testing Services',
    desc: 'We offer end-to-end testing solutions that improve reliability, security, and user experience.',
    img: imgApi.ventleytech[2]
  }, {
    title: 'Cloud & DevOps Engineering',
    desc: 'VentleyTech helps businesses embrace the cloud with agility, scalability, and security.' +
        'Our Cloud and DevOps experts enable faster delivery, automation, and operational efficiency.',
    img: imgApi.ventleytech[3]
  },
    {
        title: 'AI & Machine Learning',
        desc: 'we help organizations harness the power of Artificial Intelligence (AI) and Machine Learning (ML) to drive smarter decisions.',
        img: imgApi.ventleytech[4]
    },
  {
    title: 'Data Engineering & Data Science',
    desc: 'we help businesses transform raw data into strategic assets.Our Data Engineering & Data Science services are designed to collect, process, and analyze data efficiently',
    img: imgApi.ventleytech[5]
  }, {
    title: 'IT Staffing & Recruitment Services',
    desc: 'Our IT Staffing Division connects clients with top-tier technology professionals across the USA, offering both C2C and W2 hiring models.',
    img: imgApi.ventleytech[6]
  }, {
    title: 'Managed & Consulting Services',
    desc: 'We offer strategic consulting and managed services to help organizations optimize operations, adopt new technologies, and ensure continuous innovation.',
    img: imgApi.ventleytech[7]
  }
];

function Services() {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const { classes } = useStyles();
  const slider = useRef(null);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    arrows: false,
    slidesToScroll: 1,
    variableWidth: true,
    responsive: [{
      breakpoint: 1100,
      settings: {
        slidesToShow: 3,
      }
    }, {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      }
    }]
  };

  useEffect(() => {
    if (theme.direction === 'ltr' && window.innerWidth > 1200) {
      const limit = window.innerWidth > 1400 ? 3 : 2;
      const lastSlide = Math.floor(servicesList.length - limit);
      slider.current.slickGoTo(lastSlide);
    }
  }, []);

  return (
    <div className={classes.root}>
      <DotsParallax />
      <div className={classes.carouselHandle}>
        <div className={classes.carouselWrap}>
          <Carousel ref={slider} {...settings}>
            {isDesktop && (
              <div className={classes.item}>
                <div className={classes.carouselProp}>
                  <div />
                </div>
              </div>
            )}
            {servicesList.map((item, index) => (
              <div className={classes.item} key={index.toString()}>
                <Card
                  title={item.title}
                  desc={item.desc}
                  img={item.img}
                  button={t('ventleytech-landing.services_button')}
                />
              </div>
            ))}
            {isDesktop && (
              <div className={classes.item}>
                <div className={classes.carouselProp}>
                  <div />
                </div>
              </div>
            )}
          </Carousel>
        </div>
      </div>
      <div className={classes.floatingTitle}>
        <Container fixed>
          <div className={classes.title}>
            <TitleIcon text={t('ventleytech-landing.services_title')} icon="apps" extended />
            <nav className={classes.arrow}>
              <Fab size="small" onClick={() => slider.current.slickNext()} aria-label="prev" className={classes.margin}>
                <PrevIcon />
              </Fab>
              <Fab size="small" onClick={() => slider.current.slickPrev()} aria-label="next" className={classes.margin}>
                <NextIcon />
              </Fab>
            </nav>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Services;
