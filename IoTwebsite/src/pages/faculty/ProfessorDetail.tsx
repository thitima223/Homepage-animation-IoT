import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProfessorDetail.css";
import EducationSection from "./EducationSection";
import ResearchSection from "./ResearchSection";
import DetailHeader from "./DetailHeader";

export default function ProfessorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProfessor = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/professors/${id}`);
        if (!response.ok) {
          throw new Error("Professor not found");
        }
        const data = await response.json();
        setPerson(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessor();
  }, [id]);

  if (loading) {
    return <div className="detail-container"><div className="detail-content">Loading...</div></div>;
  }

  if (error || !person) {
    return (
      <div className="detail-container">
        <div className="detail-content">
          <h2>{error || "Professor Not Found"}</h2>
          <button onClick={() => navigate(-1)} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // format data for components
  const headerPerson = {
    name: person.name_th,
    position: person.position,
    email: person.email,
  };

  const educationData = {
    history: person.education_history || [],
    expertise: person.expertise || [],
  };

  return (
    <div className="detail-container">
      <div className="detail-content">
        {/* LEFT SIDE: Research */}
        <div className="left-section">
          {person.image ? (
            <img src={person.image} alt={person.name_th} style={{ width: '100%', borderRadius: '8px', marginBottom: '20px', objectFit: 'cover' }} />
          ) : (
            <img src="/default-professor.png" alt={person.name_th} style={{ width: '100%', borderRadius: '8px', marginBottom: '20px', objectFit: 'cover' }} />
          )}
          <ResearchSection research={person.research || []} />
        </div>

        {/* RIGHT SIDE: Info */}
        <div className="right-section">
          <DetailHeader person={headerPerson} />
          <EducationSection education={educationData} />
          <button onClick={() => navigate(-1)} style={{ marginTop: '40px', padding: '10px 20px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            ← Back to Faculty
          </button>
        </div>
      </div>
    </div>
  );
}