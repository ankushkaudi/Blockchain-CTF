import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <div className="navbar-brand">Blockchain CTF</div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link to="/dashboard" className="navbar-item">Home</Link>
            <Link to="/scoreboard" className="navbar-item">Scoreboard</Link>
            <Link to="/challenges" className="navbar-item">Challenges</Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
