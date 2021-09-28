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
import makeSelectCancel from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './style.css';
export function Cancel() {
  useInjectReducer({ key: 'account', reducer });
  useInjectSaga({ key: 'account', saga });

  return (
    <div>
      <Header options={{ title: 'Cancel service' }} />
      <Helmet>
        <title>Cancel</title>
        <meta name="description" content="Description of Account" />
      </Helmet>
      <div className="container text-start my-5">
        <p className="intro_small text-start my-2 ">
          We are sad to see you leave !
        </p>
        <p className="intro_large text-start  fw-bold">
          Help us understand what could we have done better
        </p>
        <textarea cols="50" rows="7" className="form-control border-3" />
        <button type="button" className="btn btn-primary my-2">
          Confirm Cancelation
        </button>
        <p className="intro_small text-start my-2 ">
          Your subscription will be canceled at the end of the billing cycle
        </p>
      </div>
      <Footer />
    </div>
  );
}

Cancel.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cancel: makeSelectCancel(),
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
)(Cancel);
