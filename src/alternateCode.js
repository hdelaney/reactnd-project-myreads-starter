  handleChange (selected, newshelf, id, prevBooks) {
    const selectedBook = selected;
    let pushBook = false;
    let updatedBooks = '';


    if (newshelf === 'none') {
      updatedBooks = prevBooks.filter((pbook) => (
        pbook.id !== id
      ))
    } else {
      updatedBooks = prevBooks.map((pbook) => {

        //the mapped book doesn't match the id, and the mapped book has a shelf
        if(pbook.id !== id && selectedBook.shelf) return pbook;

        //the mapped book matches the id, and the selected book had no shelf or has a 'none' value
        // Needs to be added to state
        if(pbook.id === id && (selectedBook.shelf === 'none' || !!selectedBook.shelf)) {
          selectedBook.shelf = newshelf;
          pushBook = true;
        }

        //the mapped book matches the id, and the matched book has a shelf
        if(pbook.id === id && selectedBook.shelf !== 'none') {
          pbook.shelf = newshelf;
        }
        return pbook;
      });
    }


    if (pushBook === false) {
      this.updateState(updatedBooks);
    }

    if (pushBook === true) {
      prevBooks.push(selectedBook);
      this.updateState(prevBooks);
    }
    BooksAPI.update(selected, newshelf);
    console.log(selected);
  }
