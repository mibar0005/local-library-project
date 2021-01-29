function findAuthorById(authors, id) {
  //Use the find() method, pass the author parameter
  //see if authors.id equals id
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  //Use find() method again, pass in the books parameter
  //see if the book id matches the id we are looking for 
  //Remember: the argument is book, not books!
  return books.find((book) => book.id == id);
}

function partitionBooksByBorrowedStatus(books) {

  const circulatingBooks = books.reduce((accumulator, book) => {
    //set an accumulator 
    let [borrowed, returned] = accumulator;
    let recent = book.borrows[0];
    //ternary operator to determine category where to push the book.
    (recent.returned) ? returned.push(book) : borrowed.push(book);

    return accumulator;
  //We are returning an array of arrays [[borrowed],[returned]]
  }, [[],[]] );

  return circulatingBooks;
}



function getBorrowersForBook(book, accounts) {

  const accountNumber = accounts.reduce((accumulator, account) => {
    accumulator[account.id] = account;
    //console.log(accumulator);
    return accumulator;
  }, {});
  //Use the spread operator ... in order to display the accounts id's
  //Use the slice method in order to limit the list to 10 instead of 11
  //.slice([start], [end])
  const result = book.borrows.map(({id, returned}) => ({...accountNumber[id], returned,})).slice(0, 10);
  //console.log(result);
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
