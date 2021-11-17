import axios from "axios";
import dayjs from 'dayjs';

const endpoint = 'https://script.google.com/macros/s/AKfycbz6M1jC6V3R7r3zKCb8lfzL-rHG3xWiFBeHkVNqYcNaEjYcSQNwZzULej0nH285zrfj/exec';

export const apiGetAll = () => {
  return axios.get(endpoint);
};

export const apiGet = (id) => {
  return axios.get(`${endpoint}?day=${id}`);
};

export const apiPost = (obj) => {
  return axios.post(endpoint, obj);
};

// export const apiDelete = (endpoint, id) => {
//   return axios.delete(`${endpoint}/${id}`);
// };

// export const apiPut = (endpoint, id, data) => {
//   return axios.put(`${endpoint}/${id}`, data);
// };

// export const apiPut = (endpoint, data) => {
//   return axios.put(`${endpoint}`, data);
// };

export const getALLDays = async () => {
  const { status, data } = await apiGetAll();
  if (status === 200) {
    data.forEach(day => day.Date = dayjs(day.Date).format('YYYY-MM-DD'))
    console.log(status);
    return data;
  }
  return [];
}


export const getDay = async (id) => {
  const { status, data } = await apiGet(id);
  if (status === 200) {
    data.Date = dayjs(data.Date).format('YYYY-MM-DD');
    return data;
  }
  return {};
}

// TODO figure out why status isn't being destructured here
export const putDay = async (day) => {
  const obj = JSON.stringify({action: 'put', ...day});
  console.log(obj);
  const { status } = apiPost(obj);
  // if (status === 200) {
    console.log(status);
  // }
}