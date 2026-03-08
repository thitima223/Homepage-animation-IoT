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
}

export type CurriculumData = {
    [year: string]: Course[];
};
