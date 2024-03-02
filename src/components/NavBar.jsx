import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav id='navBar'>
      <h2>
        <Link to="/home"> Kendo Movies </Link>
      </h2>
      <form >
        <input type="text" placeholder='Search a movie' />
        <button type='submit'></button>
      </form>
    </nav>
  )
}

export default NavBar;