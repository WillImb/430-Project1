const fs = require('fs');
const { request } = require('http');

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
const GetBooksByAuthor = (request, response) => {

    let authorJson = {};

    for(let i = 0; i < booksJson.length; i++){
        if(booksJson[i].author == request.body.author){
            authorJson[authorJson.length] = booksJson[i];
        }
    }

}

//get book by user specified title
const GetBook = (request, response) => {
    let book = {};

    for(let i = 0; i < booksJson.length; i++){
        if(booksJson[i].title == request.body.bookName){
            authorJson[authorJson.length] = booksJson[i];
        }
    }
}

const AddBook = (request, response) => {
    booksJson[booksJson] = request.body;
}
const AddRead = () => {
    booksJson[request.body.book].read = "true";
}


module.exports = {
    GetAllBooks,
    GetBookTitles,
    GetBooksByAuthor,
    GetBook,
    AddBook,
    AddRead,

};