import React, { useRef, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Carousel from 'react-slick';
import { useTranslation } from 'next-i18next';
import TestimonialCard from '../Cards/Testimonial';
import TitleIcon from '../Title/WithIcon';
import CompanyLogo from '../CompanyLogo';
import SquareParallax from '../Parallax/SingleSquare';
import imgAPI from 'public/images/imgAPI';
import useStyle from './testi-style';

const testiContent = [
    {
        text: 'VentleyTech has been our go-to partner for several years. Their Java and cloud development team helped us modernize our enterprise systems efficiently and on time. Their technical depth and project management discipline are impressive.',
        avatar: imgAPI.avatar[10],
        name: 'Neha Sharma',
        company: 'Value Labs',
        title: 'Director of Technology',
        rating: 5
    },
    {
        text: 'We partnered with VentleyTech for testing and QA automation. Their team implemented a complete CI/CD integrated automation framework that significantly reduced our release cycle and improved product quality.',
        avatar: imgAPI.avatar[1],
        name: 'John Peterson',
        company: 'Optum',
        title: 'Product Head',
        rating: 4
    },
    {
        text: 'VentleyTech\'s staffing team has been instrumental in helping us find top talent across multiple projects in the US. Their speed, transparency, and understanding of our technical requirements make them one of our most trusted staffing partners.',
        avatar: imgAPI.avatar[2],
        name: 'Jena Doe',
        company: 'NTT (USA)',
        title: 'HR Director',
        rating: 4
    },
    {
        text: 'VentleyTech\'s data engineering and analytics team helped us design a robust data warehouse using Databricks and Power BI. Their ability to turn complex data into clear, actionable insights has been invaluable.',
        avatar: imgAPI.avatar[3],
        name: 'Rajesh Kumar',
        company: 'Real Page',
        title: 'CIO',
        rating: 4
    },
    {
        text: 'Their cloud and DevOps engineers helped us automate deployments, migrate workloads to AWS, and implement a monitoring framework that cut down downtime by 60%. We\'re now more agile than ever.',
        avatar: imgAPI.avatar[4],
        name: 'Lisa Thompson',
        company: 'Capgemini',
        title: 'VP of Engineering',
        rating: 5
    },
    {
        text: 'VentleyTech doesn\'t just deliver projects—they act as an extension of our team. Their proactive communication, technical guidance, and commitment to quality make them a long-term partner we can depend on.',
        avatar: imgAPI.avatar[6],
        name: 'Matthew Cole',
        company: 'Global Tech Solutions',
        title: 'Senior Architect Designer',
        rating: 5
    }
];

function Testimonials() {
    // Theme breakpoints
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    const { classes } = useStyle();

    // Carousel Setting
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        arrows: false,
        slidesToScroll: 1,
        variableWidth: true,
        responsive: [{
            breakpoint: 1100,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
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

    // Translation function
    const { t } = useTranslation('common');

    // Carousel
    const slider = useRef(null);
    useEffect(() => {
        if (theme.direction === 'ltr' && window.innerWidth > 1279) {
            const limit = window.innerWidth > 1400 ? 3 : 2;
            const lastSlide = Math.floor(testiContent.length - limit);
            slider.current.slickGoTo(lastSlide);
        }
    }, []);

    return (
        <div className={classes.root}>
            <SquareParallax />
            <div className={classes.carousel}>
                <Carousel ref={slider} {...settings}>
                    {isDesktop && (
                        <div className={classes.item}>
                            <div className={classes.itemPropsFirst} />
                        </div>
                    )}
                    {testiContent.map((item, index) => (
                        <div key={index.toString()} className={classes.item}>
                            <TestimonialCard
                                avatar={item.avatar}
                                title={item.title}
                                name={item.name}
                                company={item.company}
                                text={item.text}
                                star={item.rating}
                            />
                        </div>
                    ))}
                    {isDesktop && (
                        <div className={classes.item}>
                            <div className={classes.itemPropsLast} />
                        </div>
                    )}
                </Carousel>
            </div>
            <div className={classes.floatingTitle}>
                <Container fixed>
                    <div className={classes.title}>
                        <TitleIcon text={t('ventleytech-landing.testimonial_title')} icon="format_quote" />
                    </div>
                </Container>
            </div>
            <CompanyLogo />
        </div>
    );
}

export default Testimonials;