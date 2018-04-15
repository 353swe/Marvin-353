import React from 'react';
import PropTypes from 'prop-types';

class CardWithIcon extends React.Component {
  constructor(props) {
    super(props);
    this.title = this.props.title;
    this.text = this.props.text;
    this.links = this.props.links;
    this.icon = this.props.icon;
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
    let icon = '';
    if (this.icon !== '') {
      let bicon = '';
      switch (this.icon) {
        case 'list':
          bicon = 'glyphicon glyphicon-th-list';
          break;
        case 'no':
          bicon = 'glyphicon glyphicon-remove-circle';
          break;
        case 'yes':
          bicon = 'glyphicon glyphicon-ok-circle';
          break;
        case 'education':
          bicon = 'glyphicon glyphicon-education';
          break;
        case 'user':
          bicon = 'glyphicon glyphicon-user';
          break;
        default:
          bicon = 'glyphicon glyphicon-info-sign';
      }
      icon = <span className={bicon} />;
    }
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
            <h5 className="card-title">{this.title}{icon}</h5>
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
  icon: '',
  image: 'default.png',
};

CardWithIcon.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  // eslint-disable-next-line
  links: PropTypes.array,
  icon: PropTypes.string,
  image: PropTypes.string,
};

export default (CardWithIcon);
