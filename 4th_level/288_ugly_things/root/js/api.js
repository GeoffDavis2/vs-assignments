import axios from "axios";

// TODO remove all references to todo (except for my comments)

// ... if I want to get Fancy with protecting my session key, just gitignore the process.env file
// const endpoint = `https://jsonbox.io/box_${process.env.JSONBOX_KEY}`;
const endpoint = 'https://api.vschool.io/geoffdavis/thing';

export const getAll = () => {
  return axios.get(endpoint);
};

// const create = todo => {
//   return axios.post(endpoint + "/todos", todo);
// };

// const destroy = id => {
//   return axios.delete(endpoint + `/todos/${id}`);
// };

// export default {
//   todos: {
//     getAll,
//     create,
//     destroy
//   }
// };