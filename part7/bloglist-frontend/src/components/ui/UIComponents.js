import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  width: 60%;
  padding-left: 20%;
  position: relative;
`;

export const Button = styled.a`
  padding: 10px;
  border: 1px black solid;
  background-color: ${props => props.theme.primaryColor};
  color: ${props => props.theme.textColor};
  display: inline;
  clear: both;

  &:hover {
    cursor: pointer;
    background-color: ${props => darken(0.1, props.theme.primaryColor)};
  }
`;
