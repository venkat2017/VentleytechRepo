// pages/login.js or components/Login.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useTranslation } from 'next-i18next';
import { useText } from 'theme/common';
import AuthFrame from './AuthFrame';
import useStyles from './form-style-login';
import Title from "../Title/Title";

function Login() {
    const { classes, cx } = useStyles();
    const { classes: text } = useText();
    const router = useRouter();
    const { t } = useTranslation('common');

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const [check, setCheck] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== values.password) {
                return false;
            }
            return true;
        });

        // Check if already logged in
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/dashboard');
        }
    }, [router]);

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
        setError(''); // Clear error when user starts typing
    };

    const handleCheck = (event) => {
        setCheck(event.target.checked);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                    rememberMe: check,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Login failed');
                setLoading(false);
                return;
            }

            // Store token and user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            setSuccess('Login successful! Redirecting...');

            // Redirect after short delay
            setTimeout(() => {
                router.push('/dashboard');
            }, 1000);
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred. Please try again.');
            setLoading(false);
        }
    };

    return (
        <AuthFrame title={t('login_title')} subtitle={t('login_subtitle')}>
            <div>
                <div className={classes.head}>
                    <Title
                        head={t('login')}
                        desc=""
                        align="left"
                        color="secondary"
                    />
                </div>

                {error && (
                    <Alert severity="error" style={{ marginBottom: '16px' }}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" style={{ marginBottom: '16px' }}>
                        {success}
                    </Alert>
                )}

                <ValidatorForm
                    onError={(errors) => console.log(errors)}
                    onSubmit={handleSubmit}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextValidator
                                variant="filled"
                                className={classes.input}
                                label={t('login_email')}
                                onChange={handleChange('email')}
                                name="email"
                                value={values.email}
                                validators={['required', 'isEmail']}
                                errorMessages={[
                                    'This field is required',
                                    'Email is not valid',
                                ]}
                                fullWidth
                                disabled={loading}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                variant="filled"
                                type="password"
                                className={classes.input}
                                label={t('login_password')}
                                validators={['required']}
                                onChange={handleChange('password')}
                                errorMessages={['This field is required']}
                                name="password"
                                value={values.password}
                                fullWidth
                                disabled={loading}
                            />
                        </Grid>
                    </Grid>

                    <div className={classes.formHelper}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={check}
                                    onChange={handleCheck}
                                    color="secondary"
                                    value={check}
                                    className={classes.check}
                                    disabled={loading}
                                />
                            }
                            label={
                                <span className={text.caption}>
                  {t('login_remember')}
                </span>
                            }
                        />
                    </div>

                    <div className={classes.btnArea}>
                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            color="secondary"
                            size="large"
                            disabled={loading}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                t('continue')
                            )}
                        </Button>
                    </div>
                </ValidatorForm>
            </div>
        </AuthFrame>
    );
}

export default Login;