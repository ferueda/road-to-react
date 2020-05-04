import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Profile from './components/Profile';
import GlobalStyle from './theme/globalStyle';

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: palevioletred;
  color: ${({ primary }) => (primary ? 'violet' : 'palevioletred')};
  border: ${({ primary }) =>
    primary ? '2px solid violet' : '2px solid palevioletred'};
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;

  &:hover {
    color: white;
    background-color: ${({ primary }) =>
      primary ? 'violet' : 'palevioletred'};
  }
`;

const GreenButton = styled(Button)`
  background-color: white;
  color: green;
  border-color: green;
`;

const AppWrapper = styled.div`
  background-color: #fafafa;
`;

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <AppWrapper>
        <Header />
        <Profile />
      </AppWrapper>
    </React.Fragment>
  );
}

export default App;
