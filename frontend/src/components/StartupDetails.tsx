import React from 'react';
import styles from '../styles/FeaturedStartups.module.css';

interface StartupDetailsProps {
  startup: any;
}

const StartupDetails: React.FC<StartupDetailsProps> = ({ startup }) => (
  <div className={styles.startupDetailsModalContent}>
    <div className={styles.startupRow}><span className={styles.startupLabel}>Description</span><span className={styles.startupColon}>:</span><span className={styles.startupValue}>{startup.description || '-'}</span></div>
    <div className={styles.startupRow}><span className={styles.startupLabel}>Category</span><span className={styles.startupColon}>:</span><span className={styles.startupValue}>{Array.isArray(startup.categories) ? startup.categories.join(', ') : startup.category || '-'}</span></div>
    <div className={styles.startupRow}><span className={styles.startupLabel}>Problems</span><span className={styles.startupColon}>:</span><span className={styles.startupValue}>{Array.isArray(startup.problems) ? startup.problems.join(', ') : startup.problems || '-'}</span></div>
    <div className={styles.startupRow}><span className={styles.startupLabel}>Stage</span><span className={styles.startupColon}>:</span><span className={styles.startupValue}>{startup.stage || '-'}</span></div>
    <div className={styles.startupRow}><span className={styles.startupLabel}>Team</span><span className={styles.startupColon}>:</span><span className={styles.startupValue}>{Array.isArray(startup.team) ? startup.team.join(', ') : startup.team || '-'}</span></div>
    <div className={styles.startupRow}><span className={styles.startupLabel}>Funding Needs</span><span className={styles.startupColon}>:</span><span className={styles.startupValue}>{startup.fundingNeeds || '-'}</span></div>
    <div className={styles.startupRow}><span className={styles.startupLabel}>Pitch Deck URL</span><span className={styles.startupColon}>:</span><span className={styles.startupValue}>{startup.pitchDeckUrl || '-'}</span></div>
    <div className={styles.startupRow}><span className={styles.startupLabel}>Pitch Video URL</span><span className={styles.startupColon}>:</span><span className={styles.startupValue}>{startup.pitchVideoUrl || '-'}</span></div>
    <div className={styles.startupRow}><span className={styles.startupLabel}>Demo URL</span><span className={styles.startupColon}>:</span><span className={styles.startupValue}>{startup.demoUrl || '-'}</span></div>
    <div className={styles.startupRow}><span className={styles.startupLabel}>Revenue</span><span className={styles.startupColon}>:</span><span className={styles.startupValue}>{startup.revenue || '-'}</span></div>
    <div className={styles.startupRow}><span className={styles.startupLabel}>Phone</span><span className={styles.startupColon}>:</span><span className={styles.startupValue}>{startup.phone || '-'}</span></div>
    <div className={styles.startupRow}><span className={styles.startupLabel}>Email</span><span className={styles.startupColon}>:</span><span className={styles.startupValue}>{startup.email || '-'}</span></div>
    <div className={styles.startupRow}><span className={styles.startupLabel}>Social Media</span><span className={styles.startupColon}>:</span><span className={styles.startupValue}>{startup.socialMedia || '-'}</span></div>
    <div className={styles.startupRow}><span className={styles.startupLabel}>Created At</span><span className={styles.startupColon}>:</span><span className={styles.startupValue}>{startup.createdAt ? new Date(startup.createdAt).toLocaleString() : '-'}</span></div>
  </div>
);

export default StartupDetails;
