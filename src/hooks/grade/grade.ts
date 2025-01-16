import {AxiosResponse} from "axios";
import {appAPI} from "@/utils/appAPI";
import {Grade, NewGrade} from "@/hooks/grade/type";

export async function getAllGrades() {
    try {
        const response: AxiosResponse<Grade[]> = await appAPI.get(
            `/api/grade/getAll`,
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            return response.data;
        } else {
            console.error("Failed to fetch courts data");
            return [];
        }
    } catch (error) {
        console.error("Error fetching courts data", error);
        return [];
    }
}

export async function addGrade(userId: number, courtId: number, grade: NewGrade) {
    console.log("grade", grade);
    try {
        const response: AxiosResponse<NewGrade> = await appAPI.post(
            `/api/grade/${userId}/court/${courtId}`,
            grade,
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            return response.data;
        } else {
            console.error("Failed to fetch courts data");
            return "Failed";
        }
    } catch (error) {
        console.error("Error fetching courts data", error);
        return "Failed";
    }
}

export async function editGrade(userId: number, courtId: number, grade: NewGrade) {
    try {
        const response: AxiosResponse<NewGrade> = await appAPI.put(
            `/api/grade/${userId}/court/${courtId}`,
            grade,
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            return response.data;
        } else {
            console.error("Failed");
            return "Failed";
        }
    } catch (error) {
        console.error("Error fetching courts data", error);
        return "Failed";
    }
}