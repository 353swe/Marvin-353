import React from 'react';
import { Image } from 'react-bootstrap';

const Logout = () => {
  document.title = 'Logout - Marvin';

  return (
    <div className="page-logout">
      <h1 className="title">Logout</h1>
      <p>To logout from Marvin, you have to logout from MetaMask:
        <ul>
          <li>Click on MetaMask plug-in icon;</li>
          <li>Click on the menu button in the top right corner;</li>
          <li>Click &#39;Log Out&#39;.</li>
        </ul>
        More informations <a href="/help#faq5">here</a>.
        <Image alt="" src="/media/help/MetamaskAddToFirefoxLock.jpg" rounded responsive />
      </p>
    </div>
  );
};

export default (Logout);
