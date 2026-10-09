import { useState, useEffect } from 'react';
import './CourseStructure.css';
import './CourseTable_PHYIOT.css';
import CourseTable from '../../CourseTable/CourseTable';
import { type Course, type CurriculumMetadata } from '../../curriculumData';

const API_BASE = '';

export default function CourseStructurePhyIoT() {
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [courses, setCourses] = useState<Course[]>([]);
    const [availableYears, setAvailableYears] = useState<string[]>([]);
    const [metadata, setMetadata] = useState<CurriculumMetadata | null>(null);

    // Fetch available years from DB on mount
    useEffect(() => {
        fetch(`${API_BASE}/api/curriculum/physiot/years`)
            .then(res => res.json())
            .then((years: string[]) => {
                if (Array.isArray(years) && years.length > 0) {
                    setAvailableYears(years);
                    setSelectedYear(years[0]);
                }
            })
            .catch(err => console.error('Error fetching PhysIoT years:', err));
    }, []);

    // Fetch courses and metadata whenever selected year changes
    useEffect(() => {
        if (!selectedYear) return;

        // Fetch courses
        fetch(`${API_BASE}/api/curriculum/physiot/${selectedYear}`)
            .then(res => res.json())
            .then((data: Course[]) => {
                if (Array.isArray(data)) {
                    setCourses(data);
                }
            })
            .catch(err => console.error('Error fetching PhysIoT courses:', err));

        // Fetch metadata
        fetch(`${API_BASE}/api/curriculum/physiot/${selectedYear}/metadata`)
            .then(res => res.json())
            .then((meta: CurriculumMetadata) => {
                setMetadata(meta);
            })
            .catch(err => console.error('Error fetching PhysIoT metadata:', err));
    }, [selectedYear]);

    // Helper to get preview URL from view URL
    const getPreviewUrl = (url: string) => {
        if (!url) return '';
        if (url.includes('drive.google.com') && url.includes('/view')) {
            return url.replace('/view', '/preview');
        }
        return url;
    };

    return (
        <div className="course-structure-section phy-iot-theme">
            <h2 className="course-structure-title">
                โครงสร้างหลักสูตรสาขาวิชาฟิสิกส์อุตสาหกรรม วิศวกรรมระบบไอโอที (หลักสูตรสองปริญญา) {selectedYear}
            </h2>

            <div className="course-structure-layout">
                <div className="course-structure-left">
                    <div className="curriculum-year-selector" style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
                        {availableYears.length === 0 ? (
                            <span style={{ color: '#888' }}>กำลังโหลด...</span>
                        ) : (
                            availableYears.map(year => (
                                <button
                                    key={year}
                                    className={`phy-year-btn ${selectedYear === year ? 'active' : ''}`}
                                    onClick={() => setSelectedYear(year)}
                                    style={{ padding: '8px 16px', minWidth: '80px', borderRadius: '10px', cursor: 'pointer', border: 'none', fontWeight: 'bold' }}
                                >
                                    {year}
                                </button>
                            ))
                        )}
                    </div>

                    <CourseTable courses={courses} theme="phy-iot-theme" years={4} />
                    <button className="phy-course-action-btn secondary" style={{ marginTop: '20px' }}>
                        แผนการศึกษาหลักสูตรสองปริญญา
                    </button>
                </div>

                <div className="course-structure-right">
                    <div className="phy-pdf-mockup">
                        {metadata?.pdfUrl ? (
                            <iframe
                                src={getPreviewUrl(metadata.pdfUrl)}
                                width="100%"
                                height="100%"
                                title="Curriculum PDF Preview"
                                style={{ border: 'none' }}
                            />
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#888' }}>
                                ไม่พบไฟล์ PDF ของหลักสูตรปีนี้
                            </div>
                        )}
                    </div>
                    {metadata?.pdfUrl && (
                        <a
                            href={metadata.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none', display: 'block', width: '100%' }}
                        >
                            <button className="phy-course-action-btn">
                                {metadata.pdfLabel || `เล่มหลักสูตรฟิสิกส์อุตสาหกรรม วิศวกรรมระบบไอโอที ${selectedYear}`}
                            </button>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
