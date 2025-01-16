import {AxiosResponse} from "axios";
import {appAPI} from "@/utils/appAPI";
import {AddSurfaceType, SurfaceType} from "@/hooks/surfaceType/type";


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

export async function addSurfaceType(surfaceType: AddSurfaceType) {
    try {
        const response: AxiosResponse<AddSurfaceType> = await appAPI.post(
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