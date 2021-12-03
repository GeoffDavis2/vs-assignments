import { useState } from 'react';

export const Form = (props) => {
    const [inputs, setInputs] = useState(props.bounty);
    const { _id, FirstName, LastName, Living, BountyAmount, Affiliation } = inputs;
    const [mode, setMode] = useState(props.mode);
  
    const handleChange = ({ target: { name, value } }) => setInputs({ ...inputs, [name]: value });
  
    const handleAddSubmitClick = (e) => {
      e.preventDefault();
      props.handleSubmit(inputs);
      setInputs(props.bounty);
    }
  
    const handleEditSubmitClick = (e) => {
      e.preventDefault();
      props.handleSubmit(inputs);
      setMode("Display");
    }
    
    const handleCancelClick = (e) => {
      e.preventDefault();
      setMode("Display");
      setInputs(props.bounty);
    }
  
    return <form>
      <label className="input-label">First Name</label>{["Add","Edit"].includes(mode)
        ? <input name="FirstName" value={FirstName} onChange={handleChange} placeholder="First Name" className="input-field" />
        : <div className="input-field">{FirstName}</div>}
  
      <label className="input-label">Last Name</label>{["Add","Edit"].includes(mode)
        ? <input name="LastName" value={LastName} onChange={handleChange} placeholder="Last Name" className="input-field" />
        : <div className="input-field">{LastName}</div>}
  
      <label className="input-label">Living</label>{["Add","Edit"].includes(mode)
        ? <input type="checkbox" checked={Living} onChange={() => setInputs({ ...inputs, Living: !Living })} />
        : <input disabled type="checkbox" checked={Living} />}
  
      <label className="input-label">Bounty</label>{["Add","Edit"].includes(mode)
        ? <input type="number" name="BountyAmount" value={BountyAmount} onChange={handleChange} placeholder="Bounty" className="input-field" />
        : <div className="input-field">{BountyAmount}</div>}
    
    <label className="input-label">Affiliation</label>{["Add","Edit"].includes(mode)
        ? <input name="Affiliation" value={Affiliation} onChange={handleChange} placeholder="Affiliation" className="input-field" />
        : <div className="input-field">{Affiliation}</div>}
  
      {mode === "Add" && <button onClick={handleAddSubmitClick}>Submit</button>}
      {mode === "Add" && <button type="button" onClick={() => setInputs(props.bounty)}>Cancel</button>}
  
      {mode === "Display" && <button onClick={() => setMode("Edit")}>Edit</button>}
      {mode === "Display" && <button type="button" onClick={() => props.handleDeleteClick(_id)}>Delete</button>}
  
      {mode === "Edit" && <button onClick={handleEditSubmitClick}>Submit</button>}
      {mode === "Edit" && <button onClick={handleCancelClick}>Cancel</button>}
    </form>
  };