import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('userInfo')) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`;
  }
  return req;
});

export const register = (formData) => API.post('/api/users/register', formData);
export const login = (formData) => API.post('/api/users/login', formData);
export const createPost = (postData) => API.post('/api/posts', postData);
export const getPosts = () => API.get('/api/posts');
export const deletePost = (id) => API.delete(`/api/posts/${id}`);
export const updatePost = (id, postData) => API.patch(`/api/posts/${id}`, postData);
export const likePost = (id) => API.patch(`/api/posts/${id}/likePost`);
