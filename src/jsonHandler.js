const strict = require('assert/strict');
const fs = require('fs');
const { json } = require('stream/consumers');
const url = require('url');


let booksJson = JSON.parse(fs.readFileSync(`${__dirname}/../data/books.json`));


//get all book objects
const GetAllBooks = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(booksJson), 'utf8')
    });

    if (request.method == 'GET') {
        response.write(JSON.stringify(booksJson));
    }
    response.end();
}


//gets all of the book titles
const GetBookTitles = (request, response) => {

    let titleJson = [];

    for (let i = 0; i < booksJson.length; i++) {
        titleJson.push(booksJson[i].title);
    }

    response.writeHead(200,
        {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(titleJson), 'utf8')
        });
    response.write(JSON.stringify(titleJson));
    response.end();
}

//Get all the books by a specified author
const GetBooksByAuthor = (request, response) => {

    let content;
    let params = url.parse(request.url, true).query;

    //return 400 if no author is entered
    if(params.author == ''){
        content = JSON.stringify({error:"No Author Entered"});
        response.writeHead(400, {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(content, 'utf8')
        });
        response.write(content);
        response.end();
        return;
    }

    let books = [];

    for (let i = 0; i < booksJson.length; i++) {
        if (booksJson[i].author == params.author) {
            books.push(booksJson[i]);
        }
    }

    content = books;

    if (books.length > 0) {
        content = JSON.stringify(books);

        response.writeHead(200,
            {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(content, 'utf8')
            });
        response.write(content);
        response.end();
    }
    else {

        //return 404 if no books were found 
        content = JSON.stringify({error:"No Books Found"});
        response.writeHead(404, {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(content, 'utf8')
        });
        response.write(content);
        response.end();
    }


}

//get book by user specified title

const GetBook = (request, response) => {

    let book = url.parse(request.url, true).query;

    let content = JSON.stringify({error:"Book Not Found"});

    //if no title was entered into search bar
    if(book.title == ''){
        content = JSON.stringify({error:"No Title Entered"});
        response.writeHead(400, {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(content, 'utf8')
        });
        response.write(content);
        response.end();
        return;
    }

    //loop through books json
    for (let i = 0; i < booksJson.length; i++) {
        if (booksJson[i].title == book.title) {
            content = JSON.stringify(booksJson[i]);

            response.writeHead(200, {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(content, 'utf8')
            });
            response.write(content);
            response.end();
            return;
        }
    }
    //if no book was found throw 404

    response.writeHead(404, {
        'Content-Type': 'application/json'
        , 'Content-Length': Buffer.byteLength(content, 'utf8')
    });
    response.write(content);
    response.end();


}

//our 404 error
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


//Post Request Methods

const addBook = (request, response) => {

    let content = JSON.stringify({message:"Book Updated"});

    if(request.body.title == '' || request.body.author == ''){
        content = JSON.stringify({error:"One or more parameters missing"});
        response.writeHead(400, {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(content, 'utf8')
        });
        response.write(content);
        response.end();
        return;
    }

    for (let i = 0; i < booksJson.length; i++) {
        if (booksJson[i].title === request.body.title) {

            booksJson[i] = request.body;
            response.writeHead(204, {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(content, 'utf8')
            });
            response.write(content);
            response.end();
            return;
        }
    }

    content = JSON.stringify({message:"Book Added"});
    booksJson.push(request.body);
    response.writeHead(201, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(content, 'utf8')
    });
    response.write(content);
    response.end();
}

// Add/update the read status
const addRead = (request, response) => {

    let content = JSON.stringify({message:"Book Read Status Updated"});

    if(request.body.title == ''){
        content = JSON.stringify({error:"No Title Entered"});
        response.writeHead(400, {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(content, 'utf8')
        });
        response.write(content);
        response.end();
        return;
    }

    for (let i = 0; i < booksJson.length; i++) {
        if (booksJson[i].title === request.body.title) {

            booksJson[i].readStatus = request.body.status;
            response.writeHead(200, {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(content, 'utf8')
            });
            response.write(content);
            response.end();
            return;
        }
    }
    content = JSON.stringify({error:"Book Not Found"});
    response.writeHead(404, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(content, 'utf8')
    });
    response.write(content);
    response.end();
}




module.exports = {
    GetAllBooks,
    GetBookTitles,
    GetBooksByAuthor,
    GetBook,
    nonExistent,
    addBook,
    addRead,

};