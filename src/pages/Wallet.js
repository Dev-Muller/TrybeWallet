import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email, total, currency } = this.props;
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
            {`Despesa Total: R$${total}`}
          </span>
          <span
            data-testid="header-currency-field"
          >
            { currency }
          </span>
        </header>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.user.total,
  currency: state.user.currency,
});

export default connect(mapStateToProps)(Wallet);
