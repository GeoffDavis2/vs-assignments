import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css';
import axios from 'axios';
import { Form } from './InputForm';

const App = () => {
  const [bounties, setBounties] = useState([]);

  useEffect(() => (async () => {
    const { data } = await axios.get(`/bounties`);
    setBounties(data);
  })(), []);

  const addBounty = async (bounty) => {
    const { data } = await axios.post(`/bounties`, bounty);
    setBounties(prev => [...prev, data]);
  }

  const updateBounty = async (bounty) => {
    let { _id, ...body } = bounty;
    const { data } = await axios.put(`/bounties/${_id}`, body);
    setBounties(prev => prev.map(obj => obj._id === data._id ? data : obj));
  }

  const deleteBounty = async (_id) => {
    const { data } = await axios.delete(`/bounties/${_id}`);
    setBounties(data);
  }

  return <>
    <Form mode="Add" bounty={{ FirstName: "", LastName: "", Living: true, BountyAmount: "", BountyType: "" }} handleSubmit={addBounty} /><br />
    Filter by Affiliation <select name="affiliation" id="affiliation">
      <option value="Jedi">Jedi</option>
      <option value="Sith">Sith</option>
      <option value="Neutral">Neutral</option>
    </select>
    <hr />
    {bounties.map((bounty) => <Form mode="Display" bounty={bounty} handleSubmit={updateBounty} handleDeleteClick={deleteBounty} key={bounty._id} />)}
  </>

}

ReactDOM.render(<App />, document.getElementById('root-div'));