import { useState } from "react";
import { useNodeContext } from '../contexts/NodeContext';

export const LoginSignup = () => {
    const { loginSignup, errMsg } = useNodeContext();
    const [inputs, setInputs] = useState({ username: "", password: "" });
    const { username, password } = inputs;
    
    const handleChange = ({ target: { name, value } }) => setInputs({ ...inputs, [name]: value });

    return <div className="login-page">
        <header>
            <h1>Sign Up / Login</h1>
        </header>

        <input name="username" value={username} onChange={handleChange} placeholder="Username" className="input-field" />
        <input name="password" value={password} onChange={handleChange} placeholder="Password" className="input-field" />
        <button onClick={() => loginSignup('/auth/login', inputs)}>Login</button>
        <button onClick={() => loginSignup('/auth/signup', inputs)}>Signup</button>
        <h2 className="err-msg">{errMsg}</h2>
    </div>

};