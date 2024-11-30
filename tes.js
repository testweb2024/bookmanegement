document.getElementById('book-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const year = document.getElementById('bookYear').value.trim();
    const quanity = document.getElementById('bookQuanity').value.trim();

    if (title && author && year && quanity) {
        const table = document.getElementById('book-list');
        const row = table.insertRow();

        row.innerHTML = `
            <td>${title}</td>
            <td>${author}</td>
            <td>${year}</td>
            <td>${quanity}</td>
            <td>
                <button class="btn btn-info btn-sm review-btn">Review</button>
                <button class="btn btn-warning btn-sm edit-btn">Edit</button>
                <button class="btn btn-danger btn-sm delete-btn">Delete</button>
            </td>
        `;

        // Clear form
        document.getElementById('book-form').reset();

        Swal.fire({
            icon: 'success',
            title: 'Book Added',
            text: `${title} has been added successfully!`,
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Incomplete Form',
            text: 'Please fill in all fields.',
        });
    }
});
document.getElementById('book-list').addEventListener('click', function (e) {
    if (e.target.classList.contains('review-btn')) {
        const row = e.target.parentElement.parentElement;
        const title = row.cells[0].textContent;
        const author = row.cells[1].textContent;
        const year = row.cells[2].textContent;
        const quanity = row.cells[3].textContent;

        Swal.fire({
            title: 'Book Details',
            html: `
                <strong>Title:</strong> ${title}<br>
                <strong>Author:</strong> ${author}<br>
                <strong>Year:</strong> ${year}<br>
                <strong>Quanity:</strong> ${quanity}
            `,
            icon: 'info',
        });
    }
});
document.getElementById('book-list').addEventListener('click', function (e) {
    if (e.target.classList.contains('edit-btn')) {
        const row = e.target.parentElement.parentElement;

        // Enable editing
        row.contentEditable = true;

        // Change the button text
        e.target.textContent = 'edit book';
        e.target.classList.remove('btn-warning');
        e.target.classList.add('btn-success');
        e.target.classList.add('save-btn');
        e.target.classList.remove('edit-btn');
    } else if (e.target.classList.contains('save-btn')) {
        const row = e.target.parentElement.parentElement;

        // Disable editing
        row.contentEditable = false;

        // Change the button back to Edit
        e.target.textContent = 'Edit';
        e.target.classList.remove('btn-success');
        e.target.classList.add('btn-warning');
        e.target.classList.add('edit-btn');
        e.target.classList.remove('save-btn');

        Swal.fire({
            icon: 'success',
            title: 'Changes Saved',
            text: 'The book details have been updated.',
        });
    }
});
document.getElementById('book-list').addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
        const row = e.target.parentElement.parentElement;
        const title = row.cells[0].textContent;

        Swal.fire({
            title: `Are you sure you want to delete "${title}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                row.remove();
                Swal.fire('Deleted!', `${title} has been deleted.`, 'success');
            }
        });
    }
});
document.getElementById('book-list').addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
        const row = e.target.parentElement.parentElement;
        const title = row.cells[0].textContent;

        Swal.fire({
            title: `Are you sure you want to delete "${title}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                row.remove();
                Swal.fire('Deleted!', `${title} has been deleted.`, 'success');
            }
        });
    }
});
document.getElementById('searchButton').addEventListener('click', function () {
    const title = document.getElementById('searchTitle').value.trim().toLowerCase();
    const author = document.getElementById('searchAuthor').value.trim().toLowerCase();
    const year = document.getElementById('searchYear').value.trim();
    const quanity = document.getElementById('searchQuanity').value.trim();

    const rows = document.querySelectorAll('#book-list tr');

    rows.forEach(row => {
        const rowTitle = row.cells[0].textContent.toLowerCase();
        const rowAuthor = row.cells[1].textContent.toLowerCase();
        const rowYear = row.cells[2].textContent;
        const rowQuanity = row.cells[3].textContent;

        const matchesTitle = !title || rowTitle.includes(title);
        const matchesAuthor = !author || rowAuthor.includes(author);
        const matchesYear = !year || rowYear === year;
        const matchesQuanity = !quanity || rowQuanity === quanity;

        if (matchesTitle && matchesAuthor && matchesYear && matchesQuanity) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});
document.querySelector('.btn-warning').addEventListener('click', function () {
    Swal.fire({
        title: 'Are you sure?',
        text: 'This will clear all books from the list.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, clear all!',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById('book-list').innerHTML = '';
            Swal.fire('Cleared!', 'All books have been removed.', 'success');
        }
    });
});
document.getElementById('logout-btn').addEventListener('click', function () {
    Swal.fire({
        title: 'Are you sure you want to log out?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Log Out',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Logged Out!', 'You have been logged out.', 'success').then(() => {
                // Redirect to another page or clear session
                window.location.reload();
            });
        }
    });
});
