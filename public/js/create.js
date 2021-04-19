const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const summary = document.querySelector('#post-summary').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (title && summary && content) {
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                summary,
                content
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create post');
        }
    }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);