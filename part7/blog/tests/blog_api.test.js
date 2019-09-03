const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/Blog');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'test blog 1',
    author: 'test author 1',
    url: 'test url',
    likes: 10,
  },
  {
    title: 'test blog 2',
    author: 'test author 1',
    url: 'test url',
    likes: 5,
  },
  {
    title: 'test blog 3',
    author: 'test author 1',
    url: 'test url',
    likes: 15,
  },
  {
    title: 'test blog 4',
    author: 'test author 2',
    url: 'test url',
    likes: 20,
  },
  {
    title: 'test blog 5',
    author: 'test author 3',
    url: 'test url',
    likes: 40,
  },
  {
    title: 'test blog 6',
    author: 'test author 2',
    url: 'test url',
    likes: 0,
  },
];

beforeEach(async () => {
  console.log('before each');
  await Blog.deleteMany({});

  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('blog posts are returned in correct number', async (done) => {
  api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body.length).toEqual(6);
      return done();
    });
});

test('blog posts has id as identifier', async (done) => {
  api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .end((err, res) => {
      if (err) return done(err);
      res.body.forEach((blog) => {
        expect(blog.id).toBeDefined();
      });
      return done();
    });
});

test('blog posts are created correctly', async (done) => {
  await api
    .post('/api/blogs')
    .send({
      title: 'test blog',
      author: 'test author',
      url: 'test url',
      likes: 10,
    })
    .expect(201)
    .expect('Content-Type', /application\/json/);

  api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body.length).toEqual(7);
      return done();
    });
});

test('blog post with likes undefined are defaulted to 0', async (done) => {
  api
    .post('/api/blogs')
    .send({
      title: 'test blog 2',
      author: 'test author',
      url: 'test url',
    })
    .expect(201)
    .expect('Content-Type', /application\/json/)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body.likes).toEqual(0);
      return done();
    });
});

test('malformed blog posts will not be created', async (done) => {
  api
    .post('/api/blogs')
    .send({
      url: 'test url',
    })
    .expect(400)
    .expect('Content-Type', /application\/json/)
    .end(() => done());
});

afterAll(() => {
  mongoose.connection.close();
});
