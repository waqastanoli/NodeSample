/**
 *
 * Signup
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSignup from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import googleButton from './google.png';
import logo from './logo.png';
import './style.css'; 
export function Signup() {
  useInjectReducer({ key: 'signup', reducer });
  useInjectSaga({ key: 'signup', saga });

  return (
    <div className="container text-center">
      <div className="row align-items-center">
        <div className="col-lg-6 col-sm-6 theme_dark_bg d-flex flex-column py-5  px-4">
          <span className="intro_small  text-start">Did you know?</span>
          <p className="intro_large text-start">
            More than 60% of Cyber attacks and fraud cases target emails
          </p>
          <div>
            <img src={logo} className="sidebar_logo" alt="logo" />
          </div>
          <p className="intro_large text-start">Prometheos Si</p>
          <span className="intro_small text-start">
            Gain insights on every mail received to enhance threat
            identification
          </span>
        </div>

        <div className="col-lg-6 col-sm-6  flex-column py-5 d-flex  px-4">
          <p className="intro_large text-start fw-bold py-2">Register</p>
          <span className="intro_small text-start py-2">
            By registering you are agreeing to the terms of service, privacy
            policy and cookie policy
          </span>
          <div className="text-start py-2">
            <img src={googleButton} style={{ width: '50%' }} alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

Signup.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  signup: makeSelectSignup(),
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

export default compose(withConnect)(Signup);
