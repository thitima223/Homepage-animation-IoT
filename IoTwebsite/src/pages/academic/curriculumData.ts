import type { ReactNode } from 'react';

export interface Course {
    id: string;
    name: ReactNode;
    description?: string;
    col: number; // 1 to 8 (semesters)
    row: number; // 1 to 9 (vertical position)
    rowSpan?: number;
    className?: string;
    mobileCol?: number; // 1 to 6
    mobileRow?: number; // 1 to n
    mobileColSpan?: number;
    mobileRowSpan?: number;
    planGroup?: number | null;  // which plan box (1, 2, ...) — null = regular course
    planLabel?: string | null;  // label shown at bottom of plan box, e.g. "PLAN 1\nproject"
}

export interface CurriculumMetadata {
    program: string;
    curriculumYear: string;
    pdfUrl: string;
    pdfLabel: string;
}

export type CurriculumData = {
    [year: string]: Course[];
};
