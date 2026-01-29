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
import CaseCard2 from '../Cards/Case';
import CaseCard from './EnhancedCaseCard';
import useStyles from './case-study-style';
import useTitle from '../Title/title-style';

const categories = [
    'Data Engineering & Data Science',
    'AI & Machine Learning',
    'Software Development',
    'IT Staffing & Recruitment Services',
    'Cloud & DevOps Engineering'
];

// Industry scenario cards - generalized examples without specific company partnerships
const industryScenarios = [
    {
        logo: '/images/icons/fintech-icon.png',
        title: 'FinTech Product Company',
        desc: 'Helped a financial technology company scale their engineering team with specialized talent in payment processing, compliance, and security',
        tags: ['Payment Processing', 'Security', 'Compliance'],
        color: '#4CAF50',
        icon: '💰',
        category: 'AI & Machine Learning',  // Shows relevant scenarios
        size: 'medium',
        simple: false,
    },
    {
        logo: '/images/icons/it-services-icon.png',
        title: 'Global IT Services Firm',
        desc: 'Supported a global IT services organization with skilled professionals for enterprise software development, cloud migration, and digital transformation projects',
        tags: ['Enterprise Software', 'Cloud Migration', 'Digital Transformation'],
        color: '#2196F3',
        icon: '💻',
        category: 'Software Development',
        size: 'big',
        simple: false,
    },
    {
        logo: '/images/icons/healthcare-icon.png',
        title: 'Healthcare Analytics Startup',
        desc: 'Staffed a healthcare analytics startup with data scientists and engineers to build HIPAA-compliant predictive analytics platforms',
        tags: ['HIPAA Compliance', 'Data Science', 'Predictive Analytics'],
        color: '#FF5722',
        icon: '🏥',
        category: 'Data Engineering & Data Science',
        size: 'medium',
        simple: false,
    },
    {
        logo: '/images/icons/ecommerce-icon.png',
        title: 'E-commerce Platform',
        desc: 'Provided full-stack developers and DevOps engineers to modernize an e-commerce platform\'s infrastructure and improve performance',
        tags: ['Full-Stack Dev', 'DevOps', 'Performance'],
        color: '#FF9800',
        icon: '🛒',
        category: 'Software Development',
        size: 'big',
        simple: false,
    },
    {
        logo: '/images/icons/cloud-icon.png',
        title: 'Cloud Consulting Company',
        desc: 'Delivered cloud architects and infrastructure specialists to help clients migrate legacy systems to modern cloud environments',
        tags: ['Cloud Architecture', 'Infrastructure', 'Migration'],
        color: '#00BCD4',
        icon: '☁️',
        category: 'Cloud & DevOps Engineering',
        size: 'medium',
        simple: false,
    },
    {
        logo: '/images/icons/ai-startup-icon.png',
        title: 'AI Product Startup',
        desc: 'Sourced ML engineers and data scientists to accelerate development of AI-powered products and research initiatives',
        tags: ['Machine Learning', 'AI Products', 'Research'],
        color: '#9C27B0',
        icon: '🤖',
        category: 'AI & Machine Learning',
        size: 'big',
        simple: false,
    },
];

// Detailed industry scenarios by category - generalized examples
const scenariosByCategory = {
    'Data Engineering & Data Science': [
        {
            id: 1,
            industry: 'FinTech Product Company',
            project: 'Real-Time Fraud Detection System',
            description: 'Built a scalable data pipeline and ML models to detect fraudulent transactions in real-time for a digital payments platform',
            technologies: ['Apache Kafka', 'Python', 'Scikit-learn', 'AWS Kinesis', 'PostgreSQL'],
            result: '98% fraud detection rate, processing 5M+ transactions daily with <100ms latency',
            challenge: 'Handle high-volume transaction data with minimal latency while maintaining accuracy'
        },
        {
            id: 2,
            industry: 'Healthcare Analytics Startup',
            project: 'Patient Outcome Prediction Platform',
            description: 'Developed data engineering pipelines and predictive models to forecast patient health outcomes and optimize treatment plans',
            technologies: ['Python', 'TensorFlow', 'Apache Airflow', 'Snowflake', 'Tableau'],
            result: '92% prediction accuracy, reduced hospital readmission rates by 25%',
            challenge: 'Process sensitive healthcare data while maintaining HIPAA compliance and data quality'
        },
        {
            id: 3,
            industry: 'E-commerce Platform',
            project: 'Customer Behavior Analytics Engine',
            description: 'Created a big data analytics system to analyze customer behavior patterns and personalize shopping experiences',
            technologies: ['Spark', 'Hadoop', 'Python', 'Redshift', 'Looker'],
            result: '35% increase in conversion rates, 50% improvement in recommendation accuracy',
            challenge: 'Process petabytes of clickstream data and generate insights in near real-time'
        }
    ],
    'AI & Machine Learning': [
        {
            id: 4,
            industry: 'AI Product Startup',
            project: 'Natural Language Processing Platform',
            description: 'Built an advanced NLP engine for document understanding, sentiment analysis, and content generation',
            technologies: ['Python', 'PyTorch', 'Hugging Face', 'FastAPI', 'Docker'],
            result: 'Achieved 95% accuracy in document classification, processing 100K documents daily',
            challenge: 'Handle multiple languages and domain-specific terminology with high accuracy'
        },
        {
            id: 5,
            industry: 'E-commerce Platform',
            project: 'AI-Powered Visual Search',
            description: 'Implemented computer vision models enabling customers to search products using images',
            technologies: ['TensorFlow', 'OpenCV', 'ResNet', 'Elasticsearch', 'React'],
            result: '40% increase in product discovery, 3M+ image searches per month',
            challenge: 'Match diverse product images with varying quality and angles in milliseconds'
        },
        {
            id: 6,
            industry: 'FinTech Product Company',
            project: 'Credit Risk Assessment AI',
            description: 'Developed ML models for automated credit scoring and risk assessment with explainable AI',
            technologies: ['Python', 'XGBoost', 'SHAP', 'MLflow', 'Kubernetes'],
            result: '30% reduction in default rates, 5x faster loan approval process',
            challenge: 'Ensure model fairness and regulatory compliance while maintaining high accuracy'
        }
    ],
    'Software Development': [
        {
            id: 7,
            industry: 'Global IT Services Firm',
            project: 'Enterprise Resource Planning Modernization',
            description: 'Migrated legacy ERP system to modern cloud-native microservices architecture',
            technologies: ['React', 'Node.js', 'Spring Boot', 'Docker', 'Kubernetes', 'Azure'],
            result: '60% improvement in system performance, 50% reduction in maintenance costs',
            challenge: 'Ensure zero-downtime migration of critical business operations'
        },
        {
            id: 8,
            industry: 'Healthcare Analytics Startup',
            project: 'Telemedicine Platform Development',
            description: 'Built HIPAA-compliant telemedicine platform with video consultation, e-prescriptions, and health records',
            technologies: ['React', 'Node.js', 'WebRTC', 'PostgreSQL', 'AWS'],
            result: 'Served 100K+ patients, 99.9% uptime, full HIPAA compliance achieved',
            challenge: 'Ensure secure, real-time video streaming with patient data privacy'
        },
        {
            id: 9,
            industry: 'E-commerce Platform',
            project: 'Omnichannel Commerce Solution',
            description: 'Developed unified platform integrating online store, mobile app, and in-store POS systems',
            technologies: ['React Native', 'GraphQL', 'Node.js', 'MongoDB', 'Redis'],
            result: '3x increase in mobile transactions, unified inventory across 500+ stores',
            challenge: 'Synchronize real-time inventory and orders across multiple channels'
        }
    ],
    'IT Staffing & Recruitment Services': [
        {
            id: 10,
            industry: 'Cloud Consulting Company',
            project: 'Cloud Engineering Team Augmentation',
            description: 'Provided 15+ certified cloud architects and engineers for large-scale cloud transformation projects',
            technologies: ['AWS/Azure/GCP Certifications', 'Infrastructure as Code', 'DevOps Practices'],
            result: '95% placement retention rate, completed 30+ cloud migrations successfully',
            challenge: 'Source highly specialized cloud talent with specific certifications and industry experience'
        },
        {
            id: 11,
            industry: 'FinTech Product Company',
            project: 'Security & Compliance Team Expansion',
            description: 'Recruited cybersecurity specialists and compliance experts to meet regulatory requirements',
            technologies: ['Security Assessment', 'Compliance Frameworks', 'Technical Screening'],
            result: 'Placed 20+ security professionals, achieved SOC 2 and PCI DSS compliance',
            challenge: 'Find candidates with rare combination of fintech knowledge and security expertise'
        },
        {
            id: 12,
            industry: 'AI Product Startup',
            project: 'ML Engineering Team Build-out',
            description: 'Built entire ML engineering team from scratch for AI startup\'s product development',
            technologies: ['Technical Assessment', 'Culture Fit Evaluation', 'Onboarding Support'],
            result: '12 ML engineers hired within 3 months, 90% retention after 1 year',
            challenge: 'Compete with big tech for top ML talent while maintaining startup budget constraints'
        }
    ],
    'Cloud & DevOps Engineering': [
        {
            id: 13,
            industry: 'Global IT Services Firm',
            project: 'Multi-Cloud Infrastructure Setup',
            description: 'Designed and implemented multi-cloud strategy across AWS, Azure, and GCP for enterprise client',
            technologies: ['Terraform', 'CloudFormation', 'Azure DevOps', 'Kubernetes', 'Prometheus'],
            result: '45% cost reduction, 99.99% uptime SLA achieved, zero vendor lock-in',
            challenge: 'Manage complexity of multiple cloud providers while optimizing costs and performance'
        },
        {
            id: 14,
            industry: 'E-commerce Platform',
            project: 'Auto-scaling Infrastructure for Peak Traffic',
            description: 'Built highly available infrastructure handling 10x traffic spikes during sales events',
            technologies: ['AWS ECS/EKS', 'Auto Scaling Groups', 'CloudFront', 'RDS', 'ElastiCache'],
            result: 'Successfully handled 5M concurrent users during Black Friday, zero downtime',
            challenge: 'Design cost-effective infrastructure that can scale massively during peak events'
        },
        {
            id: 15,
            industry: 'FinTech Product Company',
            project: 'Security-First CI/CD Pipeline',
            description: 'Implemented automated DevSecOps pipeline with security scanning and compliance checks',
            technologies: ['Jenkins', 'GitLab CI', 'SonarQube', 'Vault', 'Docker', 'ArgoCD'],
            result: '90% reduction in security vulnerabilities, 20+ daily deployments with zero incidents',
            challenge: 'Balance rapid deployment needs with stringent financial industry security requirements'
        }
    ]
};

function IndustryScenarios() {
    const theme = useTheme();
    const { classes, cx } = useStyles();
    const { classes: title } = useTitle();
    const { t } = useTranslation('common');
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(categories[0]);
    const [modalOpen, setModalOpen] = useState(false);

    function handleListItemClick(event, index) {
        setSelectedIndex(index);
        setModalOpen(true);
    }

    function getSelectedScenarios() {
        return scenariosByCategory[selectedIndex] || [];
    }

    function onMovePrevRequest() {
        setPhotoIndex((photoIndex + industryScenarios.length - 1) % industryScenarios.length);
    }

    function onMoveNextRequest() {
        setPhotoIndex((photoIndex + industryScenarios.length + 1) % industryScenarios.length);
    }

    function showPopup(index) {
        // Get the category from the industry card and open the modal with relevant scenarios
        const card = industryScenarios[index];
        if (card && card.category) {
            setSelectedIndex(card.category);
            setModalOpen(true);
        }
    }

    function showLightbox(index) {
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
            tags={item.tags || []}
            color={item.color || '#2196F3'}
            icon={item.icon || ''}
            category={item.category || ''}
            openPopup={() => showPopup(index)}
        />
    );

    const selectedScenarios = getSelectedScenarios();

    return (
        <div className={classes.root}>
            {lightboxOpen && (
                <Lightbox
                    mainSrc={industryScenarios[photoIndex].bg || industryScenarios[photoIndex].logo}
                    nextSrc={industryScenarios[(photoIndex + 1) % industryScenarios.length].bg || industryScenarios[(photoIndex + 1) % industryScenarios.length].logo}
                    prevSrc={industryScenarios[(photoIndex + 1) % industryScenarios.length].logo || null}
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
                    {selectedIndex} - Industry Scenarios
                </DialogTitle>
                <DialogContent sx={{ padding: '24px', backgroundColor: '#f5f5f5' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
                        {selectedScenarios.length > 0 ? (
                            selectedScenarios.map((scenario) => (
                                <Box
                                    key={scenario.id}
                                    sx={{
                                        backgroundColor: 'white',
                                        padding: '20px',
                                        borderRadius: '8px',
                                        border: '1px solid #e0e0e0',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                    }}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: '8px' }}>
                                        {scenario.project}
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ color: '#666', marginBottom: '12px', fontStyle: 'italic' }}>
                                        Industry: {scenario.industry}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '16px', color: '#333', lineHeight: 1.6 }}>
                                        {scenario.description}
                                    </Typography>

                                    {scenario.challenge && (
                                        <Box sx={{ marginBottom: '16px', padding: '12px', backgroundColor: '#fff3e0', borderRadius: '4px', borderLeft: '4px solid #ff9800' }}>
                                            <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', marginBottom: '4px', color: '#f57c00' }}>
                                                Challenge:
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#333' }}>
                                                {scenario.challenge}
                                            </Typography>
                                        </Box>
                                    )}

                                    <Box sx={{ marginBottom: '16px' }}>
                                        <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                                            Technologies Used:
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            {scenario.technologies.map((tech, idx) => (
                                                <Chip
                                                    key={idx}
                                                    label={tech}
                                                    size="small"
                                                    sx={{ backgroundColor: '#e3f2fd', color: '#1976d2', fontWeight: '500' }}
                                                />
                                            ))}
                                        </Box>
                                    </Box>

                                    <Box sx={{ backgroundColor: '#e8f5e9', padding: '12px', borderRadius: '4px', borderLeft: '4px solid #4caf50' }}>
                                        <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', marginBottom: '4px', color: '#2e7d32' }}>
                                            Results Achieved:
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#2e7d32', fontWeight: '500' }}>
                                            ✓ {scenario.result}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))
                        ) : (
                            <Typography>No industry scenarios available for this category.</Typography>
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
                                    Industry Scenarios
                                </Typography>
                                <Typography variant="body2" sx={{ marginTop: 2, marginBottom: 3, color: '#666' }}>
                                    Explore how we've helped businesses across various industries succeed with tailored IT staffing solutions
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
                        <Box sx={{ marginBottom: 3 }}>
                            <Typography variant="body1" sx={{ color: '#666', fontStyle: 'italic' }}>
                                Click on any industry card below to explore detailed scenarios
                            </Typography>
                        </Box>
                        <div className={classes.massonry}>
                            <Grid container spacing={2.5}>
                                {industryScenarios.map((item, index) => (
                                    <Grid
                                        key={index.toString()}
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
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

export default IndustryScenarios;