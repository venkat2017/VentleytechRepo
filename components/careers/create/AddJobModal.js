
import { useState } from 'react';
import styles from './addJobModal.module.css';

export default function AddJobModal({ isOpen, onClose, onJobAdded }) {
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        mode: 'Onsite',
        experience: '',
        description: '',
        requirements: '',
        responsibilities: '',
        skills: '',
        salary: '',
        isActive: true
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const modes = ['Onsite', 'Day 1 Onsite', 'Remote', 'Hybrid'];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Job title is required';
        }

        if (!formData.location.trim()) {
            newErrors.location = 'Location is required';
        }

        if (!formData.experience.trim()) {
            newErrors.experience = 'Experience is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (!formData.skills.trim()) {
            newErrors.skills = 'At least one skill is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/careers/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                alert('Job posted successfully!');
                resetForm();
                onJobAdded(); // Callback to refresh job list
                onClose();
            } else {
                alert('Failed to post job: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error posting job:', error);
            alert('Error posting job. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            location: '',
            mode: 'Onsite',
            experience: '',
            description: '',
            requirements: '',
            responsibilities: '',
            skills: '',
            salary: '',
            isActive: true
        });
        setErrors({});
    };

    const handleClose = () => {
        if (loading) return;
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={handleClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className={styles.modalHeader}>
                    <div>
                        <h2>Add New Job Posting</h2>
                        <p>Create a new job posting to start receiving applications</p>
                    </div>
                    <button
                        onClick={handleClose}
                        className={styles.closeButton}
                        disabled={loading}
                    >
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formBody}>
                        {/* Basic Information Section */}
                        <div className={styles.formSection}>
                            <h3 className={styles.sectionTitle}>
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Basic Information
                            </h3>

                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label>Job Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g., Senior Java Developer"
                                        className={errors.title ? styles.inputError : ''}
                                    />
                                    {errors.title && <span className={styles.errorText}>{errors.title}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Location *</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="e.g., TX, NY, CA"
                                        className={errors.location ? styles.inputError : ''}
                                    />
                                    {errors.location && <span className={styles.errorText}>{errors.location}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Work Mode *</label>
                                    <select
                                        name="mode"
                                        value={formData.mode}
                                        onChange={handleChange}
                                    >
                                        {modes.map(mode => (
                                            <option key={mode} value={mode}>{mode}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Experience Required *</label>
                                    <input
                                        type="text"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        placeholder="e.g., 3-5 years"
                                        className={errors.experience ? styles.inputError : ''}
                                    />
                                    {errors.experience && <span className={styles.errorText}>{errors.experience}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Salary Range (Optional)</label>
                                    <input
                                        type="text"
                                        name="salary"
                                        value={formData.salary}
                                        onChange={handleChange}
                                        placeholder="e.g., $80,000 - $100,000"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            name="isActive"
                                            checked={formData.isActive}
                                            onChange={handleChange}
                                        />
                                        <span>Activate job immediately</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Job Description Section */}
                        <div className={styles.formSection}>
                            <h3 className={styles.sectionTitle}>
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Job Details
                            </h3>

                            <div className={styles.formGroup}>
                                <label>Job Description *</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Describe the role, team, and what makes this position exciting..."
                                    className={errors.description ? styles.inputError : ''}
                                />
                                {errors.description && <span className={styles.errorText}>{errors.description}</span>}
                            </div>

                            <div className={styles.formGroup}>
                                <label>Key Responsibilities (Optional)</label>
                                <textarea
                                    name="responsibilities"
                                    value={formData.responsibilities}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="• Design and develop features&#10;• Collaborate with team members&#10;• Write clean, maintainable code"
                                />
                                <span className={styles.helpText}>Use bullet points (•) or line breaks for better readability</span>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Requirements (Optional)</label>
                                <textarea
                                    name="requirements"
                                    value={formData.requirements}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="• Bachelor's degree in Computer Science&#10;• 5+ years of experience&#10;• Strong problem-solving skills"
                                />
                                <span className={styles.helpText}>List qualifications, education, and must-have skills</span>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className={styles.formSection}>
                            <h3 className={styles.sectionTitle}>
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                                Required Skills
                            </h3>

                            <div className={styles.formGroup}>
                                <label>Skills (comma-separated) *</label>
                                <textarea
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Java, Spring Boot, Microservices, AWS, Docker, Kubernetes"
                                    className={errors.skills ? styles.inputError : ''}
                                />
                                {errors.skills && <span className={styles.errorText}>{errors.skills}</span>}
                                <span className={styles.helpText}>Separate each skill with a comma</span>
                            </div>

                            {/* Skills Preview */}
                            {formData.skills && (
                                <div className={styles.skillsPreview}>
                                    <label>Skills Preview:</label>
                                    <div className={styles.skillsTags}>
                                        {formData.skills.split(',').filter(s => s.trim()).map((skill, idx) => (
                                            <span key={idx} className={styles.skillTag}>
                        {skill.trim()}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className={styles.modalFooter}>
                        <button
                            type="button"
                            onClick={handleClose}
                            className={styles.cancelButton}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg className={styles.spinner} width="20" height="20" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
                                        <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                                    </svg>
                                    Posting Job...
                                </>
                            ) : (
                                <>
                                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Post Job
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}