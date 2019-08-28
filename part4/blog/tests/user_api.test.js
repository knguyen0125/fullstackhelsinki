const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/User');

const api = supertest(app);

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({
      username: 'root',
      password: 'secret',
    });
    await user.save();
  });

  test('creation succeeds with a fresh user name', async () => {
    const usersAtStart = await User.find({});

    const newUser = {
      username: 'kevin',
      name: 'Kevin Nguyen',
      password: 'secret',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await User.find({});
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);
    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('invalid user not created - username too short', async () => {
    const newUser = {
      username: 'ke',
      name: 'Kevin Nguyen',
      password: 'secret',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });

  test('invalid user not created - password too short', async () => {
    const newUser = {
      username: 'kevin',
      name: 'Kevin Nguyen',
      password: 'se',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
