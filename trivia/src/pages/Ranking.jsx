import React, { Component } from 'react';
import propTypes from 'prop-types';
import { getRanking } from '../services/localStorage';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    this.getRankingList();
  }

  getRankingList = () => {
    const getRankingList = getRanking();
    this.setState({
      ranking: [...getRankingList].sort((a, b) => b.score - a.score),
    });
  };

  render() {
    const { history } = this.props;
    const { ranking } = this.state;
    return (
      <div>
        <h2 data-testid="ranking-title" className="ranking-title">Ranking</h2>
        <div className="ranking-container">
          {ranking?.map((player, i) => (
            <div key={ i } className="personal-card">
              <img src={ player.picture } alt={ player.name } />
              <p data-testid={ `player-name-${i}` }>{player.name}</p>
              <p data-testid={ `player-score-${i}` }>{player.score}</p>
            </div>
          ))}
        </div>
        <div className="home-ranking-btn">
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => {
              history.push('/');
            } }
            className="btn btn-primary"
          >
            Home
          </button>
        </div>
      </div>
    );
  }
}

export default Ranking;

Ranking.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};
