import { useState } from 'react';
import logo from '../Images/rgukt.jpeg';
import image from '../Images/logo.jpeg'; 
import '../styles/Header.css'

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleButtonClick = (message) => {
    alert(message);
  };
 
  return (
    <header className="header">
      {/* Logo on the left side */}
      <div className="header-logo-left">
        <img src={logo} alt="Left Logo" />
      </div>

      {/* Centered "FRS" text */}
      <div className="header-brand">Face Recognition system</div>

      {/* Dropdown-triggering logo on the right */}
      <div className="header-logo-right" onClick={toggleDropdown} aria-label="Company Logo">
        <img src={image} alt="Right Logo" />
      </div>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <button
            className="dropdown-button"
            onClick={() => handleButtonClick('My profile clicked!')}
          >
            My profile
          </button>
          <button
            className="dropdown-button"
            onClick={() => handleButtonClick('Help clicked!')}
          >
            Help ?
          </button>
          <button
            className="dropdown-button"
            onClick={() => handleButtonClick('Logout clicked!')}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
