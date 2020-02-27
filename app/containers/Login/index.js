/**
 *
 * Login
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
import H2 from 'components/H2';
import LoginForm from 'components/LoginForm';
import { changeUsername } from './actions';
import makeSelectLogin, { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Login({ username, setUsername }) {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });

  return (
    <div>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
      <H2>
        <FormattedMessage {...messages.header} />
      </H2>
      <input type="text" value={username} onChange={setUsername} />

      <LoginForm />
    </div>
  );
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  username: PropTypes.string,
  setUsername: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
  username: makeSelectUsername(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setUsername: e => {
      dispatch(changeUsername(e.target.value));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Login);
