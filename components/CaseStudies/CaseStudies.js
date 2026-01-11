import React, { useState } from 'react';
import Lightbox from 'react-18-image-lightbox';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import ScrollAnimation from 'react-scroll-animation-wrapper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { useTranslation } from 'next-i18next';
import imgApi from 'public/images/imgAPI';
import CaseCard from '../Cards/Case';
import useStyles from './case-study-style';
import useTitle from '../Title/title-style';

const categories = [
    'Data Engineering & Data Science',
    'AI & Machine Learning',
    'Software Development',
    'IT Staffing & Recruitment Services',
    'Cloud & DevOps Engineering'
];

const caseData = [
    {
        logo: '/images/logos/hcltech-new-logo.png',
        title: '',
        desc: 'We are proud to partner with HCL Technologies, one of the world\'s leading IT services and consulting organizations.',
        size: 'medium',
        simple: true,
    },
    {
        logo: '/images/logos/capgeminiBlue.png',
        title: '',
        desc: 'we deliver enterprise-grade software solutions, digital transformation programs, and cloud-based systems with efficiency and agility.',
        size: 'big',
        simple: true,
    },
    {
        logo: '/images/logos/Saicon.png',
        title: '',
        desc: 'delivering high-quality talent and project solutions across industries such as Banking, Healthcare, and Retail',
        size: 'medium',
        simple: true,
    },
    {
        logo: '/images/logos/Sira-Group.png',
        title: '',
        desc: 'Saicon helps us strengthen our US-based recruitment and technology service capabilities',
        size: 'big',
        simple: true,
    },
    {
        logo: '/images/logos/barclays-wordmark.png',
        title: '',
        desc: 'Our work with Barclays focuses on technology modernization, process automation, and quality assurance for enterprise systems',
        size: 'medium',
        simple: true,
    },
    {
        logo: '/images/logos/techmatrix-logo-white.png',
        title: '',
        desc: 'Our partnership with Tech Matrix enhances our software engineering, testing, and automation services, enabling faster, high-quality project execution',
        size: 'big',
        simple: true,
    },
];

const caseStudiesByCategory = {
    'Data Engineering & Data Science': [
        {
            id: 1,
            company: 'DataCorp Analytics',
            project: 'Data Pipeline Optimization',
            description: 'Built scalable ETL pipelines processing 10TB+ daily data',
            technologies: ['Apache Spark', 'Python', 'AWS S3', 'PostgreSQL'],
            result: '50% reduction in processing time, 30% cost savings'
        },
        {
            id: 2,
            company: 'InsightHub',
            project: 'ML-Powered Analytics Platform',
            description: 'Developed predictive analytics platform for business intelligence',
            technologies: ['Python', 'TensorFlow', 'Tableau', 'Redshift'],
            result: '95% prediction accuracy, 40+ dashboards deployed'
        }
    ],
    'AI & Machine Learning': [
        {
            id: 3,
            company: 'SmartAI Solutions',
            project: 'Computer Vision Application',
            description: 'Implemented image recognition system for quality control',
            technologies: ['Python', 'PyTorch', 'OpenCV', 'TensorFlow'],
            result: '99.2% accuracy, 10x faster than manual inspection'
        },
        {
            id: 4,
            company: 'NLPTech',
            project: 'Conversational AI Chatbot',
            description: 'Built AI chatbot handling 100K+ customer queries daily',
            technologies: ['Node.js', 'GPT-4', 'LangChain', 'MongoDB'],
            result: '85% customer satisfaction, 24/7 availability'
        }
    ],
    'Software Development': [
        {
            id: 5,
            company: 'TechCorp Inc',
            project: 'E-Commerce Platform Modernization',
            description: 'Migrated legacy monolithic application to microservices architecture',
            technologies: ['React', 'Node.js', 'Docker', 'Kubernetes'],
            result: '40% performance improvement, 60% reduced deployment time'
        },
        {
            id: 6,
            company: 'FinanceFlow Solutions',
            project: 'Real-time Analytics Dashboard',
            description: 'Built interactive dashboard for financial data visualization',
            technologies: ['React', 'TypeScript', 'D3.js', 'PostgreSQL'],
            result: '99.9% uptime, processes 1M+ data points daily'
        },
        {
            id: 7,
            company: 'HealthHub Systems',
            project: 'Patient Management System',
            description: 'Developed HIPAA-compliant healthcare management platform',
            technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
            result: 'Served 50,000+ patients, 99.95% uptime'
        }
    ],
    'IT Staffing & Recruitment Services': [
        {
            id: 8,
            company: 'TalentBridge Corp',
            project: 'Tech Talent Acquisition',
            description: 'Staffed 50+ senior developers for Fortune 500 enterprise',
            technologies: ['Recruitment Platform', 'Skill Assessment', 'Background Checks'],
            result: '95% placement rate, avg. 2-week placement time'
        },
        {
            id: 9,
            company: 'GlobalStaff Solutions',
            project: 'Offshore Development Team',
            description: 'Built and managed dedicated development team for client',
            technologies: ['Team Management', 'Project Tracking', 'Quality Assurance'],
            result: '20 developers placed, 98% retention rate'
        }
    ],
    'Cloud & DevOps Engineering': [
        {
            id: 10,
            company: 'CloudFirst Industries',
            project: 'Cloud Migration',
            description: 'Migrated on-premise infrastructure to AWS with zero downtime',
            technologies: ['AWS', 'Terraform', 'CI/CD', 'Docker'],
            result: '40% infrastructure cost reduction, 99.99% uptime'
        },
        {
            id: 11,
            company: 'DevOps Dynamics',
            project: 'CI/CD Pipeline Implementation',
            description: 'Automated deployment pipeline for enterprise applications',
            technologies: ['Jenkins', 'GitLab CI', 'Kubernetes', 'Prometheus'],
            result: '10x faster deployments, 99.9% deployment success rate'
        }
    ]
};

function CaseStudies() {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    const { t } = useTranslation('common');

    const [photoIndex, setPhotoIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState('Software Development');

    const { classes, cx } = useStyles();
    const { classes: title } = useTitle();

    const getSelectedCaseStudies = () => {
        return caseStudiesByCategory[selectedIndex] || [];
    };

    function handleListItemClick(event, index) {
        setSelectedIndex(index);
        setModalOpen(true);
    }

    function onMovePrevRequest() {
        setPhotoIndex((photoIndex + caseData.length - 1) % caseData.length);
    }

    function onMoveNextRequest() {
        setPhotoIndex((photoIndex + caseData.length + 1) % caseData.length);
    }

    function showPopup(index) {
        setLightboxOpen(true);
        setPhotoIndex(index);
    }

    function handleCloseModal() {
        setModalOpen(false);
    }

    const renderCard = (item, index) => (
        <CaseCard
            key={index.toString()}
            bg={item.bg || ''}
            logo={item.logo}
            title={item.title}
            desc={item.desc}
            size={item.size}
            simple={item.simple || false}
            openPopup={() => showPopup(index)}
        />
    );

    const selectedCaseStudies = getSelectedCaseStudies();

    return (
        <div className={classes.root}>
            {lightboxOpen && (
                <Lightbox
                    mainSrc={caseData[photoIndex].bg || caseData[photoIndex].logo}
                    nextSrc={caseData[(photoIndex + 1) % caseData.length].bg || caseData[(photoIndex + 1) % caseData.length].logo}
                    prevSrc={caseData[(photoIndex + 1) % caseData.length].logo || null}
                    onCloseRequest={() => setLightboxOpen(false)}
                    onMovePrevRequest={onMovePrevRequest}
                    onMoveNextRequest={onMoveNextRequest}
                />
            )}

            <Dialog
                open={modalOpen}
                onClose={handleCloseModal}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: '8px' }
                }}
            >
                <DialogTitle sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>
                    {selectedIndex} - Case Studies
                </DialogTitle>
                <DialogContent sx={{ padding: '24px', backgroundColor: '#f5f5f5' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
                        {selectedCaseStudies.length > 0 ? (
                            selectedCaseStudies.map((caseStudy) => (
                                <Box
                                    key={caseStudy.id}
                                    sx={{
                                        backgroundColor: 'white',
                                        padding: '16px',
                                        borderRadius: '8px',
                                        border: '1px solid #e0e0e0'
                                    }}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: '8px' }}>
                                        {caseStudy.project}
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ color: '#666', marginBottom: '8px' }}>
                                        Client: {caseStudy.company}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '12px', color: '#333' }}>
                                        {caseStudy.description}
                                    </Typography>
                                    <Box sx={{ marginBottom: '12px' }}>
                                        <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                                            Technologies:
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            {caseStudy.technologies.map((tech, idx) => (
                                                <Chip
                                                    key={idx}
                                                    label={tech}
                                                    size="small"
                                                    sx={{ backgroundColor: '#e3f2fd', color: '#1976d2' }}
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                    <Box sx={{ backgroundColor: '#e8f5e9', padding: '8px', borderRadius: '4px' }}>
                                        <Typography variant="body2" sx={{ color: '#2e7d32', fontWeight: '500' }}>
                                            ✓ Results: {caseStudy.result}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))
                        ) : (
                            <Typography>No case studies available for this category.</Typography>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ padding: '16px', backgroundColor: '#f5f5f5' }}>
                    <Button onClick={handleCloseModal} variant="contained" sx={{ backgroundColor: '#1976d2' }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Container fixed={isDesktop}>
                <Grid container spacing={6}>
                    <Grid item md={3} xs={12}>
                        <ScrollAnimation
                            animateOnce
                            animateIn="fadeInRightShort"
                            offset={-100}
                            delay={200}
                            duration={0.3}
                        >
                            <div>
                                <Typography variant="h4" className={title.primary}>
                                    {t('ventleytech-landing.case_title')}
                                </Typography>
                                <List component="nav">
                                    {categories.map((item, index) => (
                                        <ListItem
                                            button
                                            key={index.toString()}
                                            className={cx(classes.filter, selectedIndex === item && classes.active)}
                                            onClick={event => handleListItemClick(event, item)}
                                            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f0f0f0' } }}
                                        >
                                            <ListItemText primary={item} />
                                        </ListItem>
                                    ))}
                                </List>
                            </div>
                        </ScrollAnimation>
                    </Grid>
                    <Grid item md={9} xs={12}>
                        <div className={classes.massonry}>
                            <Grid container spacing={3} alignItems="stretch">
                                {caseData.map((item, index) => (
                                    <Grid
                                        key={index.toString()}
                                        item
                                        xs={12}
                                        sm={item.size === 'big' ? 6 : item.size === 'medium' ? 4 : 3}
                                        sx={{ display: 'flex' }}
                                    >
                                        <ScrollAnimation
                                            animateOnce
                                            animateIn="fadeInUpShort"
                                            offset={-100}
                                            delay={200 + index * 100}
                                            duration={0.4}
                                            style={{ width: '100%', display: 'flex' }}
                                        >
                                            <div style={{ width: '100%', display: 'flex' }}>
                                                {renderCard(item, index)}
                                            </div>
                                        </ScrollAnimation>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default CaseStudies;