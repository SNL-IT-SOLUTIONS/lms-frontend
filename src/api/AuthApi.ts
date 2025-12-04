import axios from '@/api/index';

export const login = async (email: string, password: string) => {
    const response = await axios.post('/login', { email, password })
    return response.data
}

export const logout = async () => {
    const response = await axios.post('/logout')
    return response.data
}

//HOW TO USE !
// 1. import { login, logout } from "./AuthApi";
// 2. const res = await login(username, password);
