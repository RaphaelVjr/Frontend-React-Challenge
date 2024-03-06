import React, { useState } from 'react';
import './Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-toastify/dist/ReactToastify.css';
import padlockImage from '../../assets/padlock.png';
import userImage from '../../assets/user.png';
import TypeWriter from './../../Hooks/useTypingEffect';
import { Link } from 'react-router-dom';



function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFocus = (event) => {
        event.target.setAttribute('autocomplete', 'off');
        event.target.setAttribute('name', 'password' + Math.random());
    };

    const handleSubmit = async event => {
    event.preventDefault();

    const requestBody = { email, password };

    const response = await fetch('http://127.0.0.1:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(requestBody),
    });

    if (response.ok) {
        const data = await response.json();

        sessionStorage.setItem('user', JSON.stringify(data));

        if (email === 'admin@rotten' && password === 'admin') {
            sessionStorage.setItem('role', 'admin');
            toast.success('Logged in as admin');
            setTimeout(() => {
                window.location.href = '/movies';
            }, 2000);
        } else {
            toast.success('Login successful');
            setTimeout(() => {
                window.location.href = '/movie-card';
            }, 2000);
        }
    } else {
        toast.error('User not found or incorrect info');
    }   
};

    return (
        <div className='login-section'>
            <ToastContainer />
            <div className='login-container'>
                <span className='project-name'>Kendo Movies</span>
                <div className='login-header'>
                    <span className='login'>Login</span>
                    <span className='underline'></span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='login-inputs'>
                        <div className='email-input'>
                            <img src={padlockImage} alt="" />
                            <input id="login-email" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div className='password-input'>
                            <img src={userImage} alt="" />
                            <input id="login-password" type="password" placeholder="Password" value={password} onFocus={handleFocus} onChange={e => setPassword(e.target.value)} required />
                        </div>
                        <div className='login-sign'>
                            <button className="submit-login" type="submit">Login</button>
                            <Link to="/sign">
                                <button className='sign-button'>Sign Up</button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
            <div className='info-section'>
                <div className='info-container'>
                    <span className='info-text'>
                        <TypeWriter />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Login;
