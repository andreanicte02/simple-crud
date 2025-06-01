import {logout} from "../../_util/functions.ts";
import {isRejectedWithValue, type Middleware, type MiddlewareAPI} from "@reduxjs/toolkit";

export const middleware401: Middleware = (_api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        const { payload, meta } = action;
        const status = (payload as { status?: number }).status;
        const endpoint = (meta as { arg?: { endpointName?: string } }).arg?.endpointName;
        const unprotectedEndpoints = ["auth"];

        const isLogout = status === 401 && !unprotectedEndpoints.includes(endpoint || '');

        if (isLogout) {
            logout();
        }
    }

    return next(action);
};