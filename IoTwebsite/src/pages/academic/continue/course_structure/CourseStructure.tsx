import { useState, useEffect } from 'react';
import './CourseStructure.css';
import CourseTable from '../../CourseTable/CourseTable';
import { type Course, type CurriculumMetadata } from '../../curriculumData';

const API_BASE = '';

export default function CourseStructureContinue() {
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [courses, setCourses] = useState<Course[]>([]);
    const [availableYears, setAvailableYears] = useState<string[]>([]);
    const [metadata, setMetadata] = useState<CurriculumMetadata | null>(null);

    // Fetch available years from DB on mount
    useEffect(() => {
        fetch(`${API_BASE}/api/curriculum/continue/years`)
            .then(res => res.json())
            .then((years: string[]) => {
                if (Array.isArray(years) && years.length > 0) {
                    setAvailableYears(years);
                    setSelectedYear(years[0]);
                }
            })
            .catch(err => console.error('Error fetching Continue years:', err));
    }, []);

    // Fetch courses and metadata whenever selected year changes
    useEffect(() => {
        if (!selectedYear) return;

        // Fetch courses
        fetch(`${API_BASE}/api/curriculum/continue/${selectedYear}`)
            .then(res => res.json())
            .then((data: Course[]) => {
                if (Array.isArray(data)) {
                    setCourses(data);
                }
            })
            .catch(err => console.error('Error fetching Continue courses:', err));

        // Fetch metadata
        fetch(`${API_BASE}/api/curriculum/continue/${selectedYear}/metadata`)
            .then(res => res.json())
            .then((meta: CurriculumMetadata) => {
                setMetadata(meta);
            })
            .catch(err => console.error('Error fetching Continue metadata:', err));
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
        <div className="course-structure-section continue-theme">
            <h2 className="course-structure-title">
                โครงสร้างหลักสูตรวิศวกรรมคอมพิวเตอร์และไอโอที (ต่อเนื่อง) {selectedYear}
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
                                    className={`course-button ${selectedYear === year ? 'active' : 'secondary'}`}
                                    onClick={() => setSelectedYear(year)}
                                    style={{ padding: '8px 16px', minWidth: '80px' }}
                                >
                                    {year}
                                </button>
                            ))
                        )}
                    </div>

                    <CourseTable courses={courses} theme="continue-theme" years={4} />
                    <button className="course-button secondary" style={{ marginTop: '20px' }}>
                        แผนการศึกษาหลักสูตรต่อเนื่อง
                    </button>
                </div>

                <div className="course-structure-right">
                    <div className="pdf-mockup">
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
                            <button className="course-button">
                                {metadata.pdfLabel || `เล่มหลักสูตรวิศวกรรมคอมพิวเตอร์และไอโอที (ต่อเนื่อง) ${selectedYear}`}
                            </button>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
