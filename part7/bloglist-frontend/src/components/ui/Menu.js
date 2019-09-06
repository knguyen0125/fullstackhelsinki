import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { darken } from "polished";

const Menu = props => {
  return (
    <ul className={props.className}>
      <Link to={"/blogs"}>
        <li>Blogs</li>
      </Link>
      <Link to={"/users"}>
        <li>Users</li>
      </Link>
    </ul>
  );
};

const StyledMenu = styled(Menu)`
  display: inline;
  margin: 0px;

  li {
    list-style-type: none;
    display: inline-block;
    margin: 0px;
    top: -2px;
    color: ${props => props.theme.textColor};
    font-size: 1.2em;
    position: relative;
    padding: 10px 15px 8px;

    &:hover {
      background-color: ${props => darken(0.1, props.theme.primaryColor)};
    }
  }
`;

export default StyledMenu;
