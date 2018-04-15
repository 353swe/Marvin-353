import React from 'react';

const Footer = () => (
  <div className="footer page-footer font-small blue pt-4 mt-4">
    <div className="container-fluid text-center text-md-left">
      {/*
      <div className="row">
        <div className="col-md-6">
          <h5 className="text-uppercase">MARVIN</h5>
          <p>Bla bla bla</p>
        </div>
        <div className="col-md-6">
          <h5 className="text-uppercase">Links</h5>
          <ul className="list-unstyled">
            <li>
              <a href="/license">MIT License</a>
            </li>
          </ul>
        </div>
      </div>
      */}
      <div className="footer-copyright py-3 text-center">
        &copy; 2018 Marvin - <a href="/license">MIT License</a> - Made with ❤ by 353
      </div>
    </div>
  </div>
);

export default (Footer);
