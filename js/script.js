const searchField = document.getElementById("search-box");
const numberOfBook = document.getElementById("total-result");
const errorMessage = document.getElementById("error-message");
const bookContainer = document.getElementById("book-container");


/* load data from API */
const loadBook = () => {
    const searchText = searchField.value;
    if (searchText === '') {
        /* errom message */
        errorMessage.innerHTML = ` <h3 class="text-center text-danger">Please Write Your Book Name!!!</h3> `;
        bookContainer.textContent = '';
        numberOfBook.textContent = '';
        displaySpinner('none');
    } 
  else {
        fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then((res) => res.json())
        .then((data) => displayData(data));
        displaySpinner("block");
    }
    /* clear input value */
    searchField.value = '';
};

/* display data */
const displayData = (data) => {
    const books = data.docs.slice(0, 30);

    /* display number of data available */
    numberOfBook.innerHTML = `<h5>Total ${data.numFound} results found</h5>`;
    bookContainer.textContent = '';

    /* error message */
    if (books.length === 0) {
        errorMessage.innerHTML = `<h3 class="text-center text-danger">No Result Found!!!</h3> `;
        numberOfBook.textContent = '';
        displaySpinner("none");
    } 
    else {
        books.forEach((book) => {
        errorMessage.textContent = '';
        const bookDiv = document.createElement("div");
        bookDiv.innerHTML = `
            <div class="card overflow-hidden shadow-lg rounded-3">
                <img src='https://covers.openlibrary.org/b/id/${
                  book.cover_i ? book.cover_i : 10909258
                }-M.jpg' 
                class="display-img img-fluid" alt="..."/>
                <div class="card-body">
                    <h5 class="fw-bold">${book.title}</h5>
                    <p class="">
                    <span class="fw-bold">Author: </span> ${
                      book.author_name ? book.author_name[0] : ''
                    }
                    </p>
                    <p class="card-text">
                        <span class="fw-bold"> First Published: </span>
                        ${book.first_publish_year ? book.first_publish_year : ""}
                    </p>
                    <p class="card-text">
                        <span class="fw-bold">Publisher :</span>
                    ${book.publisher ? book.publisher : ''} 
                    </p>
                </div>
            </div>
            `;
        bookContainer.appendChild(bookDiv);
    });
    displaySpinner('none');
    } 
};

/* display spinner */
const displaySpinner = (value) => {
    const spinner = document.getElementById("spinner");
    spinner.style.display = value;
};