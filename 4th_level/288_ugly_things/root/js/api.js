import axios from "axios";

// TODO remove all references to todo (except for my comments)

// ... if I want to get Fancy with protecting my session key, just gitignore the process.env file
// const endpoint = `https://jsonbox.io/box_${process.env.JSONBOX_KEY}`;
const endpoint = 'https://api.vschool.io/geoffdavis/thing';

export const getAll = () => {
  return axios.get(endpoint);
};

export const addThing = todo => {
  return axios.post(endpoint, todo);
};

export const delThing = id => {
  return axios.delete(`${endpoint}/${id}`);
};

// export default {
//   todos: {
//     getAll,
//     create,
//     destroy
//   }
// };