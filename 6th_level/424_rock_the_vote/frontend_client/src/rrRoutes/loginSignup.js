import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useStateContext, reducer } from "../StateContext";


export const LoginSignup = () => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({ username: "", password: "" });
    const { username, password } = inputs;

    // TODO If statue isn't needed by itself, combine the 2 lines below by desctructuring
    const state = useStateContext();
    const { signup, login, logout, token } = state;
    // console.log(state);

    const handleChange = ({ target: { name, value } }) => setInputs({ ...inputs, [name]: value });

    const handleSignup = (e) => {
        // e.preventDefault();
        signup(inputs);
    }

    const handleLogin = (e) => {
        // e.preventDefault();
        login(inputs);
    }

    const handleLogout = (e) => {
        // e.preventDefault();
        logout();
    }

    token && navigate(`/issues-list`);

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
    </>

};