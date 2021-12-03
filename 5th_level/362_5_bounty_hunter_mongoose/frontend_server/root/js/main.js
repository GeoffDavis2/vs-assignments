import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css';
import axios from 'axios';
import { Form } from './InputForm';

const App = () => {
  const [bounties, setBounties] = useState([]);

  useEffect(() => (async () => {
    try {
      const { data } = await axios.get(`/bounties`);
      setBounties(data);
    }
    catch (err) {
      console.log(err);
      alert(err);
    }
  })(), []);

  const addBounty = async (bounty) => {
    try {
      const { data } = await axios.post(`/bounties`, bounty);
      setBounties(prev => [...prev, data]);
    }
    catch (err) {
      console.log(err);
      alert(err);
    }
  }

  // TODO Fix but that allows bad affilliation, doesn't catch the enum I set
  // see https://github.com/Automattic/mongoose/issues/1974
  const updateBounty = async (bounty) => {
    try {
      let { _id, ...body } = bounty;
      const { data } = await axios.put(`/bounties/id/${_id}`, body);
      setBounties(prev => prev.map(obj => obj._id === data._id ? data : obj));
    }
    catch (err) {
      console.log(err);
      alert(err);
    }
  }

  const deleteBounty = async (_id) => {
    try {
      const { data } = await axios.delete(`/bounties/id/${_id}`);
      setBounties(data);
    }
    catch (err) {
      console.log(err);
      alert(err);
    }
  }

  const handleFilter = async (e) => {
    try {
      const { data } = await (e.target.value !== "All"
        ? axios.get(`/bounties/search?Affiliation=${e.target.value}`)
        : axios.get(`/bounties`))
      setBounties(data)
    }
    catch (err) {
      console.log(err);
      alert(err);
    }
  }

  return <>
    <Form mode="Add" bounty={{ FirstName: "", LastName: "", Living: true, BountyAmount: "", Affiliation: "" }} handleSubmit={addBounty} /><br />
    Filter by Affiliation <select onChange={handleFilter}>
      <option value="All">- No Filter -</option>
      <option value="Jedi">Jedi</option>
      <option value="Sith">Sith</option>
      <option value="Neutral">Neutral</option>
    </select>
    <hr />
    {bounties.map((bounty) => <Form mode="Display" bounty={bounty} handleSubmit={updateBounty} handleDeleteClick={deleteBounty} key={bounty._id} />)}
  </>

}

ReactDOM.render(<App />, document.getElementById('root-div'));