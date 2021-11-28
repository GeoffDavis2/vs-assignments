import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css';
import axios from 'axios';


// TODO install todo extension
// TODO Extend out other 3 fields
// TODO Fix Living to radial
// TODO Add Post: add api, add returned bounty to state array (push in setState???)
// TODO Make Add New Button Bigger, Centered, and sticky to top
// TODO Change colors to match starwars colors
// TODO Make it so each row has different color than background color
// TODO Make it so Edit row has different color from other rows
// TODO Make Delete button RED, rest should be Grey
// TODO Try and make font same between viewing and input (edit mode)
const Form = (props) => {
  const [inputs, setInputs] = useState(props.bounty);
  const { _id, FirstName, LastName, Living, BountyAmount } = inputs;
  const [isEditMode, setIsEditMode] = useState(false);

  const handleChange = ({ target: { name, value } }) => setInputs({ ...inputs, [name]: value });

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (isEditMode) {
      props.handleSubmit(inputs);
    }
    setIsEditMode(prev => !prev);
  }

  return <form>
    <label className="input-label">First Name</label>{isEditMode ? <input name="FirstName" value={FirstName} onChange={handleChange} placeholder="First Name" className="input-field" /> : <div className="input-field">{FirstName}</div>}
    <label className="input-label">Last Name</label>{isEditMode ? <input className="input-field" /> : <div className="input-field">{LastName}</div>}
    <label className="input-label">Living</label>{isEditMode ? <input className="input-field" /> : <div className="input-field">{Living.toString()}</div>}
    <label className="input-label">Bounty</label>{isEditMode ? <input type="number" className="input-field" /> : <div className="input-field">{BountyAmount}</div>}
    <button onClick={handleSubmitClick}>{isEditMode ? 'Submit' : 'Edit'}</button>
    {isEditMode && <button type="button" onClick={() => setIsEditMode(false)}>Cancel</button>}
    {isEditMode || <button type="button" onClick={() => props.handleDeleteClick(_id)}>Delete</button>}
  </form>
};

const App = () => {
  const [bounties, setBounties] = useState([]);

  useEffect(() => (async () => {
    const { data } = await axios.get(`/bounties`);
    setBounties(data);
  })(), []);

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
    <button>Add New</button>
    {bounties.map((bounty) => <Form bounty={bounty} handleSubmit={updateBounty} handleDeleteClick={deleteBounty} key={bounty._id} />)}
  </>

}

ReactDOM.render(<App />, document.getElementById('root-div'));