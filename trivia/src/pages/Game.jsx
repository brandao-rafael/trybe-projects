import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import { getQuestions } from '../services/triviaApi';
import Header from '../components/Header';
import Clock from '../components/Clock';
import { editScore } from '../redux/actions';
import { savePlayerInRanking } from '../services/localStorage';

class Game extends Component {
  state = {
    questions: [],
    actualIndex: 0,
    isCorrect: undefined,
    selectedAnswer: '',
    answerTimeHelper: 0,
    timeLeft: 30,
  };

  componentDidMount() {
    this.fetchQuestions();
  }

  clockTickCallback = () => {
    this.setState(
      (prev) => {
        const { selectedAnswer, answerTimeHelper } = this.state;
        if (selectedAnswer !== '') {
          return { answerTimeHelper: answerTimeHelper + 1 };
        }
        return {
          timeLeft: prev.timeLeft <= 0 ? 0 : prev.timeLeft - 1,
        };
      },
      () => {
        const { timeLeft } = this.state;
        if (timeLeft === 0) {
          this.setState({
            selectedAnswer: '*-*-*',
            isCorrect: false,
          });
        }
      },
    );
  };

  shuffleQuestions = (questions) => {
    const shuffledQuestions = questions.map((question) => {
      const answers = [...question.incorrect_answers, question.correct_answer];
      const n = 0.5;
      const shuffledAnswers = answers.sort(() => Math.random() - n);
      return {
        ...question,
        answers: shuffledAnswers,
      };
    });
    return shuffledQuestions;
  };

  fetchQuestions = async () => {
    const numberOfQuestions = 5;
    const token = localStorage.getItem('token');
    const { history } = this.props;
    try {
      const questions = await getQuestions(numberOfQuestions, token);
      const shuffledQuestions = this.shuffleQuestions(questions);
      this.setState({
        questions: shuffledQuestions,
      });
    } catch (error) {
      history.push('/');
    }
  };

  nextQuestion = () => {
    const { history } = this.props;
    const NUMBER_OF_QUESTIONS = 5;
    this.setState(
      (prevState) => {
        const { actualIndex } = prevState;
        return {
          actualIndex: actualIndex + 1,
          timeLeft: 30,
          isCorrect: undefined,
          selectedAnswer: '',
          answerTimeHelper: 0,
        };
      },
      () => {
        const { actualIndex } = this.state;
        if (actualIndex === NUMBER_OF_QUESTIONS) {
          const { name, score, gravatarEmail } = this.props;
          const hash = MD5(gravatarEmail).toString();
          const player = {
            name,
            score,
            picture: `https://www.gravatar.com/avatar/${hash}`,
          };
          savePlayerInRanking(player);
          history.push('/feedback');
        }
      },
    );
  };

  calculateScore = (answer) => {
    const POINTS_DEFAULT = 10;
    const { timeLeft } = this.state;
    const { dispatch, score, assertions } = this.props;
    const dificult = ['easy', 'medium', 'hard'];
    const gameScore = POINTS_DEFAULT
      + timeLeft * (dificult.indexOf(answer.difficulty) + 1)
      + score;
    const gameAssertions = 1 + assertions;
    dispatch(editScore(gameScore, gameAssertions));
  };

  verifyAnswer = (answer) => {
    const { questions, actualIndex, isCorrect, timeLeft } = this.state;
    if (isCorrect === undefined) {
      const isCorrectAnswer = questions[actualIndex].correct_answer.includes(answer);
      this.setState(
        {
          isCorrect: isCorrectAnswer,
          selectedAnswer: answer,
          answerTimeHelper: timeLeft,
        },
        () => {
          if (isCorrectAnswer) {
            this.calculateScore(questions[actualIndex]);
          }
        },
      );
    }
  };

  decodeEntity = (inputStr) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = inputStr;
    return textarea.value;
  };

  render() {
    const { questions, actualIndex, selectedAnswer, timeLeft } = this.state;
    return (
      <div className="game">
        <Header />
        {questions.length > 0 && (
          <div className="question-container">
            <h2 data-testid="question-text">
              { this.decodeEntity(questions[actualIndex]?.question)}
            </h2>
            <Clock time={ timeLeft } tickCallback={ this.clockTickCallback } />
            <p data-testid="question-category">
              {questions[actualIndex]?.category}
            </p>
            <div data-testid="answer-options" className="answer-options">
              {questions[actualIndex]?.answers.map((answer, i) => (
                <button
                  type="button"
                  key={ i }
                  onClick={ () => {
                    this.verifyAnswer(answer);
                  } }
                  data-testid={
                    questions[actualIndex].correct_answer.includes(answer)
                      ? 'correct-answer'
                      : `wrong-answer-${i}`
                  }
                  // style={
                  //   selectedAnswer !== ''
                  //     ? {
                  //       border: questions[
                  //         actualIndex
                  //       ].correct_answer.includes(answer)
                  //         ? '3px solid rgb(6, 240, 15)'
                  //         : '3px solid red',
                  //     }
                  //     : {}
                  // }
                  className={
                    // eslint-disable-next-line no-nested-ternary
                    selectedAnswer !== ''
                      ? questions[actualIndex].correct_answer.includes(answer)
                        ? 'btn btn-success'
                        : 'btn btn-danger'
                      : 'btn btn-primary'
                  }
                  disabled={ selectedAnswer !== '' }
                >
                  {this.decodeEntity(answer)}
                </button>
              ))}
            </div>
            {selectedAnswer !== '' && (
              <button
                type="button"
                onClick={ this.nextQuestion }
                data-testid="btn-next"
                className="btn btn-outline-warning"
              >
                Próxima
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  assertions: state.player.assertions,
});

Game.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
  dispatch: propTypes.func.isRequired,
  score: propTypes.number.isRequired,
  assertions: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  gravatarEmail: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
