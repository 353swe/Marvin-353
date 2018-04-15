import React from 'react';
import { Image } from 'react-bootstrap';

const Help = () => {
  document.title = 'Help - Marvin';

  return (
    <div className="page-help">
      <h1>Help</h1>
      <p>
        In this page you can find the F.A.Q. for Marvin.
        If you need more help, write to <strong>353swe@gmail.com</strong>.
      </p>
      <h2>F.A.Q.</h2>
      <ul>
        <li><a href="#faq1">What it is Marvin?</a></li>
        <li><a href="#faq2">What software do I need to use Marvin?</a></li>
        <li><a href="#faq3">How do I install MetaMask?</a></li>
        <li><a href="#faq4">How do I unlock MetaMask?</a></li>
        <li><a href="#faq5">How can I logout from Marvin?</a></li>
        <li><a href="#faq6">How can I lock my MetaMask digital wallet?</a></li>
        <li><a href="#faq7">How do I restore my MetaMask digital wallet?</a></li>
      </ul>
      <h3><a href="/help#faq1" className="faq" name="faq1">What it is Marvin?</a></h3>
      Marvin is a ÐApp for universities, teachers and students.
      <h3><a href="/help#faq2" className="faq" name="faq2">What software do I need to use Marvin?</a></h3>
      You need:
      <ul>
        <li>A device with <a href="https://www.google.com/intl/en/chrome/">Chrome</a> or <a href="https://www.mozilla.org/en-US/firefox/new/">Firefox</a> browser installed;</li>
        <li>A MetaMask digital wallet</li>
      </ul>
      <strong>WARNING:</strong> If you use a mobile device, like a smartphone or a table,
      you need to use Mozilla Firefox.
      <h3><a href="/help#faq3" className="faq" name="faq3">How do I install MetaMask?</a></h3>
      <ul>
        <li>If you use Chrome, go <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">here</a> and click &quot;Add to Chrome&quot;. Or, if you use Firefox go <a href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/">here</a> and click &quot;Add to Firefox&quot;<br />
          <Image alt="" src="/media/help/MetamaskAddToFirefox1.jpg" rounded responsive />
        </li>
        <li>Click &quot;Add Extension&quot; on the pop-up<br />
          <Image alt="" src="/media/help/MetamaskAddToFirefox2.jpg" rounded responsive />
        </li>
        <li>Accept the Privacy Policy and agree to the TOS</li>
        <li>Set up your MetaMask account clicked on the plug-in icon</li>
        <li>Set up a new password, it will be required to unlock the account<br />
          <Image alt="" src="/media/help/MetamaskAddToFirefox3.jpg" rounded responsive />
        </li>
        <li>
          Copy the 12 seed words and file them away somewhere safe
          (this helps to secure and restore your account)<br />
          <Image alt="" src="/media/help/MetamaskAddToFirefox4.jpg" rounded responsive />
        </li>
      </ul>
      <p>
        <strong>NOTE:</strong> for security purposes, MetaMask browser extensions
        will periodically request that you log back in to your account.
      </p>
      <h3><a href="/help#faq4" className="faq" name="faq4">How do I unlock MetaMask?</a></h3>
      <p>
        Click on the MetaMask plug-in icon and inset the password.
        Then, press &#39;Unlock&#39;.<br />
        <Image alt="" src="/media/help/MetamaskAddToFirefoxUnlock.jpg" rounded responsive />
      </p>
      <h3><a href="/help#faq5" className="faq" name="faq5">How can I logout from Marvin?</a></h3>
      <p>To logout from Marvin, you have to logout from MetaMask:
        <ul>
          <li>Click on MetaMask plug-in icon</li>
          <li>Click on the menu button in the top right corner</li>
          <li>Click &#39;Log Out&#39;</li>
        </ul>
        <Image alt="" src="/media/help/MetamaskAddToFirefoxLock.jpg" rounded responsive />
      </p>
      <h3><a href="/help#faq6" className="faq" name="faq6">How can I lock my MetaMask digital wallet?</a></h3>
      <p>
        For security reasons, it is raccomanded to lock MetaMask before leaving the computer.
        To do this, perform the following steps:
        <ul>
          <li>Click the MetaMask browser extension icon</li>
          <li>Click on the menu a the top right</li>
          <li>Click &quot;Log out&quot;</li>
        </ul>
      </p>
      <h3><a href="/help#faq7" className="faq" name="faq7">How do I restore my MetaMask digital wallet?</a></h3>
      <p>
        To move you account on a new PC or browser or in case you have lost your password,
        you can follow the following steps:
        <ul>
          <li>Click the MetaMask browser extension icon and then click
            &quot;Restore from seed phrase&quot;
          </li>
          <li>Copy and paste the 12 seed words in the box and then set a new password</li>
          <li>Click &quot;OK&quot;</li>
        </ul>
      </p>
    </div>
  );
};

export default Help;
