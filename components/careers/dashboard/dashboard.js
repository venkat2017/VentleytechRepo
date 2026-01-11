
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './dashboard.module.css';
import AddJobModal from "../create/AddJobModal";

export default function AdminDashboard() {
    const router = useRouter();
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    // Active Tab State
    const [activeTab, setActiveTab] = useState('all-applications'); // 'all-applications', 'analytics', 'jobs'

    // Filters
    const [filters, setFilters] = useState({
        status: 'all',
        jobTitle: 'all',
        visaStatus: 'all',
        searchTerm: ''
    });

    // Stats
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        reviewing: 0,
        shortlisted: 0,
        hired: 0,
        rejected: 0
    });

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchApplications();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, applications]);

    const fetchApplications = async () => {
        try {
            const response = await fetch('/api/careers/applications');
            const data = await response.json();

            if (data.success) {
                setApplications(data.applications);
                calculateStats(data.applications);
            }
        } catch (error) {
            console.error('Error fetching applications:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (apps) => {
        const stats = {
            total: apps.length,
            pending: apps.filter(a => a.status === 'pending').length,
            reviewing: apps.filter(a => a.status === 'reviewing').length,
            shortlisted: apps.filter(a => a.status === 'shortlisted').length,
            hired: apps.filter(a => a.status === 'hired').length,
            rejected: apps.filter(a => a.status === 'rejected').length
        };
        setStats(stats);
    };

    const applyFilters = () => {
        let filtered = [...applications];

        if (filters.status !== 'all') {
            filtered = filtered.filter(app => app.status === filters.status);
        }

        if (filters.jobTitle !== 'all') {
            filtered = filtered.filter(app => app.jobTitle === filters.jobTitle);
        }

        if (filters.visaStatus !== 'all') {
            filtered = filtered.filter(app => app.visaStatus === filters.visaStatus);
        }

        if (filters.searchTerm) {
            const term = filters.searchTerm.toLowerCase();
            filtered = filtered.filter(app =>
                app.fullName.toLowerCase().includes(term) ||
                app.email.toLowerCase().includes(term) ||
                app.jobTitle.toLowerCase().includes(term) ||
                app.skills.toLowerCase().includes(term)
            );
        }

        setFilteredApplications(filtered);
        setCurrentPage(1);
    };

    const updateApplicationStatus = async (applicationId, newStatus, notes) => {
        try {
            const response = await fetch(`/api/careers/applications/${applicationId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus, notes })
            });

            const data = await response.json();

            if (data.success) {
                fetchApplications();
                alert('Status updated successfully!');
                setShowDetailModal(false);
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    const viewDetails = (application) => {
        setSelectedApplication(application);
        setShowDetailModal(true);
    };

    const downloadResume = (resumePath) => {
        window.open(resumePath, '_blank');
    };

    const exportToCSV = () => {
        const headers = ['Name', 'Email', 'Phone', 'Job Title', 'Location', 'Visa Status', 'Experience', 'Status', 'Applied Date'];
        const rows = filteredApplications.map(app => [
            app.fullName,
            app.email,
            app.contactNumber,
            app.jobTitle,
            app.location,
            app.visaStatus,
            app.totalExperience,
            app.status,
            new Date(app.createdAt).toLocaleDateString()
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `applications_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    const uniqueJobTitles = [...new Set(applications.map(app => app.jobTitle))];
    const uniqueVisaStatuses = [...new Set(applications.map(app => app.visaStatus))];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

    // Handle tab change
    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        // Reset filters when switching tabs
        if (tabName !== 'all-applications') {
            setFilters({
                status: 'all',
                jobTitle: 'all',
                visaStatus: 'all',
                searchTerm: ''
            });
        }
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className={styles.dashboardWrapper}>
            {/* Header */}
            <div className={styles.dashboardHeader}>
                <div>
                    <h1>Dashboard</h1>
                    <p>Manage and review all job applications</p>
                </div>
                {activeTab === 'all-applications' && (
                    <button onClick={exportToCSV} className={styles.exportButton}>
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export CSV
                    </button>
                )}
            </div>

            {/* Tab Navigation */}
            <div className={styles.tabNavigation}>
                <button
                    className={`${styles.tabButton} ${activeTab === 'all-applications' ? styles.active : ''}`}
                    onClick={() => handleTabChange('all-applications')}
                >
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    All Applications
                    <span className={styles.tabBadge}>{stats.total}</span>
                </button>

                <button
                    className={`${styles.tabButton} ${activeTab === 'analytics' ? styles.active : ''}`}
                    onClick={() => handleTabChange('analytics')}
                >
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Analytics
                </button>

                <button
                    className={`${styles.tabButton} ${activeTab === 'jobs' ? styles.active : ''}`}
                    onClick={() => handleTabChange('jobs')}
                >
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Job Management
                </button>
            </div>

            {/* Tab Content */}
            <div className={styles.tabContent}>
                {/* Tab 1: All Applications */}
                {activeTab === 'all-applications' && (
                    <AllApplicationsTab
                        stats={stats}
                        filters={filters}
                        setFilters={setFilters}
                        uniqueJobTitles={uniqueJobTitles}
                        uniqueVisaStatuses={uniqueVisaStatuses}
                        currentItems={currentItems}
                        filteredApplications={filteredApplications}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                        itemsPerPage={itemsPerPage}
                        viewDetails={viewDetails}
                        downloadResume={downloadResume}
                    />
                )}

                {/* Tab 2: Analytics */}
                {activeTab === 'analytics' && (
                    <AnalyticsTab
                        applications={applications}
                        stats={stats}
                    />
                )}

                {/* Tab 3: Job Management */}
                {activeTab === 'jobs' && (
                    <JobManagementTab
                        applications={applications}
                        uniqueJobTitles={uniqueJobTitles}
                    />
                )}
            </div>

            {/* Detail Modal */}
            {showDetailModal && selectedApplication && (
                <ApplicationDetailModal
                    application={selectedApplication}
                    onClose={() => setShowDetailModal(false)}
                    onUpdateStatus={updateApplicationStatus}
                />
            )}
        </div>
    );
}

// ============================================
// Tab 1: All Applications Component
// ============================================
function AllApplicationsTab({
                                stats,
                                filters,
                                setFilters,
                                uniqueJobTitles,
                                uniqueVisaStatuses,
                                currentItems,
                                filteredApplications,
                                currentPage,
                                setCurrentPage,
                                totalPages,
                                itemsPerPage,
                                viewDetails,
                                downloadResume
                            }) {
    return (
        <>
            {/* Stats Cards */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ backgroundColor: '#dbeafe' }}>
                        <svg fill="none" stroke="#2563eb" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div className={styles.statInfo}>
                        <p>Total Applications</p>
                        <h3>{stats.total}</h3>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ backgroundColor: '#fef3c7' }}>
                        <svg fill="none" stroke="#f59e0b" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className={styles.statInfo}>
                        <p>Pending Review</p>
                        <h3>{stats.pending}</h3>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ backgroundColor: '#ddd6fe' }}>
                        <svg fill="none" stroke="#7c3aed" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </div>
                    <div className={styles.statInfo}>
                        <p>Under Review</p>
                        <h3>{stats.reviewing}</h3>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ backgroundColor: '#d1fae5' }}>
                        <svg fill="none" stroke="#10b981" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className={styles.statInfo}>
                        <p>Shortlisted</p>
                        <h3>{stats.shortlisted}</h3>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ backgroundColor: '#dcfce7' }}>
                        <svg fill="none" stroke="#16a34a" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div className={styles.statInfo}>
                        <p>Hired</p>
                        <h3>{stats.hired}</h3>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ backgroundColor: '#fee2e2' }}>
                        <svg fill="none" stroke="#dc2626" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div className={styles.statInfo}>
                        <p>Rejected</p>
                        <h3>{stats.rejected}</h3>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className={styles.filtersCard}>
                <div className={styles.filtersGrid}>
                    <div className={styles.filterGroup}>
                        <label>Search</label>
                        <input
                            type="text"
                            placeholder="Search by name, email, job, skills..."
                            value={filters.searchTerm}
                            onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                        />
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Status</label>
                        <select
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="reviewing">Reviewing</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="hired">Hired</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Job Title</label>
                        <select
                            value={filters.jobTitle}
                            onChange={(e) => setFilters({ ...filters, jobTitle: e.target.value })}
                        >
                            <option value="all">All Jobs</option>
                            {uniqueJobTitles.map(title => (
                                <option key={title} value={title}>{title}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Visa Status</label>
                        <select
                            value={filters.visaStatus}
                            onChange={(e) => setFilters({ ...filters, visaStatus: e.target.value })}
                        >
                            <option value="all">All Visa Status</option>
                            {uniqueVisaStatuses.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={styles.filterResults}>
                    Showing {currentItems.length} of {filteredApplications.length} applications
                </div>
            </div>

            {/* Applications Table */}
            <div className={styles.tableCard}>
                <div className={styles.tableWrapper}>
                    <table className={styles.applicationsTable}>
                        <thead>
                        <tr>
                            <th>CANDIDATE</th>
                            <th>JOB TITLE</th>
                            <th>LOCATION</th>
                            <th>VISA STATUS</th>
                            <th>EXPERIENCE</th>
                            <th>STATUS</th>
                            <th>APPLIED DATE</th>
                            <th>ACTIONS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems.length === 0 ? (
                            <tr>
                                <td colSpan="8" className={styles.noData}>
                                    No applications found
                                </td>
                            </tr>
                        ) : (
                            currentItems.map((app) => (
                                <tr key={app.id}>
                                    <td>
                                        <div className={styles.candidateInfo}>
                                            <div className={styles.candidateAvatar}>
                                                {app.fullName.charAt(0)}
                                            </div>
                                            <div>
                                                <div className={styles.candidateName}>{app.fullName}</div>
                                                <div className={styles.candidateEmail}>{app.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{app.jobTitle}</td>
                                    <td>{app.location}</td>
                                    <td>
                                        <span className={styles.visaBadge}>{app.visaStatus}</span>
                                    </td>
                                    <td>{app.totalExperience} years</td>
                                    <td>
                      <span className={`${styles.statusBadge} ${styles[app.status]}`}>
                        {app.status}
                      </span>
                                    </td>
                                    <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <div className={styles.actionButtons}>
                                            <button
                                                onClick={() => viewDetails(app)}
                                                className={styles.viewButton}
                                                title="View Details"
                                            >
                                                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                            {app.resumePath && (
                                                <button
                                                    onClick={() => downloadResume(app.resumePath)}
                                                    className={styles.downloadButton}
                                                    title="Download Resume"
                                                >
                                                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={styles.paginationButton}
                        >
                            Previous
                        </button>

                        <div className={styles.paginationPages}>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`${styles.pageButton} ${currentPage === index + 1 ? styles.active : ''}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={styles.paginationButton}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

// ============================================
// Tab 2: Analytics Component
// ============================================
function AnalyticsTab({ applications, stats }) {
    // Calculate additional analytics
    const avgExperience = applications.length > 0
        ? (applications.reduce((sum, app) => sum + parseFloat(app.totalExperience || 0), 0) / applications.length).toFixed(1)
        : 0;

    const visaStatusBreakdown = applications.reduce((acc, app) => {
        acc[app.visaStatus] = (acc[app.visaStatus] || 0) + 1;
        return acc;
    }, {});

    const jobTitleBreakdown = applications.reduce((acc, app) => {
        acc[app.jobTitle] = (acc[app.jobTitle] || 0) + 1;
        return acc;
    }, {});

    const locationBreakdown = applications.reduce((acc, app) => {
        acc[app.location] = (acc[app.location] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className={styles.analyticsContainer}>
            <h2 className={styles.sectionTitle}>Application Analytics</h2>

            {/* Key Metrics */}
            <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                    <h3>Total Applications</h3>
                    <div className={styles.metricValue}>{stats.total}</div>
                    <p className={styles.metricLabel}>All time</p>
                </div>

                <div className={styles.metricCard}>
                    <h3>Average Experience</h3>
                    <div className={styles.metricValue}>{avgExperience} yrs</div>
                    <p className={styles.metricLabel}>Across all candidates</p>
                </div>

                <div className={styles.metricCard}>
                    <h3>Conversion Rate</h3>
                    <div className={styles.metricValue}>
                        {stats.total > 0 ? ((stats.hired / stats.total) * 100).toFixed(1) : 0}%
                    </div>
                    <p className={styles.metricLabel}>Applications to Hires</p>
                </div>

                <div className={styles.metricCard}>
                    <h3>Active Pipeline</h3>
                    <div className={styles.metricValue}>
                        {stats.pending + stats.reviewing + stats.shortlisted}
                    </div>
                    <p className={styles.metricLabel}>In progress</p>
                </div>
            </div>

            {/* Breakdown Charts */}
            <div className={styles.chartsGrid}>
                <div className={styles.chartCard}>
                    <h3>Visa Status Distribution</h3>
                    <div className={styles.chartContent}>
                        {Object.entries(visaStatusBreakdown).map(([status, count]) => (
                            <div key={status} className={styles.chartRow}>
                                <span className={styles.chartLabel}>{status}</span>
                                <div className={styles.chartBar}>
                                    <div
                                        className={styles.chartFill}
                                        style={{ width: `${(count / stats.total) * 100}%` }}
                                    ></div>
                                </div>
                                <span className={styles.chartValue}>{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.chartCard}>
                    <h3>Applications by Job Title</h3>
                    <div className={styles.chartContent}>
                        {Object.entries(jobTitleBreakdown).map(([title, count]) => (
                            <div key={title} className={styles.chartRow}>
                                <span className={styles.chartLabel}>{title}</span>
                                <div className={styles.chartBar}>
                                    <div
                                        className={styles.chartFill}
                                        style={{ width: `${(count / stats.total) * 100}%`, backgroundColor: '#10b981' }}
                                    ></div>
                                </div>
                                <span className={styles.chartValue}>{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.chartCard}>
                    <h3>Top Locations</h3>
                    <div className={styles.chartContent}>
                        {Object.entries(locationBreakdown)
                            .sort((a, b) => b[1] - a[1])
                            .slice(0, 5)
                            .map(([location, count]) => (
                                <div key={location} className={styles.chartRow}>
                                    <span className={styles.chartLabel}>{location}</span>
                                    <div className={styles.chartBar}>
                                        <div
                                            className={styles.chartFill}
                                            style={{ width: `${(count / stats.total) * 100}%`, backgroundColor: '#f59e0b' }}
                                        ></div>
                                    </div>
                                    <span className={styles.chartValue}>{count}</span>
                                </div>
                            ))}
                    </div>
                </div>

                <div className={styles.chartCard}>
                    <h3>Status Funnel</h3>
                    <div className={styles.funnelContent}>
                        <div className={styles.funnelStep}>
                            <div className={styles.funnelBar} style={{ width: '100%', backgroundColor: '#2563eb' }}>
                                <span>Total: {stats.total}</span>
                            </div>
                        </div>
                        <div className={styles.funnelStep}>
                            <div className={styles.funnelBar} style={{ width: '100%', backgroundColor: '#7c3aed' }}>
                                <span>Reviewing: {stats.reviewing}</span>
                            </div>
                        </div>
                        <div className={styles.funnelStep}>
                            <div className={styles.funnelBar} style={{ width: '100%', backgroundColor: '#10b981' }}>
                                <span>Shortlisted: {stats.shortlisted}</span>
                            </div>
                        </div>
                        <div className={styles.funnelStep}>
                            <div className={styles.funnelBar} style={{ width: '100%', backgroundColor: '#16a34a' }}>
                                <span>Hired: {stats.hired}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================
// Tab 3: Job Management Component
// ============================================
function JobManagementTab({ applications, uniqueJobTitles }) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddJobModal, setShowAddJobModal] = useState(false);
    const handleJobAdded = () => {
        fetchJobs(); // Refresh jobs list after adding
    };
    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await fetch('/api/careers/jobs');
            const data = await response.json();
            if (data.success) {
                setJobs(data.jobs);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const getJobApplicationCount = (jobTitle) => {
        return applications.filter(app => app.jobTitle === jobTitle).length;
    };

    const toggleJobStatus = async (jobId, currentStatus) => {
        try {
            const response = await fetch(`/api/careers/jobs/${jobId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive: !currentStatus })
            });

            if (response.ok) {
                fetchJobs();
                alert('Job status updated successfully!');
            }
        } catch (error) {
            console.error('Error updating job status:', error);
        }
    };

    const deleteJob = async (jobId) => {
        if (!confirm('Are you sure you want to delete this job posting?')) return;

        try {
            const response = await fetch(`/api/careers/jobs/${jobId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchJobs();
                alert('Job deleted successfully!');
            }
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    if (loading) {
        return <div className={styles.loadingState}>Loading jobs...</div>;
    }

    return (
        <div className={styles.jobManagementContainer}>
            <div className={styles.jobManagementHeader}>
                <h2>Job Postings Management</h2>
                <button
                    className={styles.addJobButton}
                    onClick={() => setShowAddJobModal(true)}
                >
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Job
                </button>
            </div>

            <div className={styles.jobsGrid}>
                {jobs.map((job) => (
                    <div key={job.id} className={styles.jobCard}>
                        <div className={styles.jobCardHeader}>
                            <div>
                                <h3>{job.title}</h3>
                                <div className={styles.jobMeta}>
                                    <span className={styles.jobLocation}>📍 {job.location}</span>
                                    <span className={styles.jobMode}>{job.mode}</span>
                                    <span className={styles.jobExperience}>⏱️ {job.experience}</span>
                                </div>
                            </div>
                            <div className={styles.jobStatus}>
                                <label className={styles.switch}>
                                    <input
                                        type="checkbox"
                                        checked={job.isActive}
                                        onChange={() => toggleJobStatus(job.id, job.isActive)}
                                    />
                                    <span className={styles.slider}></span>
                                </label>
                                <span className={`${styles.statusText} ${job.isActive ? styles.active : styles.inactive}`}>
                  {job.isActive ? 'Active' : 'Inactive'}
                </span>
                            </div>
                        </div>

                        {job.description && (
                            <p className={styles.jobDescription}>{job.description}</p>
                        )}

                        {job.skills && (
                            <div className={styles.jobSkills}>
                                {job.skills.split(',').slice(0, 4).map((skill, idx) => (
                                    <span key={idx} className={styles.skillTag}>{skill.trim()}</span>
                                ))}
                            </div>
                        )}

                        <div className={styles.jobCardFooter}>
                            <div className={styles.applicationCount}>
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                {getJobApplicationCount(job.title)} Applications
                            </div>
                            <div className={styles.jobActions}>
                                <button
                                    className={styles.editButton}
                                    onClick={() => alert('Edit functionality - coming soon!')}
                                    title="Edit Job"
                                >
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => deleteJob(job.id)}
                                    title="Delete Job"
                                >
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <AddJobModal
                isOpen={showAddJobModal}
                onClose={() => setShowAddJobModal(false)}
                onJobAdded={handleJobAdded}/>


            {jobs.length === 0 && (
                <div className={styles.emptyState}>
                    <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <h3>No Job Postings</h3>
                    <p>Create your first job posting to start receiving applications</p>
                    <button
                        className={styles.addJobButton}
                        onClick={() => setShowAddJobModal(true)}
                    >
                        Add New Job
                    </button>
                </div>
            )}
        </div>



    );
}

// ============================================
// Application Detail Modal Component
// ============================================
function ApplicationDetailModal({ application, onClose, onUpdateStatus }) {
    const [status, setStatus] = useState(application.status);
    const [notes, setNotes] = useState(application.notes || '');

    const handleSubmit = () => {
        onUpdateStatus(application.id, status, notes);
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>Application Details</h2>
                    <button onClick={onClose} className={styles.closeButton}>
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className={styles.modalBody}>
                    <div className={styles.detailsGrid}>
                        <div className={styles.detailSection}>
                            <h3>Personal Information</h3>
                            <div className={styles.detailRow}>
                                <span className={styles.label}>Full Name:</span>
                                <span className={styles.value}>{application.fullName}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span className={styles.label}>Email:</span>
                                <span className={styles.value}>{application.email}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span className={styles.label}>Phone:</span>
                                <span className={styles.value}>{application.contactNumber}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span className={styles.label}>Location:</span>
                                <span className={styles.value}>{application.location}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span className={styles.label}>LinkedIn:</span>
                                <span className={styles.value}>
                  {application.linkedinProfile ? (
                      <a href={application.linkedinProfile} target="_blank" rel="noopener noreferrer">
                          View Profile
                      </a>
                  ) : 'N/A'}
                </span>
                            </div>
                        </div>

                        <div className={styles.detailSection}>
                            <h3>Job Information</h3>
                            <div className={styles.detailRow}>
                                <span className={styles.label}>Position:</span>
                                <span className={styles.value}>{application.jobTitle}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span className={styles.label}>Visa Status:</span>
                                <span className={styles.value}>{application.visaStatus}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span className={styles.label}>Total Experience:</span>
                                <span className={styles.value}>{application.totalExperience} years</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span className={styles.label}>Relevant Experience:</span>
                                <span className={styles.value}>{application.relevantExperience} years</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span className={styles.label}>Education:</span>
                                <span className={styles.value}>{application.education}</span>
                            </div>
                            {application.certifications && (
                                <div className={styles.detailRow}>
                                    <span className={styles.label}>Certifications:</span>
                                    <span className={styles.value}>{application.certifications}</span>
                                </div>
                            )}
                        </div>

                        <div className={styles.detailSection}>
                            <h3>Availability</h3>
                            <div className={styles.detailRow}>
                                <span className={styles.label}>Joining Availability:</span>
                                <span className={styles.value}>{application.joiningAvailability}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span className={styles.label}>Day 1 Onsite:</span>
                                <span className={styles.value}>{application.day1Onsite}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span className={styles.label}>Interview Availability:</span>
                                <span className={styles.value}>{application.interviewAvailability}</span>
                            </div>
                        </div>

                        <div className={styles.detailSection} style={{ gridColumn: '1 / -1' }}>
                            <h3>Skills</h3>
                            <div className={styles.skillsList}>
                                {application.skills.split(',').map((skill, idx) => (
                                    <span key={idx} className={styles.skillBadge}>{skill.trim()}</span>
                                ))}
                            </div>
                        </div>

                        <div className={styles.detailSection} style={{ gridColumn: '1 / -1' }}>
                            <h3>Update Status</h3>
                            <div className={styles.statusUpdate}>
                                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="pending">Pending</option>
                                    <option value="reviewing">Reviewing</option>
                                    <option value="shortlisted">Shortlisted</option>
                                    <option value="hired">Hired</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                                <textarea
                                    placeholder="Add notes..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={4}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.modalFooter}>
                    {application.resumePath && (
                        <a
                            href={application.resumePath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.resumeButton}
                        >
                            📄 View Resume
                        </a>
                    )}
                    <div className={styles.modalActions}>
                        <button onClick={onClose} className={styles.cancelButton}>
                            Cancel
                        </button>
                        <button onClick={handleSubmit} className={styles.saveButton}>
                            Update Status
                        </button>
                    </div>
                </div>
            </div>
        </div>


    );
}