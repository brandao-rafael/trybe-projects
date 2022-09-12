import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import getImageSource from '../services/gravatarApi';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    const playerAvatar = getImageSource(email);
    return (
      <div className="header-container">
        <img
          data-testid="header-profile-picture"
          src={ playerAvatar }
          alt={ name }
          className="header-profile-pic"
        />
        <h3 data-testid="header-player-name">{name}</h3>
        <p data-testid="header-score">
          <span>Points: </span>
          {score}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  name: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
