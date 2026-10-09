import { BookOpen, CheckCircle } from "lucide-react";

type EducationData = {
  history: string[];
  expertise: string[];
};

type Props = {
  education: EducationData;
};

export default function EducationSection({ education }: Props) {
  if (!education || (education.history.length === 0 && education.expertise.length === 0)) {
    return null;
  }

  return (
    <div className="education-section">
      <div className="info-block">
        <h3 className="section-subtitle">
          <BookOpen size={18} className="icon-accent" />
          Education History
        </h3>
        <ul className="premium-list">
          {education.history.map((item, index) => (
            <li key={index} className="list-item-animate" style={{ animationDelay: `${index * 0.1}s` }}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="info-block" style={{ marginTop: '30px' }}>
        <h3 className="section-subtitle">
          <CheckCircle size={18} className="icon-accent" />
          Areas of Expertise
        </h3>
        <ul className="premium-list expertise-grid">
          {education.expertise.map((item, index) => (
            <li key={index} className="expertise-tag">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}