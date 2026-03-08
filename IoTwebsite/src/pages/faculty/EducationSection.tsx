
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
      <h2 className="section-title">ประวัติการศึกษา</h2>
      <ul className="education-list">
        {education.history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2 className="section-title">ความเชี่ยวชาญ</h2>
      <ul className="expertise-list">
        {education.expertise.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}