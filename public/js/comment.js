const newCommentHandler = async (event) => {
    
    console.log("HEY");
    event.preventDefault();
   // const post_id = event.target.getAttribute('id');
    // const post_ID = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#comment-text').value.trim();
    // const post_id = document.querySelector('#comment-id').innerHTML;
    // const content = document.querySelector('#post-content').value.trim();
    console.log("HEY");
    if (event.target.hasAttribute('data-commentid')) {
        const post_id = event.target.getAttribute('data-commentid');
        console.log("HEYas dfafsd");
    console.log(post_id);
    if (post_id && content) {
        
        console.log(post_id)
            const response = await fetch(`/api/comments`, {
                method: 'POST',
                body: JSON.stringify({
                    post_id,
                    content
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log("HEY")
                document.location.reload();
            } else {
                alert('Failed to create post');
            }
        }
    }
};

document
    .querySelector('.new-comment-form')
    .addEventListener('click', newCommentHandler);

// document
//     .querySelector('.post-list')
//     .addEventListener('click', delButtonHandler);

// const newCommentHandler = async a => {
//     console.log("HEY"), a.preventDefault();
//     const b = document.querySelector("#comment-text").value.trim();
//     if (console.log("HEY"), a.target.hasAttribute("data-commentid")) {
//         const c = a.target.getAttribute("data-commentid");
//         if (console.log("HEYas dfafsd"), console.log(c), c && b) {
//             console.log(c);
//             const a = await fetch(`/api/comments`, {
//                 method: "POST",
//                 body: JSON.stringify({
//                     post_id: c,
//                     content: b
//                 }),
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             });
//             a.ok ? (console.log("HEY"), document.location.reload()) : alert("Failed to create post")
//         }
//     }
// };
// document.querySelector(".new-comment-form").addEventListener("click", newCommentHandler);