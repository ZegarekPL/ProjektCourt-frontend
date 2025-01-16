export enum Role {
    USER,
    ADMIN,
}

export interface NewUser {
    name: string | FormDataEntryValue | null;
    email: string | FormDataEntryValue | null;
    password: string | FormDataEntryValue | null;
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
}