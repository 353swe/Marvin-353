import React from 'react';
import PropTypes from 'prop-types';

class CardWithIcon extends React.Component {
  constructor(props) {
    super(props);
    this.title = this.props.title;
    this.text = this.props.text;
    this.links = this.props.links;
    this.image = this.props.image;
  }
  render() {
    let links = [];
    if (this.links !== null) {
      for (let i = 0; i < this.links.length; i += 1) {
        links.push(<a href={this.links[i].path} className="card-link">{this.links[i].label}</a>);
      }
    }
    const card = '/media/cards/'.concat(this.image);
    let fastLink = '#';
    if (this.links.length === 1) {
      fastLink = this.links[0].path;
      links = '';
    }
    return (
      <a href={fastLink} >
        <div className="card">
          <img className="card-img-top" src={card} alt="Card with icon" />
          <div className="card-body">
            <h5 className="card-title">{this.title}</h5>
            <p className="card-text">{this.text} </p>
          </div>
          <div className="card-body">
            {links}
          </div>
        </div>
      </a>
    );
  }
}

CardWithIcon.defaultProps = {
  links: [],
  image: 'default.png',
};

CardWithIcon.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  // eslint-disable-next-line
  links: PropTypes.array,
  image: PropTypes.string,
};

export default (CardWithIcon);
