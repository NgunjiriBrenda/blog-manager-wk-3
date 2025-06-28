const baseURL = "http://localhost:3000/posts";

function main() {
  displayPosts();
}
function displayPosts() {
  fetch(baseURL)
    .then(res => res.json())
    .then(posts => {
      console.log("Fetched ppsts:", posts);
      const postList = document.getElementById("post-list");
      postList.innerHTML = "";
      //const sidebar = document.getElementById("sidebar-posts");
      posts.forEach((post) => {
        const postDiv = document.createElement("div");
        postDiv.textContent = post.title;
        postDiv.addEventListener("click", () => handlePostClick(post.id));

        postList.appendChild(postDiv);
      });
    });
}
function handlePostClick(postId) {
  fetch(`${baseURL}/${postId}`)
    .then(res => res.json())
    .then(post => {
      console.log("Post fetched:", post);
      document.getElementById("post-title").textContent = post.title;
      document.getElementById("post-content").textContent = post.content;
      document.getElementById("post-author").textContent = `By: ${post.author}`;
    });
}

document.addEventListener("DOMContentLoaded", main);
