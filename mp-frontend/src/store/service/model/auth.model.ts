export interface AuthRequest {
    username: string;
    password_hash: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id_usuario: number;
        username: string;
        id_fiscal: number;
        rol: string;
        id_fiscalia: number;
    };
}