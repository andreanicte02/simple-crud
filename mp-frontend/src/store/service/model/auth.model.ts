export interface AuthRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id_usuario: number;
        username: string;
        id_fiscal: number;
        rol: string;
    };
}