const baseURL = "http://localhost:3000/posts";

function main() {
  displayPosts();
}
function displayPosts() {
  fetch("http://localhost:3000/posts")
    .then(res => res.json())
    .then(posts => {
      const postList = document.getElementById("post-list");
      postList.innerHTML = "";
      //const sidebar = document.getElementById("sidebar-posts");
      posts.forEach((post) => {
        const postDiv = document.createElement("div");

        postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <small>By: ${post.author}</small><br>
        <button class="delete-btn">Delete</button>
        
        `;

        postList.appendChild(postDiv);
        const deleteBtn = postDiv.querySelector(".delete-btn");
        if (deleteBtn) {
          deleteBtn.addEventListener("click", () => {
            deletePost(post.id);
          });
        } else {
          console.warn("Delete button not found for post:", post);
        }
      });
    });
}
function deletePost(id) {
  fetch(`http://localhost:3000/posts/${id}`, {
    method: "DELETE",
  }).then(res => {
    if (res.ok) {
      displayPosts();
    } else {
      alert("Failed to delete post");
    }
  });
}
function handlePostClick(postId) {
  fetch(`${baseURL}/${postId}`)
    .then((res) => res.json())
    .then((post) => {
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
      .then((res) => res.json())
      .then(() => {
        form.reset();
        displayPosts();
      })
      .catch((error) => console.error("Error adding post:", error));
  });
}
document.addEventListener("DOMContentLoaded", () => {
  displayPosts();
  addNewPostListener();
});

