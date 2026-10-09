// ProfessorCard.tsx
import { useNavigate } from "react-router-dom";
import "./ProfessorCard.css";

type Props = {
  id: string;
  name: string;
  position: string;
  image: string;
  email?: string | null;  // ✅ เปลี่ยนเป็น optional + null ได้ (บางคนอาจไม่มีอีเมล)
};

export default function ProfessorCard({ id, name, position, image, email }: Props) {
  const navigate = useNavigate();

  // ✅ ป้องกันกรณี image เป็นว่าง
  const displayImage = image || "/default-professor.png";

  return (
    <div className="prof-card">
      <img 
        src={displayImage} 
        alt={name} 
        onError={(e) => {
          // ✅ ถ้าภาพไม่โหลด ให้ใช้รูปแทน
          (e.target as HTMLImageElement).src = "/default-professor.png";
        }}
      />

      <h3>{name}</h3>
      <p>{position}</p>

      <div className="prof-info">
        <div className="prof-actions">
          {/* ✅ แสดงไอคอนอีเมลเฉพาะเมื่อมีอีเมล */}
          {email && (
            <a href={`mailto:${email}`} className="email-icon" title="Send Email">
              📧
            </a>
          )}

          <button
            className="detail-btn"
            onClick={() => navigate(`/faculty/${id}`)}
          >
            Detail & Research →
          </button>
        </div>
      </div>
    </div>
  );
}