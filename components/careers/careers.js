import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import styles from './careers.module.css';

export default function Careers() {

    const [w2Jobs, setW2Jobs] = useState([]);
    const [c2cJobs, setC2cJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showC2CForm, setShowC2CForm] = useState(false);
    const [c2cFormData, setC2cFormData] = useState({
        title: '',
        location: '',
        experience: '',
        skills: '',
        industry: '',
        description: '',
        jdFile: null
    });

    // Fetch W2 jobs from API
    useEffect(() => {
        fetchW2Jobs();
        fetchC2CJobs();
    }, []);

    const fetchW2Jobs = async () => {
        try {
            const response = await fetch('/api/careers/jobs?active=true');
            const data = await response.json();

            if (data.success) {
                setW2Jobs(data.jobs);
            }
        } catch (error) {
            console.error('Error fetching W2 jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchC2CJobs = async () => {
        try {
            const response = await fetch('/api/careers/c2c-jobs?active=true');
            const data = await response.json();

            if (data.success) {
                setC2cJobs(data.jobs);
            }
        } catch (error) {
            console.error('Error fetching C2C jobs:', error);
        }
    };

    const handleC2CSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', c2cFormData.title);
            formDataToSend.append('location', c2cFormData.location);
            formDataToSend.append('experience', c2cFormData.experience);
            formDataToSend.append('skills', c2cFormData.skills);
            formDataToSend.append('industry', c2cFormData.industry);
            formDataToSend.append('description', c2cFormData.description);

            if (c2cFormData.jdFile) {
                formDataToSend.append('jdFile', c2cFormData.jdFile);
            }

            const response = await fetch('/api/careers/c2c-jobs', {
                method: 'POST',
                body: formDataToSend
            });

            const data = await response.json();

            if (data.success) {
                alert('C2C Job posted successfully!');
                setC2cFormData({
                    title: '',
                    location: '',
                    experience: '',
                    skills: '',
                    industry: '',
                    description: '',
                    jdFile: null
                });
                setShowC2CForm(false);
                fetchC2CJobs();
            } else {
                alert('Failed to post C2C job');
            }
        } catch (error) {
            console.error('Error posting C2C job:', error);
            alert('Error posting C2C job');
        }
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Loading careers...</p>
            </div>
        );
    }

    return (
        <div className={styles.careersWrapper}>
            {/* Header */}
            <div className={styles.container}>
                {/* W2 Requirements Section */}
                <section className={styles.section}>
                    <div className={styles.card}>
                        <h2 className={styles.sectionTitle}>W2 Requirements</h2>
                        <p className={styles.sectionDesc}>
                            Explore our current openings for full-time W2 positions ({w2Jobs.length} positions
                            available)
                        </p>

                        {w2Jobs.length === 0 ? (
                            <div className={styles.emptyState}>
                                <svg className={styles.emptyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                <p>No active positions at the moment. Check back soon!</p>
                            </div>
                        ) : (
                            <div className={styles.jobsList}>
                                {w2Jobs.map((job) => (
                                    <Link
                                        key={job.id}
                                        href={`/en/apply?jobId=${job.id}&jobTitle=${encodeURIComponent(job.title)}`}
                                        className={styles.jobCard}
                                    >
                                        <div className={styles.jobContent}>
                                            <div className={styles.jobInfo}>
                                                <h3>{job.title}</h3>
                                                {job.description && (
                                                    <p className={styles.jobDesc}>{job.description}</p>
                                                )}
                                                <div className={styles.jobMeta}>
                                                    <div className={styles.metaItem}>
                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2}
                                                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                        </svg>
                                                        <span>{job.location}</span>
                                                    </div>
                                                    <div className={styles.metaItem}>
                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2}
                                                                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                                        </svg>
                                                        <span
                                                            className={job.mode === 'Day 1 Onsite' ? styles.onsite : ''}>{job.mode}</span>
                                                    </div>
                                                    <div className={styles.metaItem}>
                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2}
                                                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                        </svg>
                                                        <span>{job.experience}</span>
                                                    </div>
                                                    {job.salary && (
                                                        <div className={`${styles.metaItem} ${styles.salary}`}>
                                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      strokeWidth={2}
                                                                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                            </svg>
                                                            <span>{job.salary}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                {job.skills && (
                                                    <div className={styles.skillsTags}>
                                                        {job.skills.split(',').slice(0, 5).map((skill, idx) => (
                                                            <span key={idx} className={styles.skillTag}>
                                {skill.trim()}
                              </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className={styles.applyButton}>
                        <span>
                          Apply Now
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                          </svg>
                        </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* C2C Requirements Section */}
                <section className={styles.section}>
                    <div className={`${styles.card} ${styles.c2cCard}`}>
                        <h2 className={`${styles.sectionTitle} ${styles.c2cTitle}`}>C2C Requirements</h2>
                        <div className={styles.c2cInfo}>
                            <p>
                                <strong>For vendor / C2C partners:</strong> We work with trusted vendors to find the best talent for specialized positions.
                            </p>
                        </div>





                        {c2cJobs.length > 0 ? (
                            <div className={styles.c2cJobsList}>
                                <h3>Current C2C Positions ({c2cJobs.length})</h3>
                                <div className={styles.c2cJobs}>
                                    {c2cJobs.map((job) => (
                                        <div key={job.id} className={styles.c2cJobCard}>
                                            <h4>{job.title}</h4>
                                            {job.description && (
                                                <p className={styles.c2cJobDesc}>{job.description}</p>
                                            )}
                                            <div className={styles.c2cJobMeta}>
                                                <p><strong>Location:</strong> {job.location}</p>
                                                <p><strong>Experience:</strong> {job.experience}</p>
                                                <p><strong>Industry:</strong> {job.industry}</p>
                                            </div>
                                            <div className={styles.c2cSkills}>
                                                <strong>Skills:</strong>
                                                <div className={styles.c2cSkillsTags}>
                                                    {job.skills.split(',').map((skill, idx) => (
                                                        <span key={idx} className={styles.c2cSkillTag}>
                                                        {skill.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            {job.jdPath && (
                                                <a href={job.jdPath} target="_blank" rel="noopener noreferrer"
                                                   className={styles.jdLink}>
                                                    📄 View Job Description
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : !showC2CForm && (
                            <p className={styles.emptyC2C}>No C2C positions posted yet</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}