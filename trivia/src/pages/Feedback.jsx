import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { editScore } from '../redux/actions';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    const NUMBER_OF_ASSERTIONS = 3;
    return (
      <>
        <Header />
        <div className="feedback-container">
          <h3 data-testid="feedback-total-score">
            <span>Points: </span>
            {score}
          </h3>
          {assertions >= NUMBER_OF_ASSERTIONS ? (
            <h3 data-testid="feedback-text">Well Done!</h3>
          ) : (
            <h3 data-testid="feedback-text">Could be better...</h3>
          )}
          <h3 data-testid="feedback-total-question">
            <span>Questions: </span>
            {assertions}
          </h3>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => {
              const { dispatch, history } = this.props;
              dispatch(editScore(0, 0));
              history.push('/');
            } }
            className="btn btn-success"
          >
            Jogar novamente
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => {
              const { dispatch, history } = this.props;
              dispatch(editScore(0, 0));
              history.push('/ranking');
            } }
            className="btn btn-primary"
          >
            Ranking
          </button>
        </div>

      </>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  score: propTypes.number.isRequired,
  assertions: propTypes.number.isRequired,
  dispatch: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
