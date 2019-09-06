import React from "react";
import Toggleable from "../components/element/Toggleable";
import BlogCreation from "../components/element/BlogCreation";
import BlogList from "../components/block/BlogList";
import styled from "styled-components";

const CenteredHeader = styled.h1`
  text-align: center;
`;

const BlogListView = props => {
  console.log("bloglistview", props);
  return (
    <div>
      <CenteredHeader>Blogs</CenteredHeader>
      <BlogList />
      <Toggleable buttonLabel="New Blog">
        <BlogCreation />
      </Toggleable>
    </div>
  );
};

export default BlogListView;
