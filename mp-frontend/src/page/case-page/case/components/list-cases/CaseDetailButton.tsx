import Button from "../../../../../_util/components/Button/Button.tsx";
import type {CaseInfo} from "../../../../../store/service/model/case.model.ts";
import {useDispatch} from "react-redux";
import {setCaseModal, setCurrentCase} from "../../../../../store/slice/caseInfo.slice.ts";

interface CaseDetailButtonProps {
    currentCase: CaseInfo
}

export const CaseDetailButton = ({currentCase}:CaseDetailButtonProps) => {
    const dispatch = useDispatch();

    const onClick = () =>{
        dispatch(setCaseModal('edit'));
        dispatch(setCurrentCase(currentCase));
    }

    return (
        <Button onClick={onClick}>
            Detalle
        </Button>
    );
};