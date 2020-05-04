import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Explore } from '../assets/explore.svg';
import { ReactComponent as Avatar } from '../assets/avatar.svg';
import { ReactComponent as Compass } from '../assets/compass.svg';

const Nav = styled.nav`
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`;

const NavHeader = styled.div`
  max-width: 1010px;
  padding: 26px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const NavLeft = styled.div`
  width: 33.333%;
  text-align: left;
`;

const NavCenter = styled.div`
  width: 33.333%;
  text-align: center;
`;

const NavRight = styled.div`
  width: 33.333%;
  text-align: right;

  svg {
    margin-left: 20px;
  }
`;

const Input = styled.input`
  border: solid 1px #dbdbdb;
  border-radius: 3px;
  padding: 7px 33px;
  color: #999;
  cursor: text;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  background: #fafafa;

  &:active,
  &:focus {
    text-align: left;
  }
`;

const Header = () => {
  return (
    <Nav>
      <NavHeader>
        <NavLeft>Stylagram</NavLeft>

        <NavCenter>
          <Input type='text' placeholder='Search' />
        </NavCenter>

        <NavRight>
          <a href='#'>
            <Compass />
          </a>

          <a href='#'>
            <Explore />
          </a>

          <a href='#'>
            <Avatar />
          </a>
        </NavRight>
      </NavHeader>
    </Nav>
  );
};

export default Header;
