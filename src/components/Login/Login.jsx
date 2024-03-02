import React, { useState } from 'react';
import './Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-toastify/dist/ReactToastify.css';
import padlockImage from '../../assets/padlock.png';
import userImage from '../../assets/user.png';
import TypeWriter from './../../Hooks/TypingEffect';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();

        const response = await fetch('http://127.0.0.1:3000/login', {
            method: 'POST',
            headers: {
                'Accept-Language': 'pt-BR',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            toast.success('Login successful');
            window.location.href = '/movies';
        } else {
            toast.error(`User not found or incorrect info`);
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
                            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div className='password-input'>
                            <img src={userImage} alt="" />
                            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                        </div>
                        <div className='submit-container'>
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