const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/User');

usersRouter.get('/', async (request, response, next) => {
  const users = await User.find({}).populate('blogs', { user: 0, likes: 0 });

  response.status(200).json(users.map((u) => u.toJSON()));
});

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body;

    if (!body.password || body.password.length < 3) {
      return response
        .status(400)
        .json({ error: 'password must be at least 3 character long' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;
