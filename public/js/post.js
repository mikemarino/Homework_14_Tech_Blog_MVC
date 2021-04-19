

// const delButtonHandler = async (event) => {
//   if (event.currentTarget.hasAttribute('data-id')) {
//     const id = event.currentTarget.getAttribute('data-id');

//     const response = await fetch(`/api/posts/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert('Failed to delete post');
//     }
//   }
// };

// document
//   .querySelector('.new-post-form')
//   .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.post-list')
//   .addEventListener('click', delButtonHandler);




const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-delete')) {
    const id = event.target.getAttribute('data-delete');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  }
};


console.log('Hey');
document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);