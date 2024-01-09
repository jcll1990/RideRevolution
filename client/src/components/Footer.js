import React from 'react';

const Footer = () => {
  return (
    <footer id="footer">
 
        <div id="footer-title">
          &copy; 2024 Ride Revolution
        </div>

        <div id="footer-address">
          123 Street Avenue, New York, NY 10001
        </div>

        <div id="footer-text">
          Follow us on social media:
        </div>

        <div id="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="icons/facebook.png" alt="Facebook Icon" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="icons/twitter.png" alt="Twitter Icon" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="icons/instagram.png" alt="Instagram Icon" />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <img src="icons/youtube.png" alt="YouTube Icon" />
          </a>
        </div>

    </footer>
  );
};

export default Footer;
