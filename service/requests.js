import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const requestGet = async (endpoint, params) => {
      const result = await api.get(endpoint, {
        params: { ...params }
      });
      return result;
  };

  const requestPost = async (endpoint, data) => {
    const response = await api.post(endpoint, data);
    return response;
  };

export {
    requestGet,
    requestPost,
  };