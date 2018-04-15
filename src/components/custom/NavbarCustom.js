import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class NavbarCustom extends React.Component {
  constructor(props) {
    super(props);
    this.loggedIn = props.loggedIn;
    this.links = props.links;
  }

  render() {
    const linksLeft = [];
    for (let i = 0; i < this.links.length; i += 1) {
      if (this.links[i].position === 'left') {
        linksLeft.push( // eslint-disable-line
          <NavItem
            key={this.links[i].path}
            href={this.links[i].path}
          >
            {this.links[i].label}
          </NavItem>);
      }
    }

    const linksRight = [];
    for (let i = 0; i < this.links.length; i += 1) {
      if (this.links[i].position === 'right') {
        linksRight.push( // eslint-disable-line
          <NavItem
            key={this.links[i].path}
            href={this.links[i].path}
          >
            {this.links[i].label}
          </NavItem>);
      }
    }

    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Marvin</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {linksLeft}
          </Nav>
          <Nav pullRight>
            {linksRight}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavbarCustom.defaultProps = {
  loggedIn: false,
  links: [],
};

NavbarCustom.propTypes = {
  loggedIn: PropTypes.bool,
  // eslint-disable-next-line
  links: PropTypes.array,
};

export default (NavbarCustom);
