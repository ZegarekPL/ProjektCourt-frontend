
import { AxiosResponse } from "axios";
import {appAPI} from "@/utils/appAPI";
import {NewUser, Role, User} from "@/hooks/user/type";


export async function getAllUsers (){
    try {
        const response: AxiosResponse<User[]> = await appAPI.get(
            `/api/user`,
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 401) {
            console.error("Brak autoryzacji użytkownika");
            return "Brak autoryzacji użytkownika";
        } else {
            console.error("Wystąpił błąd podczas pobierania danych użytkownika");
            return "Wystąpił błąd podczas pobierania danych użytkownika";
        }
    } catch (error) {
         console.error("Wystąpił błąd podczas pobierania danych użytkownika", error);
         return "Wystąpił błąd podczas pobierania danych użytkownika";
    }
}

export async function registerNewUser(newUser: NewUser) {
    try {
        const response: AxiosResponse<void> = await appAPI.post(
            `/api/user/register`,
            newUser,
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            return response.status;
        } else if (response.status === 400) {
            console.error("Niepoprawne dane");
            return "Niepoprawne dane";
        } else if (response.status === 409) {
            console.error("Użytkownik o tym adresie email już istnieje");
            return "Użytkownik o tym adresie email już istnieje";
        } else {
            console.error("Wystąpił błąd podczas rejestracji użytkownika");
            return "Wystąpił błąd podczas rejestracji użytkownika";
        }
    } catch (error) {
        console.error("Wystąpił błąd podczas rejestracji użytkownika", error);
        return "Wystąpił błąd podczas rejestracji użytkownika, ";
    }
}

export async function getCurrentUser() {
    try {
        const response: AxiosResponse<User> = await appAPI.get(
            `/api/user/me`,
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 401) {
            console.error("Brak autoryzacji użytkownika");
            return "Brak autoryzacji użytkownika";
        } else {
            console.error("Wystąpił błąd podczas pobierania danych użytkownika");
            return "Wystąpił błąd podczas pobierania danych użytkownika";
        }
    } catch (error) {
        console.error("Wystąpił błąd podczas pobierania danych użytkownika", error);
        return "Wystąpił błąd podczas pobierania danych użytkownika";
    }
}

export async function changeUserRole(userId: number, role: Role) {
    try {
        const response: AxiosResponse<any> = await appAPI.put(
            `/api/user/${userId}/role`,
            {
                params: {
                    role: role,
                },
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 401) {
            console.error("Brak autoryzacji użytkownika");
            return "Brak autoryzacji użytkownika";
        } else {
            console.error("Wystąpił błąd podczas pobierania danych użytkownika");
            return "Wystąpił błąd podczas pobierania danych użytkownika";
        }
    } catch (error) {
        console.error("Wystąpił błąd podczas pobierania danych użytkownika", error);
        return "Wystąpił błąd podczas pobierania danych użytkownika";
    }
}