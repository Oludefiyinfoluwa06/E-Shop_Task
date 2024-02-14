import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const user = localStorage.getItem('user');

    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [navigate, user]);

    const handleLogin = async e => {
        e.preventDefault();

        setIsLoading(true);

        if (username === '' || password === '') {
            setIsLoading(false);
            setError('Input fields cannot be empty');
            return;
        }

        await axios.post('https://dummyjson.com/auth/login', {
            username,
            password,
        })
            .then(res => {
                setIsLoading(false);
                localStorage.setItem('user', JSON.stringify(res.data));
                navigate('/home');
            })
            .catch(err => {
                setIsLoading(false);
                setError(err.response.data.message);
            });
    }

    return (
        <form className='login' onSubmit={handleLogin}>
            <h3>Login</h3>
            <p className='error'>{error}</p>
            <div className="input-box">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name='username'
                    id='username'
                    value={username}
                    onChange={e => {
                        setUsername(e.target.value);
                        setIsLoading(false);
                        setError('');
                    }}
                />
            </div>
            <div className="input-box">
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name='password' 
                    id='password'
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                        setIsLoading(false);
                        setError('');
                    }}
                />
            </div>
            <button type='submit'>{ isLoading ? 'Loading' : 'Login' }</button>
        </form>
    );
}

export default Login;