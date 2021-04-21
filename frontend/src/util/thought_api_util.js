import axios from 'axios';

export const getThoughts = () => {
    return axios.get('/api/thoughts');
};

export const getUserThoughts = id => {
    return axios.get(`/api/thoughts/user/${id}`);
}

export const writeThought = data => {
    return axios.post('/api/thoughts/', data);
}