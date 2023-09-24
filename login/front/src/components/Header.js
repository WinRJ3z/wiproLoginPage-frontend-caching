import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { deleteDB } from 'idb';
import '../App.css'
const logoutButtonStyle = {
  backgroundColor: 'blue',
  color: 'white',
  fontSize: '16px',
  padding: '5px 10px',
  borderRadius: '5px',
  textDecoration: 'none',
  cursor: 'pointer',
  border: 'none', // Remove the default button border
  outline: 'none', // Remove outline on focus
};

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await logoutUser();
    await deleteIndexedDB();
  };

  const deleteIndexedDB = async () => {
    await deleteDB('Alpine');
    await deleteDB('Business');// Replace 'Alpine' with your actual database name
    console.log('IndexedDB deleted');
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <span> | </span>
      {user ? (
        <button onClick={handleLogout} style={logoutButtonStyle}>
          Logout
        </button>
      ) : (
        <Link to="/login">Login</Link>
      )}

      {user && <p>Hello {user.username}</p>}
    </div>
  );
};

export default Header;
