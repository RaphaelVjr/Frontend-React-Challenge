import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-toastify/dist/ReactToastify.css';
import padlockImage from '../../assets/padlock.png';
import userImage from '../../assets/user.png';
import emailIcon from '../../assets/email.png';
import passwordConfirmIcon from '../../assets/passwordConfirmation.png';
import './Sign.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      username,
      email,
      password,
      password_confirmation: passwordConfirmation,
    };

    try {
      const response = await fetch('http://127.0.0.1:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
      });

      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }

      toast.success('User registered successfully');
      window.location.href = '/';
    } catch (error) {
      toast.error('User already registered ');
    }
  };

  return (
    <div className='sign-section'>
      <ToastContainer />
      <div className='sign-container'>
        <div className='sign-header'>
          <span className='Sign-up'>Sign Up</span>
          <span className='underline'></span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='sign-inputs'>
            <div className='username'>
              <img src={userImage} alt="" />
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className='email-input'>
              <img src={emailIcon} alt="" />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className='password-input'>
              <img src={padlockImage} alt="" />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className='password-input'>
              <img src={passwordConfirmIcon} alt="" />
              <input type="password" placeholder="Password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />
            </div>
          </div>
          <div className='submit-container'>
            <button className="submit-sign" type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
