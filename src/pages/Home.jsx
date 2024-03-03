import React from 'react'
import Login from './../components/Login/Login';
import SignUp from '../components/Sign/SignUp';
import { format } from 'date-fns';

const Home = () => {
  return (
    <div className='authentication'>   
      <Login />
      <SignUp /></div>
  )
}

export default Home