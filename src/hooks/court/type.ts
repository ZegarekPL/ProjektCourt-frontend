export interface Court {
    id: number;
    name: string;
    localization: string
    surfaceType: string;
    comments: string[];
    grades: Grades
}

export interface NewCourt {
    name: string;
    localization: string
    surfaceType: string;
}

export interface Grades {
    grade1: number;
    grade2: number;
    grade3: number;
    grade4: number;
    grade5: number;
}