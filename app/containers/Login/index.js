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
import Modal from 'react-modal';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import H2 from 'components/H2';
// import LoginForm from 'components/LoginForm';
import { changeEmail, changePass, changeIsOpen, login } from './actions';
import makeSelectLogin, {
  makeSelectEmail,
  makeSelectPass,
  makeSelectIsOpen,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const modalStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'gray',
    width: 'auto',
    maxWidth: '750px',
    height: 'auto',
    display: 'inline-block',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.4)',
  },
};

export function Login({
  email,
  setEmail,
  pass,
  setPass,
  body,
  setIsOpen,
  modalIsOpen,
  handleSubmit,
}) {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });

  const openModal = () => {
    handleSubmit(email, pass);
    // console.log(body);
    // setIsOpen(true);
  };

  const afterOpenModal = () => {};

  const closeModal = () => {
    setIsOpen(false, body);
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Login Modal"
      >
        {body}
        Wrong Email or Password.
      </Modal>
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
      <button type="button" onClick={openModal}>
        Submit
      </button>
      <br />
      <p>
        {"Don't have an account? Click"}&nbsp;
        <a href="/register">here</a>
      </p>
    </div>
  );
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string,
  setEmail: PropTypes.func,
  pass: PropTypes.string,
  setPass: PropTypes.func,
  body: PropTypes.string,
  setIsOpen: PropTypes.func,
  modalIsOpen: PropTypes.bool,
  handleSubmit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
  email: makeSelectEmail(),
  pass: makeSelectPass(),
  modalIsOpen: makeSelectIsOpen(),
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
    },
    setEmail: e => {
      dispatch(changeEmail(e));
    },
    setPass: e => {
      dispatch(changePass(e));
    },
    setIsOpen: (value, body) => {
      dispatch(changeIsOpen(value, body));
      console.log(body);
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
