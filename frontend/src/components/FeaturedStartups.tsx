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
  imageUrl?: string;
  videoUrl?: string;
  logoUrl?: string;
  [key: string]: any;
}

interface FeaturedStartupsProps {
  startups: Startup[];
}

const FeaturedStartups: React.FC<FeaturedStartupsProps> = ({ startups }) => {
  // Modal state for showing startup details or video
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // Removed unused duplicateIds state

  // Show newest startups first
  const startupsReversed = [...startups].reverse();
  // Helper to extract YouTube video ID from various URL formats
  function getYouTubeId(url: string): string | null {
    if (!url) return null;
    // Accepts watch?v=, youtu.be/, shorts/, embed/, etc.
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
    return match ? match[1] : null;
  }

  return (
    <>
      <Modal isOpen={modalOpen || !!videoUrl} onClose={() => { setModalOpen(false); setVideoUrl(null); }}>
        {modalOpen && selectedStartup && <StartupDetails startup={selectedStartup} />}
        {videoUrl && (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {getYouTubeId(videoUrl) ? (
              <iframe
                width="420"
                height="236"
                style={{ width: '100%', maxWidth: 420, borderRadius: 12, aspectRatio: '16/9', maxHeight: '320px', background: '#000' }}
                src={`https://www.youtube.com/embed/${getYouTubeId(videoUrl)}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <video src={videoUrl} controls autoPlay style={{ width: '100%', maxWidth: 420, borderRadius: 12, background: '#000', aspectRatio: '16/9', maxHeight: '320px' }} />
            )}
          </div>
        )}
      </Modal>
      <div className={styles.featuredGrid}>
        {startupsReversed.map((startup, idx) => (
          <div className={styles.startupCard} key={startup.id || idx}>
            <div className={styles.startupTitle}>{startup.name}</div>
            <div className={styles.startupMediaRow}>
              {startup.imageUrl && (
                <div className={styles.startupImgWrapLarge}>
                  <img
                    src={startup.imageUrl}
                    alt={startup.name + " logo"}
                    className={styles.startupImg}
                  />
                </div>
              )}
            </div>
            <div className={styles.startupDetailsRow}>
              <button className={styles.detailsBtn} onClick={() => { setSelectedStartup(startup); setModalOpen(true); }}>
                Details
              </button>
              <div style={{ flex: 1 }} />
              {(startup.videoUrl || startup.pitchVideoUrl) && (
                <button
                  className={styles.detailsBtn}
                  style={{ marginLeft: 'auto' }}
                  onClick={() => setVideoUrl(startup.videoUrl || startup.pitchVideoUrl || null)}
                >
                  ▶
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturedStartups;
