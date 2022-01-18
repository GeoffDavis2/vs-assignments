import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStateContext } from "../contexts/StateContext";

export const LoginSignup = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ username: "", password: "" });
    const { username, password } = inputs;

    const { state: { errMsg }, loginSignup } = useStateContext();

    const handleChange = ({ target: { name, value } }) => setInputs({ ...inputs, [name]: value });

    return <>
        <header>
            <h1>Sign Up / Login</h1>
        </header>

        <nav>
            <button onClick={() => navigate(`/issues-list`)}>Back To Issues List</button>
            <hr />
        </nav>

        <input name="username" value={username} onChange={handleChange} placeholder="Username" className="input-field" />
        <input name="password" value={password} onChange={handleChange} placeholder="Password" className="input-field" />
        <button onClick={() => loginSignup('/auth/signup', inputs)}>Signup</button>
        <button onClick={() => loginSignup('/auth/login', inputs)}>Login</button>
        <p>{errMsg}</p>
    </>

};