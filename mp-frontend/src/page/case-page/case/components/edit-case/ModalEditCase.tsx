import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../../../store/store.ts";
import Modal from "../../../../../_util/components/Modal/Modal.tsx";
import {setCaseModal} from "../../../../../store/slice/caseInfo.slice.ts";
import {FormEditCase} from "./FormEditCase.tsx";

export const ModalEditCase = () => {
    const index = useSelector((state: RootState) => state.caseInfoSlice.caseModal);
    const dispatch = useDispatch();

    return (
        <Modal open={index === 'edit'} title={'Create case'} onClose={() => {
            dispatch(setCaseModal('none'))
        }}>
            <FormEditCase/>
        </Modal>
    );
};