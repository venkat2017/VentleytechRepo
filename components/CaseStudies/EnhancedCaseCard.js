import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { alpha } from '@mui/material/styles';

function EnhancedCaseCard(props) {
    const {
        title,
        desc,
        logo,
        bg,
        size,
        simple,
        openPopup,
        tags,
        color,
        icon
    } = props;

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '16px',
                border: '1px solid',
                borderColor: 'divider',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 24px ${alpha(color || '#2196F3', 0.15)}`,
                    borderColor: color || '#2196F3',
                    '& .card-icon': {
                        transform: 'scale(1.1) rotate(5deg)',
                    },
                    '& .explore-btn': {
                        backgroundColor: color || '#2196F3',
                        color: '#fff',
                    }
                }
            }}
        >
            {/* Decorative Background Pattern */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '120px',
                    height: '120px',
                    background: `radial-gradient(circle at top right, ${alpha(color || '#2196F3', 0.06)} 0%, transparent 70%)`,
                    pointerEvents: 'none',
                }}
            />

            <CardContent sx={{ flexGrow: 1, padding: 2.5, position: 'relative' }}>
                {/* Icon Badge */}
                <Box
                    className="card-icon"
                    sx={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '14px',
                        background: `linear-gradient(135deg, ${color || '#2196F3'}, ${alpha(color || '#2196F3', 0.7)})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 1.5,
                        fontSize: '28px',
                        transition: 'transform 0.3s ease',
                        boxShadow: `0 4px 12px ${alpha(color || '#2196F3', 0.2)}`,
                    }}
                >
                    {icon || '🚀'}
                </Box>

                {/* Title */}
                <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                        fontWeight: 700,
                        marginBottom: 1,
                        color: '#1a1a1a',
                        fontSize: '1.1rem',
                        lineHeight: 1.3,
                    }}
                >
                    {title}
                </Typography>

                {/* Description */}
                <Typography
                    variant="body2"
                    sx={{
                        color: '#666',
                        marginBottom: 1.5,
                        lineHeight: 1.5,
                        fontSize: '0.875rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {desc}
                </Typography>

                {/* Tags/Chips */}
                {tags && tags.length > 0 && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 0.75,
                            marginBottom: 1.5,
                        }}
                    >
                        {tags.slice(0, 3).map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag}
                                size="small"
                                sx={{
                                    backgroundColor: alpha(color || '#2196F3', 0.1),
                                    color: color || '#2196F3',
                                    fontWeight: 600,
                                    fontSize: '0.7rem',
                                    height: '24px',
                                    border: `1px solid ${alpha(color || '#2196F3', 0.2)}`,
                                    '& .MuiChip-label': {
                                        padding: '0 8px',
                                    },
                                    '&:hover': {
                                        backgroundColor: alpha(color || '#2196F3', 0.15),
                                    }
                                }}
                            />
                        ))}
                    </Box>
                )}
            </CardContent>

            {/* Action Button */}
            <CardActions sx={{ padding: 2.5, paddingTop: 0 }}>
                <Button
                    className="explore-btn"
                    fullWidth
                    variant="outlined"
                    onClick={openPopup}
                    sx={{
                        borderRadius: '10px',
                        padding: '8px 20px',
                        fontWeight: 600,
                        borderColor: color || '#2196F3',
                        color: color || '#2196F3',
                        textTransform: 'none',
                        fontSize: '0.875rem',
                        transition: 'all 0.3s ease',
                        borderWidth: '2px',
                        '&:hover': {
                            borderWidth: '2px',
                            borderColor: color || '#2196F3',
                        }
                    }}
                >
                    Explore Scenarios →
                </Button>
            </CardActions>
        </Card>
    );
}

EnhancedCaseCard.propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    logo: PropTypes.string,
    bg: PropTypes.string,
    size: PropTypes.string,
    simple: PropTypes.bool,
    openPopup: PropTypes.func,
    tags: PropTypes.arrayOf(PropTypes.string),
    color: PropTypes.string,
    icon: PropTypes.string,
};

EnhancedCaseCard.defaultProps = {
    logo: '',
    bg: '',
    size: 'medium',
    simple: false,
    openPopup: () => {},
    tags: [],
    color: '#2196F3',
    icon: '🚀',
};

export default EnhancedCaseCard;