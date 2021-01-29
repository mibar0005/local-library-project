function findAccountById(accounts, id) {
  //Use the find method in order to see if the if the 
  //account id matches the id we are looking for then return.
  const accountId = accounts.find(account => account.id === id);
  return accountId;
}

function sortAccountsByLastName(accounts) {
  //Create a function expressions, use the sort method
  //Remember that for the sort methos it takes two parameters [0], [1]
  const sortBySurname = accounts.sort((firstAcc, secondAcc) => {
    //declare a variable, access the last name of the first parameter 
    //and use the toLowerCase() method in order to properly sort the names 
    //because the ASCII values are different between upper case and lowercase characters.
    let firstSurname = firstAcc.name.last.toLowerCase();
    let secondSurname = secondAcc.name.last.toLowerCase();

    //if statement that compares two elements and changes their 
    //position order in a list.
    if (firstSurname > secondSurname) {
      return 1
    } else {
      return -1
    };
  });
  //Return the sorted list
  return sortBySurname; 
}

function numberOfBorrows(account, books) {

  const timesBorrowed = books.reduce((accumulator, book) => {
    const currentCount = book.borrows.reduce((borrowAccumulator, borrow) => {
      //if statement to see if the id's match one another. 
      //If they match add 1 to borrowAccumulator
      if (borrow.id === account.id){
        return borrowAccumulator + 1
      } else {
        return borrowAccumulator;
      }
    }, 0);
    
    return accumulator + currentCount;
  }, 0);
  
  // console.log(timesBorrowed);
  return timesBorrowed;
}

function getBooksPossessedByAccount(account, books, authors) {
  //should return all books taken out by an account with the author embedded
  //need to use two methods. filter() in order to go through the array and find matches
  const totalBooks = books.filter((book) => {
    //we need to get first item on the list so we use index 0
    const borrowCount = book.borrows[0];
    return (!borrowCount.returned && borrowCount.id === account.id);
    //chain the .map() method in order to print all the array items from the filter array.
  }).map((book) => {
    let author = authors.find((author) => author.id === book.authorId);
    //Use the spead operator for book
    // console.log({...book, author});
    return {...book, author}
  });
  return totalBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
