import {Grades} from "@/hooks/court/type";


export const calculateWeightedAverageRating = (grades: Grades) => {
    return calculateTotalWeight(grades) / calculateWeightedSum(grades);
};

const calculateTotalWeight = (grades: Grades) => {
    return (1 * grades.grade1) + (2 * grades.grade2) + (3 * grades.grade3) + (4 * grades.grade4) + (5 * grades.grade5)
};

export const calculateWeightedSum = (grades: Grades) => {
    return grades.grade1 + grades.grade2 + grades.grade3 + grades.grade4 + grades.grade5;
};

