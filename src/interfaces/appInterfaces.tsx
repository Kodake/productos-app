export interface LoginData {
    correo:             string;
    password:           string;
}

export interface RegisterData {
    nombre:             string;
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

export interface ProductsResponse {
    total:              number;
    productos:          Producto[];
}

export interface Producto {
    _id:                string;
    estado:             boolean;
    precio:             number;
    nombre:             string;
    categoria:          Categoria;
    usuario:            Categoria;
    img?:               string;
}

export interface CategoriesResponse {
    total:              number;
    categorias:         Categoria[];
}

export interface Categoria {
    _id:                string;
    nombre:             string;
    usuario?:           CreadoPor;
}

export interface CreadoPor {
    _id:                string;
    nombre:             string;
}