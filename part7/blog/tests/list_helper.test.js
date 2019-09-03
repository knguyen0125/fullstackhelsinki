const listHelper = require('../utils/list_helper');

const listWithZeroBlog = [];

const listWithOneBlog = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
];

const listWithMultipleBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Kevin',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 20,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Kevin',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
];

test('dummy returns one', () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(listWithZeroBlog);
    expect(result).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs);
    expect(result).toBe(40);
  });
});

describe('favorite blog', () => {
  test('when list has zero blogs', () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toBeNull();
  });

  test('when list has 1 blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    });
  });

  test('when list has multiple blogs', () => {
    const favoriteBlog = listHelper.favoriteBlog(listWithMultipleBlogs);
    expect(favoriteBlog).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 20,
    });
  });
});

describe('most blogs', () => {
  test('when list has zero blogs', () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toBeNull();
  });

  test('when list has 1 blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    });
  });
  test('when list has multiple blogs', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs);
    expect(result).toEqual({
      author: 'Kevin',
      blogs: 2,
    });
  });
});

describe('most likes', () => {
  test('when list has zero blogs', () => {
    const result = listHelper.mostLikes([]);
    expect(result).toBeNull();
  });

  test('when list has 1 blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });
  test('when list has multiple blogs', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 30,
    });
  });
});
