import React, { useEffect, useRef, useState } from 'react';
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
import ServiceModal from './ServiceModal';

const servicesList = [
  {
    title: 'Software Development & Project Services',
    desc: 'We deliver custom software solutions tailored to meet the unique needs of each client.',
    img: imgApi.ventleytech[0],
    detailedInfo: {
      overview: 'At VentleyTech, we specialize in delivering end-to-end software development services that transform your business ideas into powerful, scalable applications. Our expert team leverages cutting-edge technologies and agile methodologies to create solutions that drive growth and innovation.',
      features: [
        'Custom Web & Mobile Application Development',
        'Enterprise Software Solutions',
        'API Development & Integration',
        'Legacy System Modernization',
        'Microservices Architecture',
        'Full-Stack Development'
      ],
      benefits: [
        'Accelerated time-to-market with agile development',
        'Scalable architecture designed for growth',
        'Seamless integration with existing systems',
        'Ongoing support and maintenance',
        'Cost-effective solutions tailored to your budget'
      ],
      technologies: ['React', 'Node.js', 'Python', 'Java', 'AWS', 'Azure', 'Docker', 'Kubernetes']
    }
  },
  {
    title: 'Quality Assurance & Testing Services',
    desc: 'We offer end-to-end testing solutions that improve reliability, security, and user experience.',
    img: imgApi.ventleytech[2],
    detailedInfo: {
      overview: 'Our comprehensive QA and testing services ensure your software meets the highest standards of quality, performance, and security. We employ industry-leading tools and methodologies to identify issues early and deliver flawless user experiences.',
      features: [
        'Automated Testing & CI/CD Integration',
        'Manual & Exploratory Testing',
        'Performance & Load Testing',
        'Security & Penetration Testing',
        'Mobile Testing (iOS & Android)',
        'API & Integration Testing'
      ],
      benefits: [
        'Reduce bugs and defects by up to 80%',
        'Faster release cycles with continuous testing',
        'Enhanced security and compliance',
        'Improved user satisfaction and retention',
        'Lower maintenance costs'
      ],
      technologies: ['Selenium', 'Cypress', 'JMeter', 'Postman', 'TestRail', 'Appium', 'OWASP ZAP']
    }
  },
  {
    title: 'Cloud & DevOps Engineering',
    desc: 'VentleyTech helps businesses embrace the cloud with agility, scalability, and security. Our Cloud and DevOps experts enable faster delivery, automation, and operational efficiency.',
    img: imgApi.ventleytech[3],
    detailedInfo: {
      overview: 'Transform your IT infrastructure with our Cloud and DevOps engineering services. We help organizations achieve continuous delivery, infrastructure automation, and operational excellence through modern cloud-native practices.',
      features: [
        'Cloud Migration & Modernization',
        'Infrastructure as Code (IaC)',
        'CI/CD Pipeline Implementation',
        'Container Orchestration',
        'Cloud Security & Compliance',
        'Multi-Cloud & Hybrid Cloud Solutions'
      ],
      benefits: [
        'Reduce infrastructure costs by up to 40%',
        'Increase deployment frequency by 10x',
        'Minimize downtime with automated recovery',
        'Scale resources dynamically based on demand',
        'Enhance collaboration between development and operations'
      ],
      technologies: ['AWS', 'Azure', 'GCP', 'Terraform', 'Jenkins', 'GitLab CI', 'Docker', 'Kubernetes', 'Ansible']
    }
  },
  {
    title: 'AI & Machine Learning',
    desc: 'We help organizations harness the power of Artificial Intelligence (AI) and Machine Learning (ML) to drive smarter decisions.',
    img: imgApi.ventleytech[4],
    detailedInfo: {
      overview: 'Unlock the potential of artificial intelligence to automate processes, gain predictive insights, and create intelligent applications. Our AI/ML experts design and deploy custom models that solve complex business challenges.',
      features: [
        'Machine Learning Model Development',
        'Natural Language Processing (NLP)',
        'Computer Vision Solutions',
        'Predictive Analytics',
        'AI-Powered Automation',
        'MLOps & Model Deployment'
      ],
      benefits: [
        'Automate repetitive tasks and reduce manual effort',
        'Make data-driven decisions with predictive insights',
        'Enhance customer experiences with personalization',
        'Discover hidden patterns in your data',
        'Stay competitive with cutting-edge AI capabilities'
      ],
      technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenAI', 'Hugging Face', 'MLflow', 'Apache Spark']
    }
  },
  {
    title: 'Data Engineering & Data Science',
    desc: 'We help businesses transform raw data into strategic assets. Our Data Engineering & Data Science services are designed to collect, process, and analyze data efficiently.',
    img: imgApi.ventleytech[5],
    detailedInfo: {
      overview: 'Turn your data into a competitive advantage with our comprehensive data engineering and science services. We build robust data pipelines, implement analytics platforms, and extract actionable insights from complex datasets.',
      features: [
        'Data Pipeline Development',
        'Data Warehouse & Lake Implementation',
        'ETL/ELT Process Automation',
        'Business Intelligence & Analytics',
        'Real-time Data Processing',
        'Advanced Analytics & Visualization'
      ],
      benefits: [
        'Centralize data from multiple sources',
        'Process large volumes of data efficiently',
        'Generate real-time insights for decision-making',
        'Improve data quality and governance',
        'Reduce time-to-insight significantly'
      ],
      technologies: ['Apache Kafka', 'Snowflake', 'Databricks', 'Apache Airflow', 'Power BI', 'Tableau', 'Python', 'SQL']
    }
  },
  {
    title: 'IT Staffing & Recruitment Services',
    desc: 'Our IT Staffing Division connects clients with top-tier technology professionals across the USA, offering both C2C and W2 hiring models.',
    img: imgApi.ventleytech[6],
    detailedInfo: {
      overview: 'Access elite technology talent through our comprehensive IT staffing solutions. We specialize in connecting organizations with skilled professionals who drive innovation and excellence across all technical domains.',
      features: [
        'Contract & Permanent Placement',
        'C2C & W2 Hiring Models',
        'Specialized Technical Recruitment',
        'Pre-vetted Talent Pool',
        'Rapid Deployment (48-72 hours)',
        'Dedicated Account Management'
      ],
      benefits: [
        'Access to nationwide network of tech professionals',
        'Reduced time-to-hire with pre-screened candidates',
        'Flexible engagement models to suit your needs',
        'Lower recruitment costs compared to traditional agencies',
        'Ongoing support and candidate management'
      ],
      technologies: ['Full-Stack Developers', 'Cloud Engineers', 'Data Scientists', 'QA Engineers', 'DevOps Specialists', 'AI/ML Engineers']
    }
  },
  {
    title: 'Managed & Consulting Services',
    desc: 'We offer strategic consulting and managed services to help organizations optimize operations, adopt new technologies, and ensure continuous innovation.',
    img: imgApi.ventleytech[7],
    detailedInfo: {
      overview: 'Partner with our experienced consultants to navigate digital transformation, optimize IT operations, and implement best practices. Our managed services ensure your technology infrastructure runs smoothly while you focus on core business objectives.',
      features: [
        'IT Strategy & Roadmap Development',
        'Digital Transformation Consulting',
        '24/7 Infrastructure Management',
        'Application Support & Maintenance',
        'Technology Assessment & Optimization',
        'Vendor Management'
      ],
      benefits: [
        'Reduce operational costs by up to 30%',
        'Access to experienced technology advisors',
        'Proactive monitoring and issue resolution',
        'Focus on core business while we manage IT',
        'Align technology initiatives with business goals'
      ],
      technologies: ['ITIL', 'ServiceNow', 'Monitoring Tools', 'Cloud Platforms', 'Security Solutions', 'Project Management Tools']
    }
  }
];

function Services() {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const { classes } = useStyles();
  const slider = useRef(null);
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

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
                  onButtonClick={() => handleOpenModal(item)}
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

      <ServiceModal
        open={modalOpen}
        onClose={handleCloseModal}
        service={selectedService}
      />
    </div>
  );
}

export default Services;