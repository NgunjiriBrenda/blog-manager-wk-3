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
        postList.innerHTML += `
        <div data-id ="${post.id}">
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <small>By: ${post.author}</small
        <button onclick="deletePost(${post.id})">Delete</button>
        </div>
        `;

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
function addNewPostListener() {
  const form = document.getElementById("new-post-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = form.title.value;
    const content = form.content.value;
    const author = form.author.value;

    const newPost = {
      title,
      content,
      author,
    };
    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then(res => res.json())
      .then(() => {
        form.reset();
        displayPosts();
      })
      .catch((error) => console.error("Error adding post:", error));
  });
}
document.addEventListener("DOMContentLoaded",() => {
  displayPosts();
  addNewPostListener();
});

// function deletePost(id) {
//   fetch(`http://localhost:3000/posts/${id}`, {
//     method: "DELETE",
//   })
//     .then(res => {
//       if (res.ok) {
//         displayPosts();
//       } else {
//         alert("Failed to delete post. ");
//       }
//     })
//     .catch((errr) => {
//       console.error("Error:", err);
//     });
// }
// document.addEventListener("DOMContentLoaded", () => {
//   displayPosts();
// });
