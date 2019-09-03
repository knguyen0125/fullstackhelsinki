import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Menu = props => {
  return (
    <div className={props.className}>
      <ul>
        <Link to={"/"}>
          <li>Blogs</li>
        </Link>
        <Link to={"/users"}>
          <li>Users</li>
        </Link>
      </ul>{" "}
    </div>
  );
};

const StyledMenu = styled(Menu)`
  div {
    background-color: red;
  }
  li {
    list-style-type: none;
    display: inline-block;
    padding-left: 10px;
  }
`;

export default StyledMenu;
