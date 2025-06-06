import type {RootState} from "../../store/store.ts";
import {useSelector} from "react-redux";

export const useGetSessionHook = () => {
    return useSelector((state: RootState) => state.sessionSlice.token);
};