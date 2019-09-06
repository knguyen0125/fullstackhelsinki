import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Menu from "./Menu";
import { Container } from ".";
import LoggedInStatus from "../element/LoggedInStatus";

const StyledHeader = styled.div`
  background-color: ${props => props.theme.primaryColor};
  height: 40px;
  color: ${props => props.theme.textColor};
`;

const Logo = styled.h1`
  margin: 0;
  padding-left: 40px;
  display: inline-block;
  color: ${props => props.theme.textColor};
`;

const Header = () => {
  return (
    <StyledHeader>
      <Container>
        <Link to={"/"}>
          <Logo>Blog App</Logo>
        </Link>
        <Menu />
        <LoggedInStatus />
      </Container>
    </StyledHeader>
  );
};

export default Header;
