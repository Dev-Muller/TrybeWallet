import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRatesThunk, fetchThunk } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    currency: 'USD',
    description: '',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchThunk());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validate);
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { id } = this.state;
    this.setState({ id: id + 1 });
    dispatch(fetchRatesThunk(this.state));
    this.setState({
      value: '',
      currency: 'USD',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { value, currency, description, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form action="">
          <label htmlFor="valueInput">
            Valor:
            <input
              type="number"
              name="value"
              id="valueInput"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="currencyInput">
            Moeda:
            <select
              name="currency"
              id="currencyInput"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
            >
              {
                currencies.map((currencie, index) => (
                  <option key={ index } value={ currencie }>{ currencie }</option>
                ))
              }
            </select>
          </label>
          <label htmlFor="payInput">
            Método de Pagamento:
            <select
              name="method"
              id="payInput"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tagInput">
            Tag:
            <select
              name="tag"
              id="tagInput"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="valueInput">
            Descrição:
            <input
              type="textarea"
              name="description"
              id="descriptionInput"
              value={ description }
              onChange={ this.handleChange }
              data-testid="description-input"
            />
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ),
}.isRequired;

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(WalletForm);
