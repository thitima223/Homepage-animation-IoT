import { useState, useEffect } from 'react';
import './CourseStructure.css';
import './CourseTable_PHYIOT.css';
import CourseTable from '../../CourseTable/CourseTable';
import { type Course } from '../../curriculumData';

export default function CourseStructurePhyIoT() {
    const [selectedYear, setSelectedYear] = useState<string>('2565');
    const [courses, setCourses] = useState<Course[]>([]);
    const availableYears = ['2568', '2565'];

    useEffect(() => {
        fetch(`/api/curriculum/physiot/${selectedYear}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCourses(data);
                }
            })
            .catch(err => console.error("Error fetching curriculum:", err));
    }, [selectedYear]);

    return (
        <div className="course-structure-section phy-iot-theme">
            {/* Top Header */}
            <h2 className="course-structure-title">
                โครงสร้างหลักสูตรสาขาวิชาฟิสิกส์อุตสาหกรรม วิศวกรรมระบบไอโอที (หลักสูตรสองปริญญา) {selectedYear}
            </h2>

            <div className="course-structure-layout">
                {/* Left Side: Course Table (Standardized Position) */}
                <div className="course-structure-left">
                    {/* Year Selection Controls */}
                    <div className="curriculum-year-selector" style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
                        {availableYears.map(year => (
                            <button
                                key={year}
                                className={`phy-year-btn ${selectedYear === year ? 'active' : ''}`}
                                onClick={() => setSelectedYear(year)}
                                style={{ padding: '8px 16px', minWidth: '80px', borderRadius: '10px', cursor: 'pointer', border: 'none', fontWeight: 'bold' }}
                            >
                                {year}
                            </button>
                        ))}
                    </div>

                    <CourseTable courses={courses} theme="phy-iot-theme" years={4} />
                    <button className="phy-course-action-btn secondary" style={{ marginTop: '20px' }}>
                        แผนการศึกษาหลักสูตรสองปริญญา
                    </button>
                </div>

                {/* Right Side: PDF Mockup (Standardized Position) */}
                <div className="course-structure-right">
                    <div className="phy-pdf-mockup" style={{ height: '600px' }}>
                        <iframe
                            src="https://drive.google.com/file/d/1cHSWjO3A03lcGqgbT9PR51d335LfaVVo/preview"
                            width="100%"
                            height="100%"
                            title="Curriculum PDF Preview"
                            style={{ border: 'none' }}
                        />
                    </div>
                    <a
                        href="https://drive.google.com/file/d/1cHSWjO3A03lcGqgbT9PR51d335LfaVVo/view"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', display: 'block', width: '100%' }}
                    >
                        <button className="phy-course-action-btn">
                            เล่มหลักสูตรฟิสิกส์อุตสาหกรรม วิศวกรรมระบบไอโอที {selectedYear}
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}
