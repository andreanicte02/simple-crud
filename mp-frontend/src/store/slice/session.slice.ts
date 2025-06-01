import type {AuthResponse} from "../service/model/auth.model.ts";
import {getSession} from "../../_util/functions.ts";
import {sessionInit} from "../service/model/_utils.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

const initialState: AuthResponse = {
    ...JSON.parse(getSession() || JSON.stringify(sessionInit)),
};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setSession: (state, action: PayloadAction<AuthResponse>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        }
    }
});

export const {
    setSession
} = sessionSlice.actions;

export default sessionSlice.reducer;