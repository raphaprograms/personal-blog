const createPost = document.getElementById('create-post');
const createdTitle = document.getElementById('create-title');
const createdBlog = document.getElementById('create-blog');
const postsDisplay = document.getElementById('display-posts');
const postButton = document.getElementById('post-button');


let posts = [];
let availableIDs = [];


window.addEventListener('load', () => {
    // load posts from local storage
    try {
        const savedPosts = JSON.parse(localStorage.getItem('savedPosts'));
        if (savedPosts) {
            posts = savedPosts;
            const used = new Set(posts.map(p => Number(p.ID)));
            availableIDs = availableIDs.filter(id => !used.has(id));
            renderAllPosts();
        }
    } catch(e) {
        console.error('error parsing saved posts', e);
    }

    // initialize event listeners after the do is loaded
    initializeEventListeners();
});

(function initializeIDPool() {
    for (let i = 0; i <= 10000; i++) {
        availableIDs.push(i);
    }
})();

function getPostID() {
        if (availableIDs.length === 0) {
            console.log('You have reached the maximum number of posts!');
            alert('You have reached the maximum number of posts!');
            return null;
        }
        const randomIndex = Math.floor(Math.random() * availableIDs.length);
        const randomID = availableIDs.splice(randomIndex, 1)[0];

        return randomID;
}

function validateInput(inputElement, errorSpan, customValidationFunction = null) {
    errorSpan.textContent = '';
    inputElement.setCustomValidity('');
    inputElement.classList.remove('invalid', 'valid');

    if (customValidationFunction) {
        customValidationFunction(inputElement);
    }

    const isValid = inputElement.checkValidity();

    if (!isValid) {
        inputElement.classList.add('invalid');
        errorSpan.textContent = inputElement.validationMessage;
    } else {
        inputElement.classList.add('valid');
    }
    return isValid;
}

function checkTitleValidity(titleInput) {
    if (titleInput.value.trim() === '') {
        titleInput.setCustomValidity("This isn't enough");
    } else {
        titleInput.setCustomValidity('');
    }
}

function checkBlogValidity(blogInput) {
    if (blogInput.value.trim() === '') {
        blogInput.setCustomValidity("This need to be more exciting!");
    } else {
        blogInput.setCustomValidity('');
    }
}

function createPostElement(postObj) {
    const postMod = document.createElement('div');
    postMod.classList.add('post');

        const postTitle = document.createElement('span');
            postTitle.textContent = postObj.title;
        postMod.appendChild(postTitle)

        const postBlog = document.createElement('p');
            postBlog.textContent = postObj.blog;
        postMod.appendChild(postBlog);

        const postTimeStamp = document.createElement('p');
            postTimeStamp.textContent = `${postObj.timestamp}`;
        postMod.appendChild(postTimeStamp);

        const editPostBtn = document.createElement('button');
            editPostBtn.textContent = 'edit';
            editPostBtn.classList.add('edit');
            editPostBtn.dataset.postID = postObj.ID;
        postMod.appendChild(editPostBtn);

        const deletePostBtn = document.createElement('button')
            deletePostBtn.textContent = 'Delete';
            deletePostBtn.classList.add('delete');
            deletePostBtn.dataset.postID = postObj.ID;
        postMod.appendChild(deletePostBtn);
    
    return postMod;

}

function renderAllPosts() {
    postsDisplay.textContent = '';
    posts.forEach(postObj => {
        const blogPost = createPostElement(postObj);
        postsDisplay.appendChild(blogPost);
    });
}

function handleCreatePost() {
    const title = createdTitle.value.trim();
    const blog = createdBlog.value.trim();

    if (title && blog) {
        if (currentlyBeingEditedID !== null) {
            
            const postIndex = posts.findIndex(post => post.ID == currentlyBeingEditedID);
            if (postIndex > -1) {
                posts[postIndex].title = title;
                posts[postIndex].blog = blog; 
                currentlyBeingEditedID = null;
                postButton.textContent = 'Post'
            }
        } else {
        
        const postID = getPostID();
        if (postID !== null) {

            const timestamp = new Date().toLocaleString();
            const postObj = {
                    title: title,
                    blog: blog,
                    timestamp: timestamp,
                    ID: postID
            };
            posts.push(postObj);
        }
    }
    savePostsToLocalStorage();
    renderAllPosts();
    createdTitle.value = '';
    createdBlog.value = '';
    console.log(posts);
    } else {

    }
}

function handleDeletePost(postID) {
    const postIndex = posts.findIndex(post => post.ID == postID);
    if (postIndex > -1) {
        const removedPost = posts.splice(postIndex, 1)[0];
        availableIDs.push(removedPost.ID);
        savePostsToLocalStorage();
        renderAllPosts();
        console.log(`Deleted post with ID: ${postID}`);
    }
}


// function handleEditPost(postID) {
//     const postIndex = posts.findIndex(post => post.ID == postID);
//     if (postIndex > -1) {
//         const postToEdit = posts[postIndex];
//         createdTitle.value = postToEdit.title;
//         createdBlog.value = postToEdit.blog;
       
//         handleDeletePost(postID);
//     }
// }

function handlePostActions(event) {
    const target = event.target;
    const postID = target.dataset.postID;

    if (!postID) {
        return;
    }

    if (target.classList.contains('delete')) {
        handleDeletePost(postID);
    } else if (target.classList.contains('edit')) {
        editPostInPlace(postID);
    }
}

let currentlyBeingEditedID = null;

function editPostInPlace(postID) {
    const postIndex = posts.findIndex(post => post.ID == postID);
    if (postIndex > -1) {
        const postToEdit = posts[postIndex];
        createdTitle.value = postToEdit.title;
        createdBlog.value = postToEdit.blog;
        postButton.textContent = 'Save Edit';
        currentlyBeingEditedID = postID;
    }
}



function savePostsToLocalStorage() {
    localStorage.setItem('savedPosts', JSON.stringify(posts));
}


function initializeEventListeners() {

    postButton.addEventListener('click', handleCreatePost);
    postsDisplay.addEventListener('click', handlePostActions);

    createdTitle.addEventListener('input', () => {
        validateInput(createdTitle, document.getElementById('titleError'), checkTitleValidity);
    });
    createdBlog.addEventListener('input', () => {
        validateInput(createdBlog, document.getElementById('blogError'), checkBlogValidity);
    });
}