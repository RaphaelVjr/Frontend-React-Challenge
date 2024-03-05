import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-toastify/dist/ReactToastify.css';
import padlockImage from '../../assets/padlock.png';
import userImage from '../../assets/user.png';
import emailIcon from '../../assets/email.png';
import passwordConfirmIcon from '../../assets/passwordConfirmation.png';
import './Sign.css';
import backgroundImage from '../../assets/moviesBg.jpg'
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [setPasswordsMatch] = useState(true);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [setIsValidPassword] = useState(true);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsValidPassword(newPassword.length >= 8 && /\d/.test(newPassword));
    if (passwordConfirmation.length > 0) {
      setPasswordsMatch(newPassword === passwordConfirmation);
    }
  };


  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value);
    if (password.length > 0) {
      setPasswordsMatch(password === e.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidEmail) {
      toast.error('Email must be like "name@example.com"');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    if (password !== passwordConfirmation) {
      toast.error('Passwords do not match');
      return;
    }

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
      setTimeout(() => {
        window.location.href = '/';
      }, 2000)
    } catch (error) {
      toast.error('User already registered ');
    }
  };

  return (
    <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh',
    }} className='sign-section'>
      <ToastContainer />
      <div className='sign-container'>
        <div className='sign-header'>
          <Link to="/" className='back-button'>
            Back
          </Link>
          <span className='sign-up'>Sign Up</span>
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
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value))}
                required />
            </div>
            <div className='password-input'>
              <img src={padlockImage} alt="" />
              <input id="sign" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
            </div>
            <div className='password-input'>
              <img src={passwordConfirmIcon} alt="" />
              <input id="password-confirmation" type="password" placeholder="Confirm Password" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} required />
            </div>
          </div>
          <div className='password-match'>
              {password && passwordConfirmation && password !== passwordConfirmation && <p>Passwords do not match</p>}
            </div>
            <div className='email-match'> {!isValidEmail &&
              <div className='email-match'>
                <p>Email must be like "name@example.com"</p>
              </div>
            }</div>
          <div className='submit-container'>
            <button className="submit-sign" type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
