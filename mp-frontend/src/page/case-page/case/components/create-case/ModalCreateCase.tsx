import type {RootState} from "../../../../../store/store.ts";
import Modal from "../../../../../_util/components/Modal/Modal.tsx";
import {useDispatch, useSelector} from "react-redux";
import {setCaseModal} from "../../../../../store/slice/caseInfo.slice.ts";
import {FormCreateCase} from "./FormCreateCase.tsx";


export const ModalCreateCase = () => {
    const index = useSelector((state: RootState) => state.caseInfoSlice.caseModal);
    const dispatch = useDispatch();

    return (
        <Modal open={index === 'create'} title={'Create case'} onClose={() => {
            dispatch(setCaseModal('none'))
        }}>
            <FormCreateCase/>
        </Modal>
    );
};