function totalBooksCount(books) {
  //use the .length property in order to get
  //thet total amount of books. 1 book = 1 unit of length
  const bookCount = books.length;
  return bookCount; 
}

function totalAccountsCount(accounts) {
  //Use the length property in order to get the 
  //total number of accounts. 1 account = 1 unit of length
  const totalAccounts = accounts.length
  return totalAccounts;
}

function booksBorrowedCount(books) {
  //create a variable
  //Inside the variable use the filter method that takes in book

  const circulatingBooks = books.filter((book) => {
    //create an array that will add elements to an array
    //every time it checks if a book has been returned or 
    //it is still in circulation 
    const [borrow] = book.borrows;
    //return if borrowed is not return and do the comparion again.
    return !borrow.returned
  });
  //return the length of the circulatingBooks in order to determine 
  //how many books are still in circulation. 
  return circulatingBooks.length; 
}

function getMostCommonGenres(books) {
  //Use the .reduce() method to find the most common genres
  const counter = books.reduce((account, {genre}) => {
    (account[genre]) ? account[genre] += 1 : account[genre] = 1
    return account
  }, {});
  //Use the helper function, send the count variable into the helper function 
  //in order so it can be sorted 
  const sortList = _sortKeys(counter); 
  //Use .map() method in order to print out the list. 
  //Use the slice method in order to trim the list to only the top 5
  //console.log(sortList.map((name) => ({name, count: count[name]})).slice(0, 5));
  return sortList.map((name) => ({name, count: counter[name]})).slice(0, 5);
}



function getMostPopularBooks(books) {
    //Use a reduce in order to loop over the array
    const bookId = books.reduce((accumulator, {id, borrows}) => {
      accumulator[id] = borrows.length;
      return accumulator;
    }, {});
    
    //call the helper function and pass in booksId
    const sorted = _sortKeys(bookId);
    //Once the items are sorted, use map() to create the array with the sorted items
    //the list should only contain the top 5 items in the list -> slice(0,5);
    const orderedList = sorted.map((id) =>{
      let {title: name} = books.find(({id: bookId}) => bookId === id);
      return {name, count: bookId[id]};
    }).slice(0, 5);
    //console.log(orderedList);
    return orderedList;
}

function getMostPopularAuthors(books, authors) {
  //Use the reduce method in order to accumulate the amount of times a book has been borrowed.
  const counter = books.reduce((accumulator, {authorId, borrows}) => {
    (accumulator[authorId]) ? accumulator[authorId].push(borrows.length) : accumulator[authorId] = [borrows.length];
    return accumulator;
  }, {});

  //Use for in loop in order to go over the the properties of counter
  for (let id in counter) {
    const sum = counter[id].reduce((a, b) => a + b);
    counter[id] = sum;
  }

  //pass in the count parameter into the helper function in order 
  //to return a sorted list
  const sorted = _sortKeys(counter);

  //call the map method in order to create an array of authors.
  const authorArray = sorted.map((authorId) => {
    const {name: {first, last}} = authors.find(({id}) => id === parseInt(authorId));
  
    //use strin interpolation and slice method in order to only output top 5;
    const name = `${first} ${last}`;
    return {name, count: counter[authorId]};
  }).slice(0,5);
  // console.log(authorArray); 
  return authorArray;
}

/* HELPER FUNCTION: performs part of a computation of another function.
They are let you reuse computations. In this case we are doing a
helper function that will sort out keys. The _ means that this is a local function
and can only be used on this page. */
  
function _sortKeys(object) {
  const keys = Object.keys(object);
  const sortedKeys = keys.sort((itemA, itemB) => {
    if(object[itemA] > object[itemB]) {
      return -1
    } else if (object[itemA] < object[itemB]) {
      return 1;
    } else {
      return 0;
    }
  });
  return sortedKeys;
}

 
module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
