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
import H1 from 'components/H1';
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
  background: #66666600;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleContainer = styled.div`
  width: 80%;
  background: #555555;
  border: 2px solid black;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  min-width: 0px;
`;

const Label = styled.label`
  color: white;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const OkButton = styled.button`
  color: deepskyblue;
  border: 2px solid deepskyblue;
  background: #ffffff00;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  padding: 10px;
  font-size: 18px;
  border-radius: 4px;
  margin: 2px 2px;
  align-self: center;
  min-width: 100px;

  &:active {
    background: deepskyblue;
    color: white;
  }
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
    display: 'flex',
    flexDirection: 'column',
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

  if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#app');

  const openModal = () => {
    handleSubmit(email, pass);
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
        <OkButton onClick={closeModal}>OK</OkButton>
      </Modal>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Register Page" />
      </Helmet>
      <TitleContainer>
        <H1>Register</H1>
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
      </TitleContainer>
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
