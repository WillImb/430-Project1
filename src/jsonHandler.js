const fs = require('fs');
const url = require('url');
const { request } = require('http');

let booksJson = JSON.parse(fs.readFileSync(`${__dirname}/../data/books.json`));


//get alll book objects
const GetAllBooks = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(booksJson));
    response.end();
}


//gets all of the book titles
const GetBookTitles = (request, response) => {

    let titleJson = {};

    for (let i = 0; i < booksJson.length; i++) {
        titleJson[i] = booksJson[i].title;
    }

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(titleJson));
    response.end();
}

//Get all the books by a specified author
const GetBooksByAuthor = (request, response) => {

    let book = url.parse(request.url, true).query;



    for (let i = 0; i < booksJson.length; i++) {
        if (booksJson[i].title == book.title) {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify(booksJson[i]));
            response.end();
            return;
        }
    }

    response.writeHead(400, { 'Content-Type': 'application/json' });
    response.write("Book Not Found");
    response.end();


}

//get book by user specified title

const GetBook = (request, response) => {

    let book = url.parse(request.url, true).query;



    for (let i = 0; i < booksJson.length; i++) {
        if (booksJson[i].title == book.title) {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify(booksJson[i]));
            response.end();
            return;
        }
    }

    response.writeHead(400, { 'Content-Type': 'application/json' });
    response.write("Book Not Found");
    response.end();



}


const nonExistent = (request, response) => {
    let body = JSON.stringify({
        message: "Error Endpoint does not exist",
    });

    response.writeHead(404, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body, 'utf8')

    });
    response.write(body);
    response.end();
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
    nonExistent,
    AddBook,
    AddRead,

};