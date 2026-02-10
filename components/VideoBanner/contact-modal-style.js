import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles({ uniqId: 'contact-modal' })((theme) => ({
  dialog: {
    '& .MuiDialog-paper': {
      borderRadius: 12,
      maxWidth: 900,
      backgroundColor: '#ffffff',
    }
  },
  dialogPaper: {
    backgroundColor: '#ffffff',
  },
  dialogTitle: {
    position: 'relative',
    padding: '32px 32px 24px 32px',
    backgroundColor: '#1E88E5',  // Solid blue color
    color: '#ffffff',
  },
  title: {
    fontWeight: 700,
    marginBottom: 8,
    color: '#ffffff',
    fontSize: '2rem',
    lineHeight: 1.2,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.75rem',
    }
  },
  subtitle: {
    color: '#ffffff',
    fontSize: '1rem',
    lineHeight: 1.5,
    opacity: 1,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    color: '#ffffff',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    }
  },
  dialogContent: {
    padding: '32px',
    backgroundColor: '#ffffff',
    paddingTop: '24px !important',  // Added paddingTop for proper alignment
    [theme.breakpoints.down('sm')]: {
      padding: '24px 16px',
      paddingTop: '20px !important',
    }
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#ffffff',
      borderRadius: 4,
      '& fieldset': {
        borderColor: '#E0E0E0',  // Light gray border
        borderWidth: 1,
        transition: 'border-color 0.2s ease',
      },
      '&:hover fieldset': {
        borderColor: '#BDBDBD',  // Slightly darker on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1E88E5',  // Blue on focus
        borderWidth: 2,
      },
      '&.Mui-error fieldset': {
        borderColor: '#f44336',
      }
    },
    '& .MuiOutlinedInput-input': {
      padding: '15px 16px',  // Consistent padding
      fontSize: '0.9375rem',  // 15px
      color: '#424242',
      lineHeight: 1.5,
      '&::placeholder': {
        color: '#757575',  // Gray placeholder
        opacity: 1,
      }
    },
    '& .MuiOutlinedInput-multiline': {
      padding: 0,
    },
    '& .MuiFormHelperText-root': {
      marginLeft: 4,
      marginTop: 4,
      fontSize: '0.75rem',
      '&.Mui-error': {
        color: '#f44336',
      }
    }
  },
  input: {
    backgroundColor: '#ffffff',
  },
  selectControl: {
    marginTop: '0 !important',
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#ffffff',
      borderRadius: 4,
      '& fieldset': {
        borderColor: '#E0E0E0',
        borderWidth: 1,
      },
      '&:hover fieldset': {
        borderColor: '#BDBDBD',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1E88E5',
        borderWidth: 2,
      },
    }
  },
  select: {
    fontSize: '0.9375rem',
    color: '#424242',
    padding: '15px 16px !important',
    '& .MuiSelect-select': {
      padding: '0 !important',
      paddingRight: '32px !important',
      minHeight: 'auto !important',
    },
    '&[aria-expanded="false"]': {
      color: '#757575',  // Gray when nothing selected
    },
  },
  selectMenu: {
    '& .MuiMenuItem-root': {
      fontSize: '0.9375rem',
      padding: '12px 16px',
      color: '#424242',
      '&:hover': {
        backgroundColor: '#F5F5F5',
      },
      '&.Mui-selected': {
        backgroundColor: '#E3F2FD',
        '&:hover': {
          backgroundColor: '#BBDEFB',
        }
      },
      '&[disabled]': {
        color: '#757575',
      }
    }
  },
  checkbox: {
    color: '#757575',
    padding: '8px',
    '&.Mui-checked': {
      color: '#1E88E5',
    }
  },
  checkboxLabel: {
    fontSize: '0.875rem',
    color: '#424242',
    lineHeight: 1.5,
  },
  link: {
    color: '#1E88E5',
    textDecoration: 'none',
    fontWeight: 500,
    '&:hover': {
      textDecoration: 'underline',
    }
  },
  submitButton: {
    height: 54,
    fontWeight: 600,
    fontSize: '0.9375rem',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginTop: 8,
    backgroundColor: '#1E88E5',  // Solid blue
    color: '#ffffff',
    borderRadius: 4,
    boxShadow: 'none',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#1976D2',  // Darker blue on hover
      boxShadow: '0 4px 12px rgba(30, 136, 229, 0.3)',
    },
    '&:active': {
      backgroundColor: '#1565C0',  // Even darker when clicked
      boxShadow: '0 2px 8px rgba(30, 136, 229, 0.4)',
    },
    '& .MuiButton-endIcon': {
      marginLeft: 8,
    }
  },
  errorText: {
    marginTop: 4,
    marginLeft: 4,
    fontSize: '0.75rem',
    color: '#f44336',
  }
}));

export default useStyles;
