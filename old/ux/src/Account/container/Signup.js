import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { login } from '../user.actions';
 
function Signup(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = () => {
        history.push(``);
        dispatch(login(email, password));
    }

    const onEmailChange = (event) => {
        const email = event.target.value.trim();

        setEmail(email);
    }

    const onPasswordChange = (event) => {
        const password = event.target.value.trim();

        setPassword(password);
    }

    const onVerifyPasswordChange = (event) => {
        const password = event.target.value.trim();

        setVerifyPassword(password);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                email: <input type="text" value={email} onChange={onEmailChange} />        
            </label>

            <label>
                password: <input type="password" value={password} onChange={onPasswordChange} />        
            </label>

            <label>
                verify password: <input type="password" value={verifyPassword} onChange={onVerifyPasswordChange} />        
            </label>

            <input type="submit" value="Sign up" />
        </form>
    );
}

export default Signup;