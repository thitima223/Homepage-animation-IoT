// components/ProfessorMatcherPopup.tsx
import React, { useState, useMemo, useEffect } from 'react';
import type { Professor } from './FacultyData';
import { ProfessorItem } from './item';
import { getAllUniqueExpertise, getMatchedProfessors } from './matching-utils';
import './match.css';

interface ProfessorMatcherPopupProps {
    isOpen: boolean;
    onClose: () => void;
    professors: Professor[];
    departmentFilter?: 'iot' | 'phys';
    onProfessorSelect?: (professor: Professor) => void;
}

export const ProfessorMatcherPopup: React.FC<ProfessorMatcherPopupProps> = ({
    isOpen,
    onClose,
    professors,
    departmentFilter = 'iot',
    onProfessorSelect
}) => {
    const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [activeDept, setActiveDept] = useState<'iot' | 'phys'>(departmentFilter || 'iot');

    // ✅ ปิด ESC เพื่อปิด popup
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // ป้องกัน scroll
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // ✅ Reset state เมื่อเปิด popup ใหม่
    useEffect(() => {
        if (isOpen) {
            setSelectedExpertise([]);
            setShowResults(false);
            setActiveDept(departmentFilter || 'iot');
        }
    }, [isOpen, departmentFilter]);

    const allExpertise = useMemo(
        () => getAllUniqueExpertise(professors, activeDept),
        [professors, activeDept]
    );

    const toggleExpertise = (exp: string) => {
        setSelectedExpertise(prev =>
            prev.includes(exp) ? prev.filter(e => e !== exp) : [...prev, exp]
        );
        setShowResults(false);
    };

    const clearSelection = () => {
        setSelectedExpertise([]);
        setShowResults(false);
    };

    const matchedProfessors = useMemo(() => {
        if (selectedExpertise.length === 0) return [];
        return getMatchedProfessors(professors, selectedExpertise, activeDept);
    }, [professors, selectedExpertise, activeDept]);

    const handleProfessorClick = (professor: Professor) => {
        if (onProfessorSelect) {
            onProfessorSelect(professor);
        }
        onClose(); // ✅ ปิด popup เมื่อเลือกอาจารย์
    };

    // ✅ ถ้าไม่เปิด ให้ return null
    if (!isOpen) return null;

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="popup-close" onClick={onClose} aria-label="ปิด">
                    ✕
                </button>

                {/* Header */}
                <div className="popup-header">
                    <h2>🎯 หาอาจารย์ที่ปรึกษา</h2>
                    <p>เลือกความสนใจของคุณเพื่อค้นหาอาจารย์ที่ตรงที่สุด</p>
                </div>

                {/* Department Filter */}
                <div className="popup-department-filter">
                    <span>ภาควิชา:</span>
                    <div className="dept-buttons">
                        {(['iot', 'phys'] as const).map(dept => (
                            <button
                                key={dept}
                                className={`dept-btn ${activeDept === dept ? 'active' : ''}`}
                                onClick={() => {
                                    setActiveDept(dept);
                                    setShowResults(false);
                                }}
                            >
                                {dept === 'iot' ? 'IoT' : 'ฟิสิกส์'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Expertise Selection */}
                <div className="popup-content">
                    <div className="expertise-section">
                        <div className="expertise-header">
                            <h3>เลือกความสนใจ</h3>
                            {selectedExpertise.length > 0 && (
                                <button className="clear-btn" onClick={clearSelection}>
                                    ล้างทั้งหมด
                                </button>
                            )}
                        </div>

                        <div className="expertise-grid">
                            {allExpertise.map(exp => (
                                <label
                                    key={exp}
                                    className={`expertise-chip ${selectedExpertise.includes(exp) ? 'selected' : ''}`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedExpertise.includes(exp)}
                                        onChange={() => toggleExpertise(exp)}
                                    />
                                    <span>{exp}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Search Button */}
                    {selectedExpertise.length > 0 && (
                        <div className="popup-action">
                            <button
                                className="btn-search"
                                onClick={() => setShowResults(true)}
                                disabled={matchedProfessors.length === 0}
                            >
                                🔍 ค้นหาอาจารย์ ({matchedProfessors.length})
                            </button>
                        </div>
                    )}

                    {/* Results */}
                    {showResults && (
                        <div className="results-section">
                            <h3>📌 ผลการค้นหา ({matchedProfessors.length})</h3>

                            {matchedProfessors.length > 0 ? (
                                <div className="results-grid">
                                    {matchedProfessors.map(prof => (
                                        <ProfessorItem
                                            key={prof.id}
                                            professor={prof}
                                            matchScore={prof.matchScore}
                                            selectedExpertise={selectedExpertise}
                                            onClick={() => handleProfessorClick(prof)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="no-results">
                                    <p>😅 ไม่พบอาจารย์ที่ตรงกับความสนใจนี้</p>
                                    <p className="no-results-hint">ลองเลือกหัวข้ออื่นดูนะ</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfessorMatcherPopup;