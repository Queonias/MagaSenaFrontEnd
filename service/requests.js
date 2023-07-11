import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-mega-sena-b69nhqxbv-queonias.vercel.app',
});

const requestGet = async (endpoint, params) => {
      const result = await api.get(endpoint, {
        params: { ...params }
      });
      return result;
  };

  const requestPost = async (endpoint, data, token) => {
    const response = await api.post(endpoint, data, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  };
  

export {
    requestGet,
    requestPost,
  };