import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, render } from "@testing-library/react";
import Blog from "./Blog";

afterEach(cleanup);

test("render content and author", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "React",
    likes: 10,
    url: "localhost",
    user: {
      username: "test"
    }
  };

  const component = render(
    <Blog
      blog={blog}
      handleLike={() => {}}
      handleDelete={() => {}}
      currentUser={{ username: "test" }}
    />
  );

  expect(component.container).toHaveTextContent(
    "Component testing is done with react-testing-library React"
  );
});

test("clicking the button twice calls event handler twice", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "React",
    likes: 10,
    url: "localhost",
    user: {
      username: "test"
    }
  };

  const component = render(
    <Blog
      blog={blog}
      handleLike={() => {}}
      handleDelete={() => {}}
      currentUser={{ username: "test" }}
    />
  );

  const hiddenDiv = component.container.querySelector("div>div:nth-child(2)");
  expect(hiddenDiv).toHaveStyle("display: none");

  const button = component.getByText(`${blog.title} ${blog.author}`);
  fireEvent.click(button);
  let newhiddenDiv = component.container.querySelector("div>div:nth-child(2)");
  expect(newhiddenDiv).not.toHaveStyle("display: none");
});
