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
import makeSelectSubscription from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './style.css';
export function Subscription() {
  useInjectReducer({ key: 'account', reducer });
  useInjectSaga({ key: 'account', saga });

  return (
    <div>
      <Header options={{ title: 'Subscription' }} />
      <Helmet>
        <title>Subscription</title>
        <meta name="description" content="Description of Account" />
      </Helmet>
      <div className="container text-start my-5">
        <h2 className="intro_smalltext-start fw-bold py-2">Subscription</h2>
        <div className="row">
          <p className="intro_small text-start col-sm-2 ">Product &nbsp;</p>
          <div className="dropdown col-sm-2 ">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Billed Monthly @ 2.9 USD
            </button>
            <ul
              className="dropdown-menu dropdown-menu-dark"
              aria-labelledby="dropdownMenuButton2"
            >
              <li>
                <a className="dropdown-item active">Billed Monthly @ 2.9 USD</a>
              </li>
              <li>
                <a className="dropdown-item">Drop down Billed Annual @ 27USD</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="intro_small text-start py-4 my-2 border">
          Stripe integration for payment
        </p>
        <p className="intro_small text-start">
          By registering you are agreeing to the terms of service, privacy
          policy and cookie policy
        </p>
        <button type="button" className="btn btn-primary my-2 mx-2">
          Agree and Pay
        </button>
        <button type="button" className="btn btn-primary my-2 mx-2">
          Return Home
        </button>
      </div>
      <Footer />
    </div>
  );
}

Subscription.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  subscription: makeSelectSubscription(),
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
)(Subscription);
