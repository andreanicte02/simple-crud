import {SuccessMessageProvider} from "../../_util/context/SuccessMessageContext.tsx";
import {Case} from "./case/Case.tsx";

export const CasePage = () => {
    return (
        <SuccessMessageProvider>
            <Case/>
        </SuccessMessageProvider>
    );
};