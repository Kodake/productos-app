export interface LoginData {
    correo:             string;
    password:           string;
}

export interface LoginResponse {
    usuario:            Usuario;
    token:              string;
}

export interface Usuario {
    rol:                string;
    estado:             boolean;
    google:             boolean;
    nombre:             string;
    email:              string;
    uid:                string;
    img?:               string;
}