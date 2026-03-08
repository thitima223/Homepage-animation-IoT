import { useLayoutEffect, useState, useRef } from 'react';
import type { Course } from '../curriculumData';
import './CourseTable.css';

interface CourseTableProps {
    courses: Course[];
    theme?: string;
    years?: number;
}

export default function CourseTable({ courses, theme = '', years = 4 }: CourseTableProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    useLayoutEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getYearText = (year: number) => {
        if (year === 1) return "1st year";
        if (year === 2) return "2nd year";
        if (year === 3) return "3rd year";
        if (year === 4) return "4th year";
        return `${year}th year`;
    };

    const handleCourseClick = (course: Course) => {
        if (course.description) {
            setSelectedCourse(course);
        }
    };

    const closePopup = () => {
        setSelectedCourse(null);
    };

    const renderMobile = () => {
        return (
            <div className={`course-mobile-container ${theme}`} ref={containerRef}>
                {Array.from({ length: years }, (_, i) => i + 1).map(year => (
                    <div className="mobile-year-group" key={year}>
                        <div className="mobile-year-label">
                            <span className="vertical-text">{getYearText(year)}</span>
                        </div>
                        <div className="mobile-semesters">
                            {year === years && years >= 4 ? (
                                <div className="mobile-plan-container" style={{ flexDirection: 'row', width: '100%', gap: '10px' }}>
                                    {/* PLAN 1 Column */}
                                    <div className="mobile-plan-box mobile-plan-box-outline" style={{ flex: 1 }}>
                                        <div className="mobile-courses-grid" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {courses.filter(c => c.col >= (years * 2) - 1 && c.row < 6).map(course => (
                                                <div
                                                    key={course.id}
                                                    id={`m-course-${course.id}`}
                                                    className={`mobile-course-pill mobile-plan-pill ${course.className || ''} ${course.description ? 'has-description' : ''}`}
                                                    onClick={() => handleCourseClick(course)}
                                                >
                                                    {course.name}
                                                </div>
                                            ))}
                                            <div style={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingTop: '15px' }}>
                                                <div className="mobile-plan-header"><span>PLAN 1</span><br />project</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* PLAN 2 Column */}
                                    <div className="mobile-plan-box mobile-plan-box-outline" style={{ flex: 1 }}>
                                        <div className="mobile-courses-grid" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {courses.filter(c => c.col >= (years * 2) - 1 && c.row >= 6).map(course => (
                                                <div
                                                    key={course.id}
                                                    id={`m-course-${course.id}`}
                                                    className={`mobile-course-pill mobile-plan-pill ${course.className || ''} ${course.description ? 'has-description' : ''}`}
                                                    onClick={() => handleCourseClick(course)}
                                                >
                                                    {course.name}
                                                </div>
                                            ))}
                                            <div style={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingTop: '15px' }}>
                                                <div className="mobile-plan-header"><span>PLAN 2</span><br />Co-op</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                                    <div className="mobile-semester">
                                        <div className="mobile-sem-label">
                                            <span className="vertical-text">S1</span>
                                        </div>
                                        <div className="mobile-courses-grid">
                                            {courses.filter(c => c.col === year * 2 - 1).map(course => (
                                                <div
                                                    key={course.id}
                                                    id={`m-course-${course.id}`}
                                                    className={`mobile-course-pill ${course.className || ''} ${course.description ? 'has-description' : ''}`}
                                                    onClick={() => handleCourseClick(course)}
                                                    style={{
                                                        gridColumn: course.mobileColSpan ? `${course.mobileCol} / span ${course.mobileColSpan}` : course.mobileCol,
                                                        gridRow: course.mobileRowSpan ? `${course.mobileRow} / span ${course.mobileRowSpan}` : course.mobileRow,
                                                    }}
                                                >
                                                    {course.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mobile-semester">
                                        <div className="mobile-sem-label">
                                            <span className="vertical-text">S2</span>
                                        </div>
                                        <div className="mobile-courses-grid">
                                            {courses.filter(c => c.col === year * 2).map(course => (
                                                <div
                                                    key={course.id}
                                                    id={`m-course-${course.id}`}
                                                    className={`mobile-course-pill ${course.className || ''} ${course.description ? 'has-description' : ''}`}
                                                    onClick={() => handleCourseClick(course)}
                                                    style={{
                                                        gridColumn: course.mobileColSpan ? `${course.mobileCol} / span ${course.mobileColSpan}` : course.mobileCol,
                                                        gridRow: course.mobileRowSpan ? `${course.mobileRow} / span ${course.mobileRowSpan}` : course.mobileRow,
                                                    }}
                                                >
                                                    {course.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderDesktop = () => {
        const coreCourses = courses.filter(c => c.col < (years * 2) - 1);
        const plan1Courses = courses.filter(c => c.col >= (years * 2) - 1 && c.row < 6);
        const plan2Courses = courses.filter(c => c.col >= (years * 2) - 1 && c.row >= 6);

        return (
            <div className={`course-table-container ${theme}`}>
                {/* Header Rows */}
                <div className="course-header-years" style={{ gridTemplateColumns: `repeat(${years * 2}, 1fr)` }}>
                    {Array.from({ length: years }, (_, i) => i + 1).map(year => (
                        <div key={`year-${year}`} className="year-header">{getYearText(year)}</div>
                    ))}
                </div>
                <div className="course-header-semesters" style={{ gridTemplateColumns: `repeat(${years * 2}, 1fr)` }}>
                    {Array.from({ length: years * 2 }, (_, i) => i + 1).map(sem => (
                        <div key={`sem-${sem}`} className="semester-header">Semester {sem % 2 === 1 ? 1 : 2}</div>
                    ))}
                </div>

                {/* Grid Content */}
                <div className="course-grid-area" ref={containerRef} style={{ gridTemplateColumns: `repeat(${years * 2}, 1fr)` }}>
                    {/* Pump core courses into the grid */}
                    {coreCourses.map(course => (
                        <div
                            key={course.id}
                            id={`course-${course.id}`}
                            className={`course-pill ${course.className || ''} ${course.description ? 'has-description' : ''}`}
                            onClick={() => handleCourseClick(course)}
                            style={{
                                gridColumn: course.col,
                                gridRow: course.rowSpan ? `${course.row} / span ${course.rowSpan}` : course.row,
                            }}
                        >
                            {course.name}
                        </div>
                    ))}

                    {/* Final Year Plans Wrapper if years >= 4 */}
                    {years >= 4 && (
                        <>
                            {/* Plan 1 Wrapper */}
                            <div className="plan-box" style={{ gridColumn: `${(years * 2) - 1} / ${(years * 2) + 1}`, gridRow: '1 / 6' }}>
                                <div className="plan-box-grid">
                                    {plan1Courses.map(course => (
                                        <div
                                            key={course.id}
                                            id={`course-${course.id}`}
                                            className={`course-pill ${course.className || ''} ${course.description ? 'has-description' : ''}`}
                                            onClick={() => handleCourseClick(course)}
                                            style={{
                                                gridColumn: course.col - ((years * 2) - 2),
                                                gridRow: course.rowSpan ? `${course.row} / span ${course.rowSpan}` : course.row,
                                            }}
                                        >
                                            {course.name}
                                        </div>
                                    ))}
                                    <div className="plan-text" style={{ gridColumn: 2, gridRow: '4 / 6', alignSelf: 'end', justifySelf: 'center', paddingBottom: '10px' }}>
                                        <span>PLAN 1</span><br />project
                                    </div>
                                </div>
                            </div>

                            {/* Plan 2 Wrapper */}
                            <div className="plan-box" style={{ gridColumn: `${(years * 2) - 1} / ${(years * 2) + 1}`, gridRow: '6 / 11' }}>
                                <div className="plan-box-grid">
                                    {plan2Courses.map(course => (
                                        <div
                                            key={course.id}
                                            id={`course-${course.id}`}
                                            className={`course-pill ${course.className || ''} ${course.description ? 'has-description' : ''}`}
                                            onClick={() => handleCourseClick(course)}
                                            style={{
                                                gridColumn: course.col - ((years * 2) - 2),
                                                gridRow: course.rowSpan ? `${course.row - 5} / span ${course.rowSpan}` : course.row - 5,
                                            }}
                                        >
                                            {course.name}
                                        </div>
                                    ))}
                                    <div className="plan-text" style={{ gridColumn: 1, gridRow: '4 / 6', alignSelf: 'end', justifySelf: 'center', paddingBottom: '10px' }}>
                                        <span>PLAN 2</span><br />Co-op
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            {isMobile ? renderMobile() : renderDesktop()}

            {/* Description Popup Modal */}
            {selectedCourse && (
                <div className="course-description-overlay" onClick={closePopup}>
                    <div className="course-description-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{selectedCourse.name}</h3>
                            <button className="close-btn" onClick={closePopup}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <p>{selectedCourse.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
