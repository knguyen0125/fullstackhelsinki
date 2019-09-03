import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

afterEach(cleanup);

test('render content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'React',
    likes: 10,
    url: 'localhost',
  };

  const component = render(<SimpleBlog blog={blog} />);

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library',
  );
  expect(component.container).toHaveTextContent('React');
  expect(component.container).toHaveTextContent('10 likes');
});

test('clicking the button twice calls event handler twice', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'React',
    likes: 10,
    url: 'localhost',
  };

  const mockHandler = jest.fn();

  const component = render(<SimpleBlog blog={blog} onClick={mockHandler} />);

  const button = component.getByText('like');
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(2);
});
