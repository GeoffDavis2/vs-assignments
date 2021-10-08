const axios = require("axios");




// using Axios
axios.get('https://swapi.dev/api/people/1').then(response => console.log(response.data))
