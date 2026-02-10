import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useTranslation } from 'next-i18next';
import useStyles from './contact-modal-style';

function ContactModal({ open, onClose }) {
  const { classes } = useStyles();
  const { t } = useTranslation('common');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    inquiryType: '',
    message: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ open: false, type: '', message: '' });

  const inquiryTypes = [
    { value: 'staffing', label: 'IT Staffing & Recruitment' },
    { value: 'project', label: 'Software Development & Project Services' },
    { value: 'both', label: 'Both Services' },
    { value: 'partnership', label: 'Partnership Opportunities' },
    { value: 'other', label: 'Other Inquiry' }
  ];

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'acceptTerms' ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.inquiryType) {
      newErrors.inquiryType = 'Please select an inquiry type';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and privacy policy';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Replace this with your actual API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus({
          open: true,
          type: 'success',
          message: 'Thank you for contacting us! We will get back to you within 24 hours.'
        });
        
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          inquiryType: '',
          message: '',
          acceptTerms: false
        });
        
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      setSubmitStatus({
        open: true,
        type: 'error',
        message: 'Something went wrong. Please try again or email us directly at info@ventleytech.com'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSubmitStatus({ ...submitStatus, open: false });
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="md"
        fullWidth
        className={classes.dialog}
        PaperProps={{
          className: classes.dialogPaper
        }}
      >
        <DialogTitle className={classes.dialogTitle}>
          <Typography variant="h4" component="div" className={classes.title}>
            {t('contact_title')}
          </Typography>
          <Typography variant="body1" className={classes.subtitle}>
            {t('contact_subtitle')}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            className={classes.closeButton}
            size="large"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent className={classes.dialogContent}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  placeholder="Full Name? *"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                  variant="outlined"
                  required
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: false,
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  placeholder="Email? *"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  variant="outlined"
                  required
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: false,
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  placeholder="Phone Number?"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  variant="outlined"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: false,
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  placeholder="Company Name?"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  variant="outlined"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: false,
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl 
                  fullWidth 
                  variant="outlined"
                  error={!!errors.inquiryType}
                  required
                  className={classes.selectControl}
                >
                  <Select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.select}
                    MenuProps={{
                      className: classes.selectMenu
                    }}
                  >
                    <MenuItem value="" disabled>
                      What are you interested in? *
                    </MenuItem>
                    {inquiryTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.inquiryType && (
                    <Typography variant="caption" color="error" className={classes.errorText}>
                      {errors.inquiryType}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder="Enter your message here *"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  error={!!errors.message}
                  helperText={errors.message}
                  variant="outlined"
                  multiline
                  rows={4}
                  required
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: false,
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      className={classes.checkbox}
                    />
                  }
                  label={
                    <Typography variant="body2" className={classes.checkboxLabel}>
                      {t('form_terms')} <a href="/terms" target="_blank" className={classes.link}>Terms of Service</a> & <a href="/privacy" target="_blank" className={classes.link}>Privacy Policy</a> *
                    </Typography>
                  }
                />
                {errors.acceptTerms && (
                  <Typography variant="caption" color="error" display="block" className={classes.errorText}>
                    {errors.acceptTerms}
                  </Typography>
                )}
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  className={classes.submitButton}
                  endIcon={<SendIcon />}
                >
                  SEND MESSAGE
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={submitStatus.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={submitStatus.type} sx={{ width: '100%' }}>
          {submitStatus.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ContactModal;
