const createPost = document.getElementById('create-post');
const createdTitle = document.getElementById('create-title');
const createdBlog = document.getElementById('create-blog');
const postsDisplay = document.getElementById('display-posts');
const postButton = document.getElementById('post-button');


let posts = [];

window.addEventListener('load', () => {
    // const savedPosts = JSON.parse(localStorage.getItem('savedPosts'));
    // if (savedPosts) {
    //     // render those posts
    //     posts = savedPosts;
    // }

    // this could work too
    // try {
    //     savedPosts = JSON.parse(localStorage.getItem('savedPosts'));
    // } catch (e) {
    //     console.error('Error parsing saved posts')
    //     savedPosts = null;
    // }
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
     
    posts.push(postObj);
    

    const postMod = document.createElement('div');

        const postTitle = document.createElement('span');
            postTitle.textContent = createdTitle.value;
        postMod.appendChild(postTitle)

        const postBlog = document.createElement('p');
            postBlog.textContent = createdBlog.value;
        postMod.appendChild(postBlog);

        const editPostBtn = document.createElement('button');
            editPostBtn.textContent = 'edit';
            editPostBtn.classList.add('edit');
        postMod.appendChild(editPostBtn);

        const deletePostBtn = document.createElement('button')
            deletePostBtn.textContent = 'Delete';
            deletePostBtn.classList.add('delete');
        postMod.appendChild(deletePostBtn);

    postsDisplay.appendChild(postMod);

}

postButton.addEventListener('click', (event) => {
    // if (event.target.classList.contains('post-button')) {
    //     localStorage.setItem('savedPosts', JSON.stringify(posts));
    // }
    renderBlogPost();
    console.log(posts);
    createdTitle.value = '';
    createdBlog.value = '';

});
