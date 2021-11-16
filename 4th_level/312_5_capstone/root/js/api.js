import axios from "axios";

const endpoint = 'https://script.google.com/macros/s/AKfycbykU0fFJMzuP2_RweDQF69LaRUGRlHisOcnA-A-p-H8toXa9laCi8CTib0ql_t3aVd-/exec';

export const apiGetAll = (endpoint) => {
  return axios.get(endpoint, 23);
};

export const apiPost = (endpoint, thing) => {
  return axios.post(endpoint, thing);
};

export const apiDelete = (endpoint, id) => {
  return axios.delete(`${endpoint}/${id}`);
};

// export const apiPut = (endpoint, id, data) => {
//   return axios.put(`${endpoint}/${id}`, data);
// };

export const apiPut = (endpoint, data) => {
  return axios.put(`${endpoint}`, data);
};


//https://spreadsheet.dev/reading-from-writing-to-range-in-google-sheets-using-apps-script

export const getDay = async (id) => {
  // console.log(`Inside getDay, id: ${id}`);
  const { status, data } = await apiGetAll(endpoint);
  if (status === 200) {
    console.log(data);
    // console.log(tempdata);
    var x = { Day: 999, Date: "1600-01-01", Level: 0, TotProgPts: 10000 };
  }
  // console.log(x);
  return x;
}