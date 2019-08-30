import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitForElement } from '@testing-library/react';
jest.mock('./services/blogs');
import App from './App';

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(<App />);

    component.rerender(<App />);

    await waitForElement(() => component.getByText('login'));

    expect(component.container).toHaveTextContent('login to application');
    expect(component.container).not.toHaveTextContent('logged in');

    const blogs = component.container.querySelector('.blogs');
    expect(blogs).toBeNull();
  });

  test('if user is logged on, blogs are rendered', async () => {
    const loggedUser = {
      username: 'kevin',
      name: 'Kevin Nguyen',
      token: 'test token',
    };

    window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

    const component = render(<App />);

    component.rerender(<App />);

    await waitForElement(() => component.container.querySelector('.blogs'));

    expect(component.container).not.toHaveTextContent('login to application');
    expect(component.container).toHaveTextContent(
      `${loggedUser.name} is logged in`,
    );

    const blogs = component.container.querySelectorAll('.blogs>div');
    expect(blogs.length).toBe(3);
    expect(component.container).toHaveTextContent('HTML is easy');
    expect(component.container).toHaveTextContent(
      'Browser can execute only javascript',
    );
    expect(component.container).toHaveTextContent(
      'The most important methods of HTTP are GET and POST',
    );
  });
});
