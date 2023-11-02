import { $authHost, $host } from "."
import {jwtDecode} from "jwt-decode"


export const registration = async (email, password) => {
    const {data} = await $host.post('/user/register', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const checkAuth = async () => {
    const {data} = await $authHost.get('/user/checkauth')
    if (data.message === 'Не авторизован') {
        console.log(data.message);
        return false
        
    } else {
        console.log('Всё норм');
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    }
}