import axios from 'axios';


const api = axios.create({
  baseURL: `https://api-mega-sena-i382bbq0b-queonias.vercel.app`,
  // baseURL: `http://localhost:3001`,
});


const requestGet = async (endpoint, params, id) => {
  if (id) {
    endpoint += `/${id}`;
  }
 
  const result = await api.get(endpoint, {
    params: { ...params },
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