import type {CaseInfo} from "../service/model/case.model.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export const initCaseInfo = {
    id_caso: 0,
    titulo: "",
    descripcion: "",
    fecha_creacion: "",
    id_estado: 0,
    nombre_estado: "",
    id_fiscal: 0,
    id_fiscalia: 0,
    nombre_fiscalia: "",
    nombre_fiscal: ""
};


interface CaseState {
    caseModal: 'edit'|'create'|'none';
    currentCase: CaseInfo | undefined;
}

const initialCaseState: CaseState = {
    caseModal: 'none',
    currentCase: initCaseInfo,
};

export const caseSlice = createSlice({
    name: "caseSlice",
    initialState: initialCaseState,
    reducers: {
        setCaseModal: (state, action: PayloadAction<'create'|'edit'|'none'>) => {
            state.caseModal = action.payload;
        },
        setCurrentCase: (state, action: PayloadAction<CaseInfo>) => {
            state.currentCase = action.payload;
        },
        cleanCaseSlice: (state) => {
            state.caseModal = initialCaseState.caseModal;
            state.currentCase = initialCaseState.currentCase;
        },
    },
});

export const { setCaseModal, setCurrentCase, cleanCaseSlice } = caseSlice.actions;

export default caseSlice.reducer;