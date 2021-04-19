const updateFormHandler = async (event) => {
event.preventDefault();
console.log("HEY");
const title = document.querySelector('#post-title').value.trim();
const summary = document.querySelector('#post-summary').value.trim();
const content = document.querySelector('#post-content').value.trim();

    if (event.target.hasAttribute('data-updateid')) {
        const id = event.target.getAttribute('data-updateid');
        if (title && summary && content) {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    id,
                    title,
                    summary,
                    content
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('DONE!');
               document.location.replace('/profile');
            } else {
                alert('Failed to create post');
            }
        }
    }
};

document
    .querySelector('.update-form')
    .addEventListener('click', updateFormHandler);