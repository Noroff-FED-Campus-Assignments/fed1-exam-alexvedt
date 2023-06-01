window.env = {
  BASE_ID: "app3aw9WCV8zgt57M",
  TABLE_NAME: "test-exam",
  API_KEY: "keyNDk1zmGMyyUPFh",
};

const results = document.querySelector("#results");
const filterSelect = document.querySelector("#filter");
const searchInput = document.querySelector("#search");
const sortSelect = document.querySelector("#sort");

window.BASE_ID = "app3aw9WCV8zgt57M";
window.TABLE_NAME = "test-exam";
window.apiKey = "keyNDk1zmGMyyUPFh";

export const TABLE_URL = `https://api.airtable.com/v0/${window.BASE_ID}/${window.TABLE_NAME}`;
export const headers = {
  Authorization: `Bearer ${window.apiKey}`,
  "Content-Type": "application/json",
};

window.tableUrl = `https://api.airtable.com/v0/${window.BASE_ID}/${window.TABLE_NAME}`;
window.headers = {
  Authorization: `Bearer ${window.apiKey}`,
  "Content-Type": "application/json",
};

let blogPosts = [];
let filteredPosts = [];
let isShowingAll = false;

const renderBlogPosts = (posts) => {
  results.innerHTML = "";
  const maxPostsToShow = 10;

  const visiblePosts = isShowingAll ? posts : posts.slice(0, maxPostsToShow);

  visiblePosts.forEach((blogpost) => {
    const imageUrl = blogpost.fields["Hero image"][0].thumbnails.large.url;
    const title = blogpost.fields.Title;
    const text = blogpost.fields.Text;
    const createdDate = new Date(blogpost.createdTime).toLocaleDateString();
    const blogId = blogpost.id;
    results.innerHTML += `
      <div class="blog-box animate__animated animate__backInUp">
        <div id="card" class="blog-img card">
          <img src="${imageUrl}" alt="blog image">
        </div>
        <div class="blog-text">
          <span>${createdDate} / By Alex</span>
          <a href="/details.html?id=${blogId}" class="blog-title">${title}</a>
          <p class="hide-text">${text}</p>
          <a href="/details.html?id=${blogId}">Read More</a>
        </div>
      </div>
    `;
  });

  if (posts.length > maxPostsToShow) {
    results.innerHTML += `
      <button class="show-all-btn" id="showAll">${
        isShowingAll ? "Show Less" : "Show More"
      }</button>
    `;
    const showAllButton = document.querySelector("#showAll");
    showAllButton.addEventListener("click", () => {
      isShowingAll = !isShowingAll;
      renderBlogPosts(posts);
    });
  }
};

const filterBlogPosts = (filterValue) => {
  let posts = [...filteredPosts];

  if (filterValue === "oldest") {
    posts.sort((a, b) => new Date(a.createdTime) - new Date(b.createdTime));
  } else if (filterValue === "newest") {
    posts.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
  }

  renderBlogPosts(posts);
};

const searchBlogPosts = (keyword) => {
  const filtered = blogPosts.filter((blogpost) => {
    const title = blogpost.fields.Title.toLowerCase();
    const text = blogpost.fields.Text.toLowerCase();
    return title.includes(keyword) || text.includes(keyword);
  });

  renderBlogPosts(filtered);
};

const sortBlogPosts = (sortValue) => {
  let posts = [...filteredPosts];

  if (sortValue === "asc") {
    posts.sort((a, b) => a.fields.Title.localeCompare(b.fields.Title));
  } else if (sortValue === "desc") {
    posts.sort((a, b) => b.fields.Title.localeCompare(a.fields.Title));
  } else if (sortValue === "date") {
    posts.sort((a, b) => new Date(a.createdTime) - new Date(b.createdTime));
  } else if (sortValue === "date-desc") {
    posts.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
  }

  renderBlogPosts(posts);
};

const getBlogPosts = async () => {
  try {
    const response = await fetch(TABLE_URL, { headers: headers });
    if (response.ok) {
      const data = await response.json();
      blogPosts = data.records;
      filteredPosts = [...blogPosts];
      renderBlogPosts(blogPosts);
    } else {
      results.innerHTML = `We failed to fetch the blog post. Apologies...`;
    }
  } catch (err) {
    results.innerHTML = `We are experiencing technical difficulties.`;
    console.log("An error occurred:", err);
  }
};

getBlogPosts();
searchBlogPosts(""); // Show all posts initially

filterSelect.addEventListener("change", (event) => {
  const filterValue = event.target.value;
  filterBlogPosts(filterValue);
});

searchInput.addEventListener("keyup", () => {
  const keyword = searchInput.value.toLowerCase();
  searchBlogPosts(keyword);
});

sortSelect.addEventListener("change", (event) => {
  const sortValue = event.target.value;
  sortBlogPosts(sortValue);
});
