import React from 'react';
import PropTypes from 'prop-types';
import NavbarCustom from './custom/NavbarCustom';
import Footer from './custom/Footer';

class PageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.children = props.children;
    this.links = props.route.links;
    this.loggedIn = props.route.loggedIn;
  }
  render() {
    return (
      <div>
        <NavbarCustom links={this.links} loggedIn={this.loggedIn} />
        <div className="container">
          {this.children}
        </div>
        <Footer />
      </div>
    );
  }
}

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  route: PropTypes.object.isRequired, // eslint-disable-line
};
export default (PageContainer);
