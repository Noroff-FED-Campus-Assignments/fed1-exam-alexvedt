const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get("id");

window.env = {
  BASE_ID: "app3aw9WCV8zgt57M",
  TABLE_NAME: "test-exam",
  API_KEY: "keyNDk1zmGMyyUPFh",
};

window.BASE_ID = "app3aw9WCV8zgt57M";
window.TABLE_NAME = "test-exam";
window.apiKey = "keyNDk1zmGMyyUPFh";

const TABLE_URL = `https://api.airtable.com/v0/${window.BASE_ID}/${window.TABLE_NAME}/${blogId}`;
const headers = {
  Authorization: `Bearer ${window.apiKey}`,
  "Content-Type": "application/json",
};

const blogPostContainer = document.querySelector("#blogPost");

const openImagePopup = (imageUrl) => {
  const popupContainer = document.createElement("div");
  popupContainer.id = "popup-container";

  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close");
  closeBtn.innerHTML = "&times;";

  const popupImage = document.createElement("img");
  popupImage.src = imageUrl;
  popupImage.alt = "Full Size Image";
  popupImage.classList.add("popup-image");

  popupContainer.appendChild(closeBtn);
  popupContainer.appendChild(popupImage);
  document.body.appendChild(popupContainer);

  closeBtn.addEventListener("click", function () {
    popupContainer.remove();
    document.body.style.overflow = "auto"; // Restore scrolling on the main page
  });

  popupContainer.addEventListener("click", function (event) {
    if (event.target === popupContainer) {
      popupContainer.remove();
      document.body.style.overflow = "auto";
    }
  });
};

const renderBlogPost = (blogpost) => {
  blogPostContainer.innerHTML = "";
  const imageUrl = blogpost.fields["Hero image"][0].url;
  const title = blogpost.fields.Title;
  const text = blogpost.fields.Text;
  const createdDate = new Date(blogpost.createdTime).toLocaleDateString();
  const faviconUrl = blogpost.fields["Favicon"];

  // Update favicon dynamically
  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) {
    favicon.href = faviconUrl;
  } else {
    const newFavicon = document.createElement("link");
    newFavicon.rel = "icon";
    newFavicon.type = "image/png";
    newFavicon.href = faviconUrl;
    document.head.appendChild(newFavicon);
  }

  blogPostContainer.innerHTML = `
    <div class="animate__animated animate__slideInDown">
        <div id="card" class="blog-img details-container">
            <h1 class="h1-details">${title}</h1>
            <img src="${imageUrl}" alt="Illustration of ${title}" class="thumbnail-image">
        </div>
    </div>
        <div class="details-text animate__animated animate__slideInDown">
            <span class="details-span">${createdDate} / By Alex</span>
            <p class="p-details">${text}</p>

    </div>
  `;

  const thumbnailImage = blogPostContainer.querySelector(".thumbnail-image");
  thumbnailImage.addEventListener("click", function () {
    openImagePopup(imageUrl);
    document.body.style.overflow = "hidden"; // Prevent scrolling on the main page
  });
};

const getBlogPost = async () => {
  try {
    const response = await fetch(TABLE_URL, { headers: headers });
    if (response.ok) {
      const data = await response.json();
      const blogpost = data;

      renderBlogPost(blogpost);
    } else {
      blogPostContainer.innerHTML = `We failed to fetch the blog post. Apologies...`;
    }
  } catch (err) {
    blogPostContainer.innerHTML = `We are experiencing technical difficulties.`;
    console.log("An error occurred:", err);
  }
};

getBlogPost();
