import { useLayoutEffect, useState, useRef } from 'react';
import type { Course } from '../curriculumData';
import './CourseTable.css';

interface CourseTableProps {
    courses: Course[];
    theme?: string;
    years?: number;
}

// Groups plan courses by year-pair and plan number
interface PlanGroup {
    colPair: number;       // e.g. 4 for year 4 (cols 7-8)
    planGroup: number;     // 1, 2, 3...
    planLabel: string;     // "PLAN 1\nproject"
    courses: Course[];
}

export default function CourseTable({ courses, theme = '', years = 4 }: CourseTableProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    useLayoutEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
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

    // ─── Data-driven plan group computation ───────────────────────────────────
    // Separate regular courses from plan-grouped ones
    const regularCourses = courses.filter(c => !c.planGroup);
    const planCourses = courses.filter(c => c.planGroup);

    // Build a map of { "colPair-planGroup" → PlanGroup }
    const planGroupMap = new Map<string, PlanGroup>();
    for (const course of planCourses) {
        const colPair = Math.ceil(course.col / 2);  // col 7 or 8 → year 4
        const pg = course.planGroup!;
        const key = `${colPair}-${pg}`;
        if (!planGroupMap.has(key)) {
            planGroupMap.set(key, {
                colPair,
                planGroup: pg,
                planLabel: course.planLabel || `PLAN ${pg}`,
                courses: [],
            });
        }
        planGroupMap.get(key)!.courses.push(course);
    }

    // Get unique colPairs that have plan groups, sorted
    const planColPairs = [...new Set([...planGroupMap.values()].map(g => g.colPair))].sort();

    // For each colPair, get the sorted list of plan groups
    const getPlanGroupsForColPair = (colPair: number): PlanGroup[] =>
        [...planGroupMap.values()]
            .filter(g => g.colPair === colPair)
            .sort((a, b) => a.planGroup - b.planGroup);

    // ─── Desktop Renderer ─────────────────────────────────────────────────────
    const renderDesktop = () => {
        // Compute how many grid rows each plan colPair uses
        // We need to decide the vertical split between plan groups
        // Plan group 1 → rows 1 to planSplit, Plan group 2 → rows planSplit+1 to maxRow
        // We use a fixed split of row 5 as boundary (matching the original logic)
        const PLAN_SPLIT_ROW = 5;

        return (
            <div className={`course-table-container ${theme}`}>
                {/* Year Headers */}
                <div className="course-header-years" style={{
                    gridTemplateColumns: `repeat(${years * 2}, 1fr)`,
                    width: '100%'
                }}>
                    {Array.from({ length: years }, (_, i) => i + 1).map(year => (
                        <div key={`year-${year}`} className="year-header">{getYearText(year)}</div>
                    ))}
                </div>

                {/* Semester Headers */}
                <div className="course-header-semesters" style={{
                    gridTemplateColumns: `repeat(${years * 2}, 1fr)`,
                    width: '100%'
                }}>
                    {Array.from({ length: years * 2 }, (_, i) => i + 1).map(sem => (
                        <div key={`sem-${sem}`} className="semester-header">Semester {sem % 2 === 1 ? 1 : 2}</div>
                    ))}
                </div>

                {/* Grid Content */}
                <div className="course-grid-area" ref={containerRef} style={{
                    gridTemplateColumns: `repeat(${years * 2}, 1fr)`,
                    width: '100%'
                }}>
                    {/* Regular courses */}
                    {regularCourses.map(course => (
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

                    {/* Data-driven Plan Boxes */}
                    {planColPairs.map(colPair => {
                        const groups = getPlanGroupsForColPair(colPair);
                        const startCol = colPair * 2 - 1;  // e.g. colPair 4 → col 7
                        const endCol = colPair * 2 + 1;  // span 2 columns

                        // Compute row ranges for each plan group
                        // Plan 1 → rows 1–PLAN_SPLIT_ROW, Plan 2 → rows PLAN_SPLIT_ROW+1–10, etc.
                        // For 3+ groups we divide equally; for 2 groups use the split
                        const totalGroups = groups.length;
                        const rowsPerGroup = totalGroups === 1 ? 10
                            : totalGroups === 2 ? PLAN_SPLIT_ROW
                                : Math.floor(10 / totalGroups);

                        return groups.map((group, idx) => {
                            const rowStart = idx * rowsPerGroup + 1;
                            const rowEnd = idx === totalGroups - 1 ? 11 : rowStart + rowsPerGroup;

                            // Offset each course's col & row relative to the plan box grid
                            const colOffset = startCol - 1;  // e.g. 6
                            const rowOffset = rowStart - 1;  // e.g. 0 for plan1, 5 for plan2

                            return (
                                <div
                                    key={`plan-${colPair}-${group.planGroup}`}
                                    className="plan-box"
                                    style={{ gridColumn: `${startCol} / ${endCol}`, gridRow: `${rowStart} / ${rowEnd}` }}
                                >
                                    <div className="plan-box-grid">
                                        {group.courses.map(course => (
                                            <div
                                                key={course.id}
                                                id={`course-${course.id}`}
                                                className={`course-pill ${course.className || ''} ${course.description ? 'has-description' : ''}`}
                                                onClick={() => handleCourseClick(course)}
                                                style={{
                                                    gridColumn: course.col - colOffset,
                                                    gridRow: course.rowSpan
                                                        ? `${course.row - rowOffset} / span ${course.rowSpan}`
                                                        : course.row - rowOffset,
                                                }}
                                            >
                                                {course.name}
                                            </div>
                                        ))}
                                        {/* Plan label at bottom */}
                                        <div
                                            className="plan-text"
                                            style={{
                                                gridColumn: totalGroups === 2 ? (idx === 0 ? 2 : 1) : 1,
                                                gridRow: '4 / 6',
                                                alignSelf: 'end',
                                                justifySelf: 'center',
                                                paddingBottom: '10px'
                                            }}
                                        >
                                            {group.planLabel.split('\\n').map((line, i) => (
                                                i === 0
                                                    ? <span key={i}>{line}</span>
                                                    : <>{<br />}{line}</>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        });
                    })}
                </div>
            </div>
        );
    };

    // ─── Mobile Renderer ──────────────────────────────────────────────────────
    const renderMobile = () => {
        return (
            <div className={`course-mobile-container ${theme}`} ref={containerRef}>
                {Array.from({ length: years }, (_, i) => i + 1).map(year => {
                    const colPair = year;
                    const hasPlanGroups = planColPairs.includes(colPair);
                    const planGroups = hasPlanGroups ? getPlanGroupsForColPair(colPair) : [];

                    return (
                        <div className="mobile-year-group" key={year}>
                            <div className="mobile-year-label">
                                <span className="vertical-text">{getYearText(year)}</span>
                            </div>
                            <div className="mobile-semesters">
                                {hasPlanGroups ? (
                                    <div className="mobile-plan-container">
                                        {planGroups.map((group, idx) => (
                                            <div
                                                key={group.planGroup}
                                                className={`mobile-plan-box ${idx === 0 ? 'mobile-plan-box-outline' : ''}`}
                                                style={{ flex: 1, ...(idx > 0 ? { backgroundColor: 'rgba(255,255,255,0.1)', opacity: 0.5 } : {}) }}
                                            >
                                                <div className="mobile-courses-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                                                    {group.courses.map(course => (
                                                        <div
                                                            key={course.id}
                                                            id={`m-course-${course.id}`}
                                                            className={`mobile-course-pill mobile-plan-pill ${course.className || ''} ${course.description ? 'has-description' : ''}`}
                                                            onClick={() => handleCourseClick(course)}
                                                        >
                                                            {course.name}
                                                        </div>
                                                    ))}
                                                    <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingTop: '10px' }}>
                                                        <div className="mobile-plan-header">
                                                            {group.planLabel.split('\\n').map((line, i) => (
                                                                i === 0
                                                                    ? <span key={i}>{line}</span>
                                                                    : <>{<br />}{line}</>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                                        <div className="mobile-semester">
                                            <div className="mobile-sem-label">
                                                <span className="vertical-text">S1</span>
                                            </div>
                                            <div className="mobile-courses-grid">
                                                {courses.filter(c => c.col === year * 2 - 1 && !c.planGroup).map(course => (
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
                                                {courses.filter(c => c.col === year * 2 && !c.planGroup).map(course => (
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
                    );
                })}
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
