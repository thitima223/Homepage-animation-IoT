import { useState, useEffect } from 'react';
import './CourseStructure.css';
import CourseTable from '../../CourseTable/CourseTable';
import { type Course } from '../../curriculumData';

export default function CourseStructureContinue() {
    const [selectedYear, setSelectedYear] = useState<string>('2565');
    const [courses, setCourses] = useState<Course[]>([]);
    const availableYears = ['2568', '2565'];

    useEffect(() => {
        fetch(`/api/curriculum/continue/${selectedYear}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCourses(data);
                }
            })
            .catch(err => console.error("Error fetching curriculum:", err));
    }, [selectedYear]);

    return (
        <div className="course-structure-section continue-theme">
            <h2 className="course-structure-title">
                โครงสร้างหลักสูตรวิศวกรรมคอมพิวเตอร์และไอโอที (ต่อเนื่อง) {selectedYear}
            </h2>

            <div className="course-structure-layout">
                {/* Left: Table */}
                <div className="course-structure-left">
                    {/* Year Selection Controls */}
                    <div className="curriculum-year-selector" style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
                        {availableYears.map(year => (
                            <button
                                key={year}
                                className={`course-button ${selectedYear === year ? 'active' : 'secondary'}`}
                                onClick={() => setSelectedYear(year)}
                                style={{ padding: '8px 16px', minWidth: '80px' }}
                            >
                                {year}
                            </button>
                        ))}
                    </div>

                    <CourseTable courses={courses} theme="continue-theme" years={4} />
                    <button className="course-button secondary" style={{ marginTop: '20px' }}>
                        แผนการศึกษาหลักสูตรต่อเนื่อง
                    </button>
                </div>

                {/* Right: PDF */}
                <div className="course-structure-right">
                    <div className="pdf-mockup">
                        <div className="pdf-mockup-body" style={{ height: '600px' }}>
                            <iframe
                                src="https://drive.google.com/file/d/1U8mm7DxtNpFDbuWFgt22wRNEKulB_OU3/preview"
                                width="100%"
                                height="100%"
                                title="Curriculum PDF Preview"
                                style={{ border: 'none' }}
                            />
                        </div>
                    </div>
                    <a
                        href="https://drive.google.com/file/d/1U8mm7DxtNpFDbuWFgt22wRNEKulB_OU3/view"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', display: 'block', width: '100%' }}
                    >
                        <button className="course-button">
                            เล่มหลักสูตรวิศวกรรมคอมพิวเตอร์และไอโอที (ต่อเนื่อง)
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}
