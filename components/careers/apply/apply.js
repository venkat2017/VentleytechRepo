
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './apply.module.css';

export default function Apply() {
    const router = useRouter();
    const { jobTitle, jobId } = router.query;

    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        contactNumber: '',
        email: '',
        location: '',
        visaStatus: '',
        totalExperience: '',
        relevantExperience: '',
        skills: '',
        certifications: '',
        education: '',
        linkedinProfile: '',
        joiningAvailability: '',
        day1Onsite: '',
        interviewAvailability: '',
        resume: null,
        jobTitle: jobTitle || '',
        jobId: jobId || ''
    });

    useEffect(() => {
        if (jobTitle) {
            setFormData(prev => ({ ...prev, jobTitle, jobId }));
        }
    }, [jobTitle, jobId]);

    const visaStatusOptions = [
        'H-1B',
        'H4EAD',
        'Green Card',
        'US Citizen',
        'OPT',
        'CPT',
        'L-1',
        'L-2 EAD',
        'TN Visa',
        'Other'
    ];

    const joiningAvailabilityOptions = [
        'Immediate',
        '2 Weeks',
        '30 Days',
        '30+ Days'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({
                ...prev,
                resume: e.target.files[0]
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null && formData[key] !== '') {
                    formDataToSend.append(key, formData[key]);
                }
            });

            const response = await fetch('/api/careers/applications', {
                method: 'POST',
                body: formDataToSend
            });

            const data = await response.json();

            if (data.success) {
                // Send confirmation email
                await fetch('/api/careers/send-confirmation', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: formData.email,
                        jobTitle: formData.jobTitle,
                        fullName: formData.fullName
                    })
                });

                setSubmitted(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                alert('Failed to submit application. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('Error submitting application. Please try again.');
        }
    };

    if (submitted) {
        return (
            <div className={styles.successWrapper}>
                <div className={styles.successCard}>
                    <div className={styles.successIcon}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1>Application Submitted Successfully!</h1>
                    <p className={styles.successText}>
                        Thank you for applying for the position of <strong>{jobTitle}</strong>.
                    </p>
                    <p className={styles.successDesc}>
                        We have received your application and a confirmation email has been sent to <strong>{formData.email}</strong>.
                        Our team will review your application and contact you soon.
                    </p>
                    <div className={styles.successButtons}>
                        <button onClick={() => router.push('/careers')} className={styles.primaryButton}>
                            Back to Careers
                        </button>
                        <button onClick={() => router.push('/')} className={styles.secondaryButton}>
                            Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.applyWrapper}>
            {/* Header */}


            {/* Application Form */}
            <div className={styles.container}>
                <div className={styles.formCard}>
                    <form onSubmit={handleSubmit} className={styles.form}>

                        {/* Personal Information */}
                        <div className={styles.formSection}>
                            <h2>Personal Information</h2>
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label>Full Name *</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        required
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Contact Number *</label>
                                    <input
                                        type="tel"
                                        name="contactNumber"
                                        required
                                        value={formData.contactNumber}
                                        onChange={handleInputChange}
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="john.doe@email.com"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Location (City, State) *</label>
                                    <input
                                        type="text"
                                        name="location"
                                        required
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="Philadelphia, PA"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Current Visa Status *</label>
                                    <select
                                        name="visaStatus"
                                        required
                                        value={formData.visaStatus}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Visa Status</option>
                                        {visaStatusOptions.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>LinkedIn Profile</label>
                                    <input
                                        type="url"
                                        name="linkedinProfile"
                                        value={formData.linkedinProfile}
                                        onChange={handleInputChange}
                                        placeholder="https://linkedin.com/in/johndoe"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Professional Experience */}
                        <div className={styles.formSection}>
                            <h2>Professional Experience</h2>
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label>Total Experience (Years) *</label>
                                    <input
                                        type="text"
                                        name="totalExperience"
                                        required
                                        value={formData.totalExperience}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 5"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Relevant Experience (Years) *</label>
                                    <input
                                        type="text"
                                        name="relevantExperience"
                                        required
                                        value={formData.relevantExperience}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 3"
                                    />
                                </div>

                                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                    <label>Skills *</label>
                                    <textarea
                                        name="skills"
                                        required
                                        rows={3}
                                        value={formData.skills}
                                        onChange={handleInputChange}
                                        placeholder="e.g., React, Node.js, AWS, Python, SQL"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Certifications</label>
                                    <input
                                        type="text"
                                        name="certifications"
                                        value={formData.certifications}
                                        onChange={handleInputChange}
                                        placeholder="e.g., AWS Certified, PMP"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Education *</label>
                                    <input
                                        type="text"
                                        name="education"
                                        required
                                        value={formData.education}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Bachelor's in Computer Science"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Availability */}
                        <div className={styles.formSection}>
                            <h2>Availability</h2>
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label>Joining Availability *</label>
                                    <select
                                        name="joiningAvailability"
                                        required
                                        value={formData.joiningAvailability}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Availability</option>
                                        {joiningAvailabilityOptions.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Day 1 Onsite *</label>
                                    <div className={styles.radioGroup}>
                                        <label className={styles.radioLabel}>
                                            <input
                                                type="radio"
                                                name="day1Onsite"
                                                value="Yes"
                                                required
                                                checked={formData.day1Onsite === 'Yes'}
                                                onChange={handleInputChange}
                                            />
                                            <span>Yes</span>
                                        </label>
                                        <label className={styles.radioLabel}>
                                            <input
                                                type="radio"
                                                name="day1Onsite"
                                                value="No"
                                                required
                                                checked={formData.day1Onsite === 'No'}
                                                onChange={handleInputChange}
                                            />
                                            <span>No</span>
                                        </label>
                                    </div>
                                </div>

                                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                    <label>Interview Availability *</label>
                                    <input
                                        type="text"
                                        name="interviewAvailability"
                                        required
                                        value={formData.interviewAvailability}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Weekdays after 5 PM, Weekends"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Resume Upload */}
                        <div className={styles.formSection}>
                            <h2>Resume</h2>
                            <div className={styles.formGroup}>
                                <label>Upload Resume (PDF or DOC) *</label>
                                <input
                                    type="file"
                                    required
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                    className={styles.fileInput}
                                />
                                {formData.resume && (
                                    <p className={styles.fileName}>✓ {formData.resume.name}</p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className={styles.submitSection}>
                            <button type="submit" className={styles.submitButton}>
                                Submit Application
                            </button>
                            <p className={styles.disclaimer}>
                                By submitting this application, you agree to our terms and conditions
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}