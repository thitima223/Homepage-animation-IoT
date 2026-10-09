// components/ProfessorItem.tsx
import React from 'react';
import type { Professor } from './FacultyData';
import './match.css';

interface ProfessorItemProps {
  professor: Professor;
  matchScore?: number;
  selectedExpertise: string[];
  onClick?: () => void;
}

export const ProfessorItem: React.FC<ProfessorItemProps> = ({
  professor,
  matchScore = 0,
  selectedExpertise,
  onClick
}) => {
  const matchedTags = professor.expertise.filter(exp =>
    selectedExpertise.includes(exp)
  );

  return (
    <article
      className={`professor-item ${matchScore >= 70 ? 'high-match' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      {/* ✅ Image Container - บังคับขนาด */}
      <div className="professor-image-container">
        <img
          src={professor.image}
          alt={professor.name_th}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/default-prof.png';
          }}
        />
      </div>

      <div className="professor-info">
        <h3 title={professor.name_th}>{professor.name_th}</h3>
        <p className="professor-position" title={professor.position}>
          {professor.position}
        </p>

        {/* Match Score */}
        {matchScore !== undefined && selectedExpertise.length > 0 && (
          <div className="match-score">
            <div className="match-score-label">
              <span>ความตรง</span>
              <strong>{matchScore}%</strong>
            </div>
            <div className="score-bar">
              <div className="score-fill" style={{ width: `${matchScore}%` }} />
            </div>
          </div>
        )}

        {/* Matched Tags */}
        {matchedTags.length > 0 && (
          <div className="matched-tags">
            {matchedTags.slice(0, 3).map(tag => (
              <span key={tag} className="tag matched">{tag}</span>
            ))}
            {matchedTags.length > 3 && (
              <span className="tag">+{matchedTags.length - 3}</span>
            )}
          </div>
        )}

        {/* Contact Row */}
        <div className="contact-row" onClick={(e) => e.stopPropagation()}>
          {professor.email && (
            <a
              href={`mailto:${professor.email}`}
              className="email-icon"
              title="ส่งอีเมล"
              onClick={(e) => e.stopPropagation()}
            >
              ✉️
            </a>
          )}
          <button
            className="detail-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
            type="button"
          >
            รายละเอียด
          </button>
        </div>
      </div>
    </article>
  );
};