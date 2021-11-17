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

export const putDay = async (day) => {
  const obj = JSON.stringify({ action: 'put', ...day });
  const { status } = await apiPut(obj);
  if (status !== 200) {
    console.log(status);
  }
}

// ToDo Add useEffect to "listen" for changes to API and...
//    ToDo Update the setAllDays array, but just the changed object???
//    ToDo Re-render progress table whenever setAllDays array changes

// ToDo Figure out (proper) way around CORS issue without diabling in Chrome or using the VSchool thing


