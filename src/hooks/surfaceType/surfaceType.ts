import {AxiosResponse} from "axios";
import {Grade, NewGrade} from "@/hooks/grade/type";
import {appAPI} from "@/utils/appAPI";
import {SurfaceType} from "@/hooks/surfaceType/type";


export async function getAllSurfaceType() {
    try {
        const response: AxiosResponse<SurfaceType[]> = await appAPI.get(
            `/api/surfaceType`,
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

export async function addSurfaceType(surfaceType: SurfaceType) {
    try {
        const response: AxiosResponse<NewGrade> = await appAPI.post(
            `/api/surfaceType/addNewSurfaceType`,
            surfaceType,
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