import axios from "axios";
import dayjs from 'dayjs';

const endpoint = 'https://script.google.com/macros/s/AKfycbyORHVV2qx2V1zVoXNWtYGgeW_OZANf_KBoqg2Uz2kDPa62Lq9c6BqIpjAdMMhdlGDj/exec';

// Omit id to get all data from the API
export const apiGet = (id) => {
  return axios.get(`${endpoint}?Day=${id}`);
};

export const apiPut = (obj) => {
  return axios.post(endpoint, obj);
};

// Post not setup yet
// export const apiPost = (obj) => {
//   return axios.post(endpoint, obj);
// };

// Delete not setup yet
// export const apiDelete = (endpoint, id) => {
//   return axios.delete(`${endpoint}/${id}`);
// };


export const getALLDays = async () => {
  const { status, data } = await apiGet();
  if (status === 200) {
    data.forEach(day => day.Date = dayjs(day.Date).format('YYYY-MM-DD'))
    return data;
  }
  console.log('status: ' + status);
  console.log(data);
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

// Only upload fields kept in API
export const putDay = async (day) => {
  const obj = JSON.stringify({
    action: 'put',
    Day: day.Day,
    Date: day.Date,
    Level: day.Level,
    TotProgPts: day.TotProgPts
  });
  const { status } = await apiPut(obj);
  if (status !== 200) {
  console.log(status);
  }
}