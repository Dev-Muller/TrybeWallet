import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
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
            Despesa Total: R$ 0
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
  // total: PropTypes.number.isRequired,
  // currency: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

export default connect(mapStateToProps)(Header);
