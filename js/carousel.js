import { TABLE_URL, headers } from "./app.js";
import Glide from "@glidejs/glide";

const carouselWrapper = document.querySelector("#glide-slides-js");

const fetchBlogPosts = async () => {
  try {
    const response = await fetch(TABLE_URL, { headers: headers });
    if (response.ok) {
      const data = await response.json();
      const blogPosts = data.records;
      renderCarousel(blogPosts);
    } else {
      console.log("Failed to fetch blog posts");
    }
  } catch (error) {
    console.log("An error occurred:", error);
  }
};

const renderCarousel = (blogPosts) => {
  const numPosts = blogPosts.length;
  carouselWrapper.innerHTML = "";

  for (let i = 0; i < numPosts; i++) {
    const blogPost = blogPosts[i];
    const imageUrl = blogPost.fields["Hero image"][0].thumbnails.large.url;
    const title = blogPost.fields.Title;
    const blogId = blogPost.id;
    const card = `
    <li class="glide__slide animate__animated animate__backInUp">
    <a href="/details.html?id=${blogId}" class="carousel-link">
      <img src="${imageUrl}" alt="Blog Image">
      <p class="carousel-p">${title}</p>
    </a>
  </li>
    `;

    carouselWrapper.innerHTML += card;
  }

  // Initialize the carousel after rendering the content
  initCarousel();
};

const initCarousel = () => {
  new Glide(".glide", {
    type: "carousel",
    perView: 4,
    gap: 20,
    autoplay: 5000,
    hoverpause: true,
    breakpoints: {
      768: {
        perView: 2,
      },
      480: {
        perView: 1,
      },
    },
    animationDuration: 500,
    peek: {
      before: 50,
      after: 50,
    },
    keyboard: true,
    swipeThreshold: 80,
    dragThreshold: 120,
    classes: {
      activeSlide: "active",
      activeNav: "active",
    },
    draggingThreshold: 100,
    dragVelocity: 0.5,
    focusAt: "center",
    scale: 1,
    animationTimingFunc: "cubic-bezier(0.165, 0.84, 0.44, 1)",
  }).mount();
};

fetchBlogPosts();
