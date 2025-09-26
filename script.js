const createdTitle = document.getElementById('create-title');
const createdBlog = document.getElementById('create-blog');
const postsDisplay = document.getElementById('display-posts');

let posts = [];

window.addEventListener('load', () => {
    const savedPosts = localStorage.getItem(JSON.parse('savedPosts'))
    if (savedPosts) {
        // render those posts
        posts = savedPosts;
    }
});


function generateRandomPostID() {
    const availableIDs = [];
    for (let i = 0; i <= 10000; i++) {
        availableIDs.push(i);
    }

    return function() {
        if (availableIDs.length === 0) {
            console.log('You have reached the maximum number of posts!');
            alert('You have reached the maximum number of posts!');
            return null;
        }
        const randomIndex = Math.floor(Math.random() * availableIDs.length);
        const randomID = availableIDs[randomIndex];

        availableIDs.splice(randomIndex, 1);

        return randomID;
    };
}

const getPostID = generateRandomPostID();

function renderBlogPost() {
    
    let postObj = {
        title: createdTitle.value,
        blog: createdBlog.value,
        ID: getPostID()
    }

    const postMod = document.createElement('div');

        const postTitle = document.createElement('span');
            postTitle.textContent = createdTitle.value;
        postMod.appendChild(postTitle)

        const postBlog = document.createElement('div');
            postBlog.textContent = createdBlog.value;
        postMod.appendChild(postBlog);

        const editPostbtn = document.createElement('button');
            editPostbtn.textContent = 'edit';
            editPostbtn.classList.add('edit');
        postMod.appendChild(editPostbtn);

        const deletePostBtn = document.createElement('button')
            deletePostBtn.textContent = 'Delete';
            deletePostBtn.classList.add('delete');
        postMod.appendChild(deletePostBtn);

    postsDisplay.appendChild(postMod);
}


