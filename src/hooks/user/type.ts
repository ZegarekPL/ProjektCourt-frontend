export enum Role {
    USER,
    ADMIN,
}

export interface NewUser {
    name: string | FormDataEntryValue | null;
    email: string | FormDataEntryValue | null;
    password: string | FormDataEntryValue | null;
}

export interface User extends NewUser {
    id: number;
    role: Role;
}