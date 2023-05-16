const env = {
  BASE_ID: "app3aw9WCV8zgt57M",
  TABLE_NAME: "test-exam",
  API_KEY: "keyNDk1zmGMyyUPFh",
};

const results = document.querySelector("#results");

const BASE_ID = env.BASE_ID;
const TABLE_NAME = env.TABLE_NAME;
const apiKey = env.API_KEY;

const tableUrl = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
const headers = {
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json",
};

const getBlogPosts = async () => {
  try {
    const response = await fetch(tableUrl, { headers: headers });
    if (response.ok) {
      const data = await response.json();
      results.innerHTML = "";
      data.records.forEach((blogpost) => {
        const imageUrl = blogpost.fields["Hero image"][0].thumbnails.large.url;
        const title = blogpost.fields.Title;
        const text = blogpost.fields.Text;
        const createdDate = new Date(blogpost.createdTime).toLocaleDateString();

        results.innerHTML += `
          <div class="blog-box animate__animated animate__bounceInUp">
            <div class="blog-img card">
              <img src="${imageUrl}" alt="blog image">
            </div>
            <div class="blog-text">
            <span>${createdDate} / Theme</span>
            <a href="#" class="blog-title">${title}</a>
              <p>${text}</p>
              <a href="#">Read More</a>
            </div>
          </div>
        `;
      });
    } else {
      console.log("Failed to fetch blog posts");
    }
  } catch (err) {
    console.log("An error occurred:", err);
  }
};

getBlogPosts();

/*
============================================
Constants
@example: https://github.com/S3ak/fed-javascript1-api-calls/blob/main/examples/games.html#L66
============================================
*/

// TODO: Get DOM elements from the DOM

/*
============================================
DOM manipulation
@example: https://github.com/S3ak/fed-javascript1-api-calls/blob/main/examples/games.html#L89
============================================
*/

// TODO: Fetch and Render the list to the DOM

// TODO: Create event listeners for the filters and the search

/**
 * TODO: Create an event listener to sort the list.
 * @example https://github.com/S3ak/fed-javascript1-api-calls/blob/main/examples/search-form.html#L91
 */

/*
============================================
Data fectching
@example: https://github.com/S3ak/fed-javascript1-api-calls/blob/main/examples/games.html#L104
============================================
*/

// TODO: Fetch an array of objects from the API

/*
============================================
Helper functions
https://github.com/S3ak/fed-javascript1-api-calls/blob/main/examples/games.html#L154
============================================
*/

/**
 * TODO: Create a function to filter the list of item.
 * @example https://github.com/S3ak/fed-javascript1-api-calls/blob/main/examples/search-form.html#L135
 * @param {item} item The object with properties from the fetched JSON data.
 * @param {searchTerm} searchTerm The string used to check if the object title contains it.
 */

/**
 * TODO: Create a function to create a DOM element.
 * @example https://github.com/S3ak/fed-javascript1-api-calls/blob/main/src/js/detail.js#L36
 * @param {item} item The object with properties from the fetched JSON data.
 */
