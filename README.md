# MyReads Project

This is the project for the final assessment "MyReads" for Udacity's React Fundamentals course. A template including a static example of the CSS and HTML markup, provided by Udacity, is used. None of the React code needed to complete the project was provided.

## To Start, In Short

To get started right away:

- install all project dependencies with `npm install`
- start the development server with `npm start`



## What You're Getting

```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for use with the app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for the app. (provided by Udacity)
    ├── App.js # This is the root of the app.
    ├── App.test.js # Used for testing. Provided with Create React App. (provided by Udacity)
    ├── Book.js #React component for a book item
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below. (provided by Udacity)
    ├── Bookwrapper.js # React component that serves as a container for books on shelves
    ├── icons # Helpful images for the app. Use at your discretion. (provided by Udacity)
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. (provided by Udacity)
    ├── index.js # Should not need to modify this file. It is used for DOM rendering only. (provided by Udacity)
    ├── ListSearchBooks.js # React component for searching for books and listing them
    └── Stars.js # React component for showing star rating for a book
```



## Backend Server

To simplify the development process, Udacity provided a backend server to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods needed to perform necessary operations on the backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

- query: `<String>`
- Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
- These books do not know which shelf they are on. They are raw results only. Books have to have the correct state while on the search page.

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).