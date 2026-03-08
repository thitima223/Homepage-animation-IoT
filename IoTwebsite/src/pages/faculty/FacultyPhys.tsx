// FacultyPhys.tsx
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProfessorCard from "./ProfessorCard";
import ProfessorMatcherPopup from "./match.tsx";
import type { Professor } from "./FacultyData";
import "./Faculty.css";

export default function FacultyPhysics() {
  const navigate = useNavigate();
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMatcherOpen, setIsMatcherOpen] = useState(false);  // ← บรรทัดสำคัญ!


  // 🎯 เพิ่มฟังก์ชันจัดการเมื่อเลือกอาจารย์
  const handleProfessorSelect = (prof: Professor) => {
    navigate(`/faculty/${prof.id}`);
  };

  // 🎯 ดึงข้อมูลจาก API
  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        setLoading(true);
        // ⚠️ Fetch ALL professors so the matcher can search across departments
        const response = await fetch("http://localhost:3001/professors");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Professor[] = await response.json();
        setProfessors(data);
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Failed to load professors");
      } finally {
        setLoading(false);
      }
    };

    fetchProfessors();
  }, []);

  // 🔀 แยกข้อมูล: หัวหน้า / อาจารย์คนอื่น / เจ้าหน้าที่
  const { headProfessor, otherProfessors, staff } = useMemo(() => {
    // Filter ONLY Physics professors for display on this page
    const physProfessors = professors.filter(p => p.department_id === 'phys');

    // กรองแยก อาจารย์ และ เจ้าหน้าที่ ตามตำแหน่ง
    const allProfessors = physProfessors.filter(p => !p.position?.includes("เจ้าหน้าที่") && !p.position?.includes("นักวิทยาศาสตร์"));
    const staffList = physProfessors.filter(p => p.position?.includes("เจ้าหน้าที่") || p.position?.includes("นักวิทยาศาสตร์"));

    // หาหัวหน้าภาควิชา
    const head = allProfessors.find(p => p.is_head) || allProfessors[0];
    const others = allProfessors.filter(p => p.id !== head?.id);

    return {
      headProfessor: head,
      otherProfessors: others,
      staff: staffList
    };
  }, [professors]);

  // 🔄 ฟังก์ชันโหลดข้อมูลใหม่
  const handleRefresh = async () => {
    setLoading(true);
    try {
      // ✅ Fetch all professors for refresh
      const response = await fetch("http://localhost:3001/professors");

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data: Professor[] = await response.json();
      setProfessors(data);
      setError(null);
    } catch (err) {
      console.error("Refresh error:", err);
      setError("Failed to refresh data");
    } finally {
      setLoading(false);
    }
  };

  // ⏳ แสดงสถานะโหลด
  if (loading && professors.length === 0) {
    return (
      <div className="faculty-loading">
        <div className="spinner" />
        <p>กำลังโหลดข้อมูลคณาจารย์...</p>
        <button onClick={handleRefresh} className="btn secondary">
          🔄 ลองใหม่อีกครั้ง
        </button>
      </div>
    );
  }

  // ❌ แสดงข้อผิดพลาด
  if (error) {
    return (
      <div className="faculty-error">
        <h3>⚠️ ไม่สามารถโหลดข้อมูลได้</h3>
        <p>{error}</p>
        <button onClick={handleRefresh} className="btn primary">
          🔄 โหลดใหม่อีกครั้ง
        </button>
      </div>
    );
  }

  return (
    <>
      {/* HERO SECTION */}
      <section className="heroPhys">
        <div className="hero-left">
          <h1>
            Faculty Member <br />
            in the Department <br />
            of Industrial Physics
          </h1>

          <div className="hero-buttons">
            <button
              className="btn primary"
              onClick={() => navigate("/faculty")}
            >
              Professor of IoT and Information Engineering
            </button>
            <button
              className="btn matcher-trigger"
              onClick={() => setIsMatcherOpen(true)}
            >
              🎯 หาอาจารย์ที่ปรึกษา
            </button>
            <button className="btn secondary active">
              Professor of Industrial Physics
            </button>
          </div>
        </div>

        <div className="hero-right">
          {headProfessor && (
            <ProfessorCard
              key={headProfessor.id}
              id={headProfessor.id}
              name={headProfessor.name_th}
              position={headProfessor.position}
              image={headProfessor.image}
              email={headProfessor.email}
            />
          )}
        </div>
      </section>

      {/* PROFESSOR SECTION */}
      <section className="professors-section">
        <h2>คณาจารย์ภาควิชาฟิสิกส์อุตสาหกรรม</h2>
        <div className="prof-container">
          <div className="prof-grid">
            {otherProfessors.map((prof) => (
              <ProfessorCard
                key={prof.id}
                id={prof.id}
                name={prof.name_th}
                position={prof.position}
                image={prof.image}
                email={prof.email}
              />
            ))}
          </div>
        </div>
      </section>

      {/* STAFF SECTION */}
      <section className="staff-section">
        <h2>บุคลากรภาควิชาฟิสิกส์อุตสาหกรรม</h2>
        <div className="prof-container">
          <div className="prof-grid">
            {staff.map((person) => (
              <ProfessorCard
                key={person.id}
                id={person.id}
                name={person.name_th}
                position={person.position}
                image={person.image}
                email={person.email}
              />
            ))}
          </div>
        </div>
        <ProfessorMatcherPopup
          isOpen={isMatcherOpen}              // ← ส่ง state
          onClose={() => setIsMatcherOpen(false)}  // ← ส่ง function ปิด
          professors={professors}
          departmentFilter="phys"
          onProfessorSelect={handleProfessorSelect}
        />
      </section>
    </>
  );
}
