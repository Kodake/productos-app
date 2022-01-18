import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import productsApi from '../api/productsApi';
import { LoginData, LoginResponse, RegisterData, Usuario } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: (registerData: RegisterData) => void;
    signIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, authInitialState);

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) return dispatch({ type: 'notAuthenticated' });

        const resp = await productsApi.get('/auth');
        if (resp.status !== 200) {
            return dispatch({ type: 'notAuthenticated' });
        }

        // Optional if you want to renew the token
        // await AsyncStorage.setItem('token', resp.data.token);

        dispatch({
            type: 'signUp',
            payload: {
                token: resp.data.token,
                user: resp.data.usuario
            }
        });
    }

    // const signIn = async ({ correo, password }: LoginData) => {
    //     try {
    //         const { data } = await productsApi.post<LoginResponse>('/auth/login', { correo, password });
    //         dispatch({
    //             type: 'signUp',
    //             payload: {
    //                 token: data.token,
    //                 user: data.usuario
    //             }
    //         });

    //         await AsyncStorage.setItem('token', data.token);
    //     } catch (error: any) {
    //         dispatch({
    //             type: 'addError',
    //             payload: error.response.data.msg || 'Información incorrecta'
    //         });
    //     }
    // };

    const signIn = async ({ correo, password }: LoginData) => {
        try {
            productsApi.post<LoginResponse>('/auth/login', { correo, password }).then(async (data: any) => {
                dispatch({
                    type: 'signUp',
                    payload: {
                        token: data.token,
                        user: data.usuario
                    }
                });
                await AsyncStorage.setItem('token', data.token);
            }).catch((err: any) => { console.log(err) });
        } catch (error: any) {
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'Información incorrecta'
            })
        }
    };

    const signUp = async ({ nombre, correo, password }: RegisterData) => {
        try {
            const { data } = await productsApi.post<LoginResponse>('/usuarios', { nombre, correo, password });
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            });
            await AsyncStorage.setItem('token', data.token);
        } catch (error: any) {
            dispatch({
                type: 'addError',
                payload: error.response.data.errors[0].msg || 'Revise la información'
            });
        }
    };

    const logOut = async () => {
        // await AsyncStorage.removeItem('token');
        dispatch({ type: 'logOut' });
    };

    const removeError = () => {
        dispatch({ type: 'removeError' });
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError
        }}>
            {children}
        </AuthContext.Provider>
    )
}
