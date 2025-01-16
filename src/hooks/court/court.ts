import {AxiosResponse} from "axios";
import {appAPI} from "@/utils/appAPI";
import {Court, NewCourt} from "@/hooks/court/type";

export async function getAllCourts() {
    try {
        const response: AxiosResponse<Court[]> = await appAPI.get(
            `/api/court/getAll`,
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

export async function getCourtById(courtId: number) {
    try {
        const response: AxiosResponse<Court> = await appAPI.get(
            `/api/court/${courtId}`,
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            return response.data;
        } else {
            console.error("Failed to fetch courts data");
            return null;
        }
    } catch (error) {
        console.error("Error fetching courts data", error);
        return null;
    }
}

export async function addCourt(newCourt: NewCourt) {
    try {
        const response: AxiosResponse<NewCourt> = await appAPI.post(
            `/api/court/add`,
            newCourt,
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            return response.data;
        } else {
            console.error("Failed to fetch courts data");
            return null;
        }
    } catch (error) {
        console.error("Error fetching courts data", error);
        return null;
    }
}

export async function deleteCourtById(courtId: number) {
    try {
        const response: AxiosResponse<Court> = await appAPI.delete(
            `/api/court/${courtId}/delete`,
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            return response.data;
        } else {
            console.error("Failed to fetch courts data");
            return null;
        }
    } catch (error) {
        console.error("Error fetching courts data", error);
        return null;
    }
}

export async function editCourtById(courtId: number, court: NewCourt) {
    try {
        const response: AxiosResponse<NewCourt> = await appAPI.put(
            `/api/court/${courtId}/edit`,
            court,
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            return response.data;
        } else {
            console.error("Failed to fetch courts data");
            return null;
        }
    } catch (error) {
        console.error("Error fetching courts data", error);
        return null;
    }
}