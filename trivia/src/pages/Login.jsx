import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getToken } from '../services/triviaApi';
import { login } from '../redux/actions';
import logo from '../assets/imgs/logo.png';

class Login extends Component {
  state = {
    name: '',
    email: '',
    disabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => this.validateInput(),
    );
  };

  validateInput = () => {
    const { name, email } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const validateEmail = regex.test(email);

    if (validateEmail && name.length > 0) {
      this.setState({
        disabled: false,
      });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { history, dispatch } = this.props;
    const { disabled, ...userLogin } = this.state;
    const token = await getToken();
    localStorage.setItem('token', token);
    dispatch(login(userLogin));
    history.push('/game');
  };

  render() {
    const { name, email, disabled } = this.state;
    return (
      <div>
        <header className="login-header">
          <img src={ logo } alt="trivia logo" className="trivia-logo" />
        </header>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => {
            const { history } = this.props;
            history.push('/settings');
          } }
          className="setting-button"
        >
          Settings
        </button>
        <form action="#" className="form-control login-form">
          <fieldset className="input-group mb-3 fieldset-container">
            <label htmlFor="nameInput" className="input-group-text">
              Name:
              <input
                type="text"
                id="nameInput"
                data-testid="input-player-name"
                name="name"
                value={ name }
                onChange={ this.handleChange }
                className="form-control"
              />
            </label>
            <label htmlFor="emailImput" className="input-group-text">
              Email:
              <input
                type="email"
                id="emailInput"
                data-testid="input-gravatar-email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                className="form-control"
              />
            </label>
            <button
              data-testid="btn-play"
              type="submit"
              disabled={ disabled }
              onClick={ this.handleSubmit }
              className="btn btn-success"
            >
              Play
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default connect()(Login);
