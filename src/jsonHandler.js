const fs = require('fs');

let booksJson = fs.readFileSync(`${__dirname}/../data/books.json`);


//get alll book objects
const GetAllBooks = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(booksJson);
    response.end();
}


//gets all of the book titles
const GetBookTitles = (request, response) => {
    
    let titleJson = {};

    for(let i = 0; i < booksJson.length; i++){
        titleJson[i] = booksJson[i].title;
    }

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(titleJson);
    response.end();
}

//Get all the books by a specified author
const GetBooksByAuthor = (request, response, author) => {

    let authorJson = {};

    for(let i = 0; i < booksJson.length; i++){
        if(booksJson[i].author == author){
            authorJson[authorJson.length] = booksJson[i];
        }
    }

}

//get book by user specified title
const GetBook = (request, response, bookName) => {
    let book = {};

    for(let i = 0; i < booksJson.length; i++){
        if(booksJson[i].title == bookName){
            authorJson[authorJson.length] = booksJson[i];
        }
    }
}

module.exports = {
    handleResponse,
    GetAllBooks,
    GetBookTitles,
    GetBooksByAuthor,
    GetBook,

};