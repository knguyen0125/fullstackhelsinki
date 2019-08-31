import React from "react";
import { setFilter } from "../reducers/filterReducer";
import { connect } from "react-redux";

const Filter = props => {
  const onChange = e => {
    console.log(e.target.value);
    props.setFilter(e.target.value);
  };

  return (
    <div>
      filter <input type="text" onChange={onChange} />
    </div>
  );
};

export default connect(
  null,
  { setFilter }
)(Filter);
