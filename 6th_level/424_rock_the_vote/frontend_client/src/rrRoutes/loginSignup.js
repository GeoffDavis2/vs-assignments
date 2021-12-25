import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useStateContext } from "../contexts/StateContext";


export const LoginSignup = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ username: "", password: "" });
    const { username, password } = inputs;

    const { state:{ errMsg }, signup, login, logout } = useStateContext();
    // const { signup, login, errMsg } = state;

    const handleChange = ({ target: { name, value } }) => setInputs({ ...inputs, [name]: value });

    // TODO If no other stuff done per click, move the one line of these functions directly to the onclick of the buttons and remove the functions below
    const handleSignup = (e) => {
        // e.preventDefault();
        signup(inputs);
    }

    const handleLogin = (e) => {
        // e.preventDefault();
        login(inputs);
        // TODO if token then navigate to issuesList, or maybe handle this in the login function in StateContext
    }

    const handleLogout = (e) => {
        // e.preventDefault();
        logout();
    }

    return <>
        <nav>
            <h1>Login / Signup Route</h1>
        </nav>
        <input name="username" value={username} onChange={handleChange} placeholder="Username" className="input-field" />
        <input name="password" value={password} onChange={handleChange} placeholder="Password" className="input-field" />
        <button onClick={() => navigate(`/issues-list`)}>To Issues List</button>
        <button onClick={handleSignup}>Signup</button>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout}>Logout</button>
        <p>{errMsg}</p>
    </>

};