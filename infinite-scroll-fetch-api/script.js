const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 3;
let page = 1;

// fetching post using async/await
// replace with limit  and page variable

async function getPosts() {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit} &_page=${page}`
  );

  const data = await response.json();
  return data;
}

// Show posts in DOM

async function showPosts() {
  const posts = await getPosts();

  // console.log(posts);

  // getting posts to the DOM we will loop through them
  posts.forEach((post) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info>
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
        </div>
        `;

    postsContainer.appendChild(postEl);
  });
}

// will show intial posts
showPosts();
