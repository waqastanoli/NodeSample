
import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';

import messages from './messages';
import logo from '../../images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

function Header(children) {
  return (
    <header>
      <div className="container text-center">
        <div className="row align-items-center">
          <div className="col-lg-2 col-sm-2 ">
            <A className="logo">
              <img src={logo} alt="logo" />
            </A>
          </div>
          <div className="col-lg cold-md col-sm heading_header">
            Prometheos Si | {children.options.title}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
