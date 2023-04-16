import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { emailLogin } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    disabled: true,
    password: '',
  };

  handleClick = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(emailLogin(
      email,
    ));
    history.push('/carteira');
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validate);
  };

  validate = () => {
    const { email, password } = this.state;
    const minLenght = 6;
    const regex = /^[\w-]+(.[\w-]+)*@([\w-]+.)+[a-zA-Z]{2,7}$/;
    const verifyPassword = password.length >= minLenght;
    const verifyEmail = email.match(regex);
    if (verifyEmail && verifyPassword) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
    // regex foi pego ideia de como fazer do link https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail e utilizado
    // email.match() para conseguir verificar
  };

  render() {
    const { email, password, disabled } = this.state;
    return (
      <div>
        <form action="">
          <label htmlFor="emailInput">
            E-mail:
            <input
              type="email"
              name="email"
              id="emailInput"
              value={ email }
              onChange={ this.handleChange }
              data-testid="email-input"
            />
          </label>
          <label htmlFor="passwordInput">
            Senha:
            <input
              type="password"
              name="password"
              id="passwordInput"
              value={ password }
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            onClick={ this.handleClick }
            disabled={ disabled }
            data-testid="btn-login"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
