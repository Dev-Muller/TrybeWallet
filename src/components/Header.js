import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  expensesFunc = () => {
    const { expenses } = this.props;
    let soma = 0;
    expenses.forEach((expense) => {
      soma += Number(expense.value) * Number(expense.exchangeRates[expense.currency].ask);
    });
    return soma.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <span
            data-testid="email-field"
          >
            {`Email: ${email}`}
          </span>
          <span
            data-testid="total-field"
          >
            {this.expensesFunc()}
          </span>
          <span
            data-testid="header-currency-field"
          >
            BRL
          </span>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

export default connect(mapStateToProps)(Header);
