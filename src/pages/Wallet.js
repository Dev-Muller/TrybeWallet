import React from 'react';
import { connect } from 'react-redux';
import WalletForm from '../components/WalletForm';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <WalletForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
  // total: state.user.total,
  // currency: state.user.currency,
});

export default connect(mapStateToProps)(Wallet);
