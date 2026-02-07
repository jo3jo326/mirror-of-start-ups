import React, { useState } from "react";
import styles from "../styles/FeaturedStartups.module.css";

interface Startup {
  id: string;
  name: string;
  description: string;
  founder: string;
  industry: string;
  website: string;
  logoUrl?: string;
  [key: string]: any;
}

interface FeaturedStartupsProps {
  startups: Startup[];
}

const FeaturedStartups: React.FC<FeaturedStartupsProps> = ({ startups }) => {
  const [openDetails, setOpenDetails] = useState<string | null>(null);

  // Runtime check for duplicate IDs
  React.useEffect(() => {
    const idCounts: Record<string, number> = {};
    startups.forEach(s => {
      if (s.id) {
        idCounts[s.id] = (idCounts[s.id] || 0) + 1;
      }
    });
    const duplicates = Object.entries(idCounts).filter(([_, count]) => count > 1);
    if (duplicates.length > 0) {
      console.warn('[FeaturedStartups] Duplicate startup IDs detected:', duplicates.map(([id]) => id));
    }
  }, [startups]);

  return (
    <div className={styles.gridWrapNoCard}>
      {startups.map((startup, idx) => (
        <div className={styles.startupBlock} key={startup.id || idx}>
          <div className={styles.nameBig}>{startup.name}</div>
          {startup.imageUrl && (
            <div className={styles.logoSquareWrap}>
              <img
                src={startup.imageUrl}
                alt={startup.name + " logo"}
                className={styles.logoSquareImg}
              />
            </div>
          )}
          <button className={styles.detailsBtn} onClick={() => setOpenDetails(openDetails === startup.id ? null : startup.id)}>
            {openDetails === startup.id ? 'Hide Details' : 'Details'}
          </button>
          {openDetails === startup.id && (
            <div className={styles.fieldsTable}>
              <div className={styles.row}><span className={styles.label}>Description:</span><span className={styles.value}>{startup.description || '-'}</span></div>
              <div className={styles.row}><span className={styles.label}>Category:</span><span className={styles.value}>{Array.isArray(startup.categories) ? startup.categories.join(', ') : startup.category || '-'}</span></div>
              <div className={styles.row}><span className={styles.label}>Problems:</span><span className={styles.value}>{Array.isArray(startup.problems) ? startup.problems.join(', ') : startup.problems || '-'}</span></div>
              <div className={styles.row}><span className={styles.label}>Stage:</span><span className={styles.value}>{startup.stage || '-'}</span></div>
              <div className={styles.row}><span className={styles.label}>Team:</span><span className={styles.value}>{Array.isArray(startup.team) ? startup.team.join(', ') : startup.team || '-'}</span></div>
              <div className={styles.row}><span className={styles.label}>Funding Needs:</span><span className={styles.value}>{startup.fundingNeeds || '-'}</span></div>
              <div className={styles.row}><span className={styles.label}>Pitch Deck URL:</span><span className={styles.value}>{startup.pitchDeckUrl || '-'}</span></div>
              <div className={styles.row}><span className={styles.label}>Pitch Video URL:</span><span className={styles.value}>{startup.pitchVideoUrl || '-'}</span></div>
              <div className={styles.row}><span className={styles.label}>Demo URL:</span><span className={styles.value}>{startup.demoUrl || '-'}</span></div>
              <div className={styles.row}><span className={styles.label}>Revenue:</span><span className={styles.value}>{startup.revenue || '-'}</span></div>
              <div className={styles.row}><span className={styles.label}>Phone:</span><span className={styles.value}>{startup.phone || '-'}</span></div>
              <div className={styles.row}><span className={styles.label}>Email:</span><span className={styles.value}>{startup.email || '-'}</span></div>
              <div className={styles.row}><span className={styles.label}>Social Media:</span><span className={styles.value}>{startup.socialMedia || '-'}</span></div>
              <div className={styles.row}><span className={styles.label}>Created At:</span><span className={styles.value}>{startup.createdAt ? new Date(startup.createdAt).toLocaleString() : '-'}</span></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FeaturedStartups;
