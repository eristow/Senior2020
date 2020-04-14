/**
 *
 * Register
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Modal from 'react-modal';
import styled from 'styled-components';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import H2 from 'components/H2';
import InputText from 'components/InputText';
import Button from 'components/Button';
// import RegisterForm from 'components/RegisterForm';
import { changeEmail, changePass, changeIsOpen, register } from './actions';
import makeSelectRegister, {
  makeSelectEmail,
  makeSelectPass,
  makeSelectIsOpen,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

const Container = styled.div`
  max-width: 800px;
  background: #666666;
  border: 2px solid black;
  border-radius: 4px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  color: white;
`;

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

export function Register({
  email,
  setEmail,
  pass,
  setPass,
  body,
  setIsOpen,
  modalIsOpen,
  handleSubmit,
}) {
  useInjectReducer({ key: 'register', reducer });
  useInjectSaga({ key: 'register', saga });

  const openModal = () => {
    // console.log(email);
    handleSubmit(email, pass);
    // console.log(body);
    // setIsOpen(true);
  };

  const afterOpenModal = () => {};

  const closeModal = () => {
    setIsOpen(false, body);
  };

  return (
    <Container>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Register Modal"
      >
        {body}
        Email is already registered.
      </Modal>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Description of Register" />
      </Helmet>
      <H2>Register</H2>
      <InputContainer>
        <Label>Email: </Label>
        <InputText
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          width="15em"
        />
      </InputContainer>
      <InputContainer>
        <Label>Password: </Label>
        <InputText
          type="password"
          value={pass}
          onChange={e => setPass(e.target.value)}
          width="15em"
        />
      </InputContainer>
      <Button type="button" onClick={openModal} text="Submit" />
    </Container>
  );
}

Register.propTypes = {
  // dispatch: PropTypes.func.isRequired,
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
  register: makeSelectRegister(),
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
      dispatch(register(state));
    },
    setEmail: e => {
      dispatch(changeEmail(e));
    },
    setPass: e => {
      dispatch(changePass(e));
    },
    setIsOpen: (value, body) => {
      dispatch(changeIsOpen(value, body));
      // console.log(body);
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Register);
