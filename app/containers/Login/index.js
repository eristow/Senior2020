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
// import LoginForm from 'components/LoginForm';
import { changeEmail, changePass, login } from './actions';
import makeSelectLogin, { makeSelectEmail, makeSelectPass } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Login({ email, setEmail, pass, setPass, handleSubmit }) {
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
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={pass}
          onChange={e => setPass(e.target.value)}
        />
      </label>
      <br />
      <br />
      <p>
        Don't have an account? Click&nbsp;
        <a href="/register">here</a>
      </p>
      <button type="button" onClick={() => handleSubmit(email, pass)}>
        Submit
      </button>
      {/* </form> */}
    </div>
  );
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string,
  setEmail: PropTypes.func,
  pass: PropTypes.string,
  setPass: PropTypes.func,
  handleSubmit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
  email: makeSelectEmail(),
  pass: makeSelectPass(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    handleSubmit: (currEmail, currPass) => {
      const state = {
        email: currEmail,
        pass: currPass,
      };
      dispatch(login(state));
      //   e.preventDefault();
      //   dispatch(login(e.target.value))
      //   // if(this.isValid()) {
      //   //   this.ListenxingStateChangedEvent({ errors: {}, isLoading: true });
      //   //   this.props.login(this.state).then(
      //   //     (res) => this.context.router.push('/'),
      //   //     (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
      //   //   );
      //   // }
    },
    setEmail: e => {
      dispatch(changeEmail(e));
    },
    setPass: e => {
      dispatch(changePass(e));
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
