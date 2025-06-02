import type {AuthResponse} from "./auth.model.ts";

export const sessionInit: AuthResponse = {
    user: {
        id_usuario: 0,
        username: '',
        id_fiscal: 0,
        rol: '',
        id_fiscalia:0
    },
    token: ''
};