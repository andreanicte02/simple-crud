import {keyStorage} from "./enums.ts";
import type {RootState} from "../store/store.ts";
import type {SerializedError} from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const getSession = ()=>{
    const data = localStorage.getItem(keyStorage);
    if (data === null) return undefined;
    return data;
}

export const logout = () =>{
    localStorage.clear();
    document.location.reload();
}


export const getHeader = (headers: Headers, getState: () => unknown) => {
    const token = (getState() as RootState).sessionSlice.token;
    if (!token) return headers;
    headers.set("Authorization", `Bearer ${token}`);
    return headers;
};

export const getRTKError = (
    error: SerializedError | FetchBaseQueryError | undefined,
): string => {
    if (!error) {
        return "Error";
    }

    if ("data" in error && error.data && typeof error.data === "object" && "error" in error.data) {
        const data = error.data as { error?: string };
        if (typeof data.error === "string") {
            return data.error;
        }
    }

    if ("error" in error && typeof error.error === "string") {
        return error.error;
    }

    return "Error";
};