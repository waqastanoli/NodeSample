/**
 *
 * Account
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Footer from 'components/Footer';
import Header from 'components/Header';
import makeSelectAccount from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './style.css';
export function Account() {
  useInjectReducer({ key: 'account', reducer });
  useInjectSaga({ key: 'account', saga });

  return (
    <div>
      <Header options={{ title: 'Account' }} />
      <Helmet>
        <title>Account</title>
        <meta name="description" content="Description of Account" />
      </Helmet>
      <div className="container text-start my-5">
        <div className="alert alert-success col-sm-6 " role="alert">
          Your Registration was successful !
        </div>
        <h2 className="intro_large text-start fw-bold py-2">Welcome Vlad !</h2>
        <p className="intro_small text-start">
          Subscription Status: 14 Days trial
        </p>
        <p className="intro_small text-start">Product: Prometheos Si</p>
        <button type="button" className="btn btn-primary my-2  mx-2">
          Upgrade
        </button>
        <button type="button" className="btn btn-primary my-2  mx-2">
          Disconnect Service
        </button>
      </div>
      <Footer />
    </div>
  );
}

Account.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  account: makeSelectAccount(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Account);
