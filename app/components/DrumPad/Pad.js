import styled from 'styled-components';

const Pad = styled.button`
  display: inline-block;
  box-sizing: border-box;
  height: 100px;
  width: 100px;
  padding: 0.25em 1em;
  margin: 0em 0.1em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  border: 2px solid #cc4141;
  color: #cc4141;
  background: #fff;

  &:active {
    background: #cc4141;
    color: #fff;
  }
`;

export default Pad;
