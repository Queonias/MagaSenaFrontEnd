import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const requestGet = async (endpoint, params) => {

    try {
      const result = await api.get(endpoint, {
        params: { ...params }
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  };

export {
    requestGet,
  };