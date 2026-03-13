import React, { useState } from "react";
import styles from "../styles/FeaturedStartups.module.css";
import Modal from "./Modal";
import StartupDetails from "./StartupDetails";

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
  // Modal state for showing startup details
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);

  // Runtime check for duplicate IDs
  const [duplicateIds, setDuplicateIds] = useState<string[]>([]);
  React.useEffect(() => {
    const idCounts: Record<string, number> = {};
    startups.forEach(s => {
      if (s.id) {
        idCounts[s.id] = (idCounts[s.id] || 0) + 1;
      }
    });
    const duplicates = Object.entries(idCounts).filter(([_, count]) => count > 1).map(([id]) => id);
    setDuplicateIds(duplicates);
    if (duplicates.length > 0) {
      console.warn('[FeaturedStartups] Duplicate startup IDs detected:', duplicates);
    }
  }, [startups]);

  // Show newest startups first
  const startupsReversed = [...startups].reverse();
  return (
    <>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {selectedStartup && <StartupDetails startup={selectedStartup} />}
      </Modal>
      <div className={styles.featuredGrid}>
        {startupsReversed.map((startup, idx) => (
          <div className={styles.startupCard} key={startup.id || idx}>
            <div className={styles.startupTitle}>{startup.name}</div>
            <div className={styles.startupMediaRow}>
              {startup.imageUrl && (
                <div className={styles.startupImgWrap}>
                  <img
                    src={startup.imageUrl}
                    alt={startup.name + " logo"}
                    className={styles.startupImg}
                  />
                </div>
              )}
              {startup.videoUrl && (
                <div className={styles.startupVideoWrap}>
                  <video src={startup.videoUrl} controls className={styles.startupVideo} />
                </div>
              )}
            </div>
            <div className={styles.startupDetails}>
              <button className={styles.detailsBtn} onClick={() => { setSelectedStartup(startup); setModalOpen(true); }}>
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturedStartups;
