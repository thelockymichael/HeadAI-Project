// Load the full build.
var _ = require("lodash");
// Lodash testing

/* const array = ["Pekka", "Jussi", "Maija-Liisa"];

_.forEach(days, day => {
  console.log(day);
});
 */

/* array.chunk(["a", "b", "c", "d"], 2); // => [['a', 'b'], ['c', 'd']]
const abc = array.chunk(["a", "b", "c", "d"], 3); // => [['a', 'b', 'c'], ['d']]
console.log(abc); */

const dummy = blogs => {
  return (newBlogs = blogs.push({
    title: "Michael Lock palaa",
    author: "Michael Lock",
    url: "googlecom",
    likes: 0
  }));
};

const totalLikes = blogs => {
  const likesTotal = blogs.reduce((sum, item) => {
    return sum + item.likes;
  }, 0);

  return likesTotal;
};

const mostLikes = blogs => {
  return blogs
    .map(blog => {
      return {
        author: blog.author,
        likes: blog.likes,
        title: blog.title
      };
    })
    .reduce((sum, item) => {
      return sum.likes > item.likes ? sum : item;
    });
};

/* const mostBlogs = blogs => {
  return blogs
  .map
} */

var arr = [
  {
    username: "john",
    score: 37
  },
  {
    username: "jake",
    score: 50
  },
  {
    username: "bill",
    score: 20
  }
];

var obj = _.countBy(arr, rec => {
  return rec.score >= 50;
});

console.log(obj.false); // 2
console.log(obj.true); // 1

/* array.chunk(["a", "b", "c", "d"], 2); // => [['a', 'b'], ['c', 'd']]
const abc = array.chunk(["a", "b", "c", "d"], 3); // => [['a', 'b', 'c'], ['d']]
console.log(abc); */

module.exports = {
  dummy,
  totalLikes,
  mostLikes
};
