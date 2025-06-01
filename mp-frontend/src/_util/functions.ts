import {keyStorage} from "./enums.ts";
import type {RootState} from "../store/store.ts";

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