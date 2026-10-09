import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, GraduationCap, Microscope, Award } from "lucide-react";
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
    window.scrollTo(0, 0);
    if (!id) return;

    const fetchProfessor = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/professors/${id}`);
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
    return (
      <div className="detail-container">
        <div className="detail-loading-wrapper">
          <div className="detail-spinner"></div>
          <p>Loading Member Profile...</p>
        </div>
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="detail-container">
        <div className="detail-error-card">
          <Award size={48} color="#ef4444" />
          <h2>{error || "Member Not Found"}</h2>
          <button onClick={() => navigate(-1)} className="back-faculty-btn">
            <ArrowLeft size={18} /> Go Back
          </button>
        </div>
      </div>
    );
  }

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
      {/* Decorative Background Elements */}
      <div className="detail-bg-accent-1"></div>
      <div className="detail-bg-accent-2"></div>

      <div className="detail-content fade-in-section">
        <div className="detail-header-wrapper">
          <DetailHeader person={headerPerson} />
          {person.email && (
            <div className="prof-contact-meta">
              <Mail size={16} />
              <span>{person.email}</span>
            </div>
          )}
        </div>

        <div className="detail-main-grid">
          {/* LEFT SIDE: Image & Research Highlights */}
          <div className="left-section">
            <div className="prof-image-container reveal-image">
              {person.image ? (
                <img src={person.image} alt={person.name_th} className="prof-detail-image" />
              ) : (
                <img src="/default-professor.png" alt={person.name_th} className="prof-detail-image" />
              )}
            </div>

            <div className="section-divider">
              <Microscope size={20} />
              <span>Research & Publications</span>
            </div>
            <ResearchSection research={person.research || []} />
          </div>

          {/* RIGHT SIDE: Academic Info */}
          <div className="right-section">
            <div className="section-divider">
              <GraduationCap size={20} />
              <span>Academic Background</span>
            </div>

            <EducationSection education={educationData} />

            <div className="back-button-container">
              <button onClick={() => navigate(-1)} className="back-faculty-btn premium-btn">
                <ArrowLeft size={20} />
                <span>Back to Faculty</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
