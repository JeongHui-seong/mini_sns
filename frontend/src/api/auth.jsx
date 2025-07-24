import axios from 'axios';

export const login = (email, password) => {
    return axios.post("/api/auth/login", { email, password }, { withCredentials : true });
};

export const getMe = () => axios.get('/api/auth/me', {withCredentials: true})