const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
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

// Show loader and show more posts
// add class of show
// setTimeout will only allow the loader to show for an x amount
// 2nd timeout will allow the posts to show with the time limit set

function showLoading() {
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

// filter posts

function filterPosts(e) {
  // check to see if the input is working

  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  // will loop throught the posts of the title and body to match

  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

// will show intial posts
showPosts();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // from stackoverflow
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    // console.log(123)
    // will show loading circles
    showLoading();
  }
});

filter.addEventListener('input', filterPosts);
