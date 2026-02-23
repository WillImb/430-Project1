const fs = require('fs');
const http = require('http');
const jsonHandler = require('./jsonHandler.js');


const port = process.env.PORT || process.env.NODE_PORT || 3000;

const index = fs.readFileSync(`${__dirname}/../client/index.html`);
const css = fs.readFileSync(`${__dirname}/../client/styles.css`);

const onRequest = (request, response) => {


    const protocol = request.connection.encrypted ? 'https' : 'http';
    const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);


    switch (parsedUrl.pathname) {
        case '/':
            getIndex(response);
            break;
        case '/style':
            getStyle(response);
            break;

        case '/getAll':
            jsonHandler.GetAllBooks(request,response);
            break;

        case '/getTitles':
            jsonHandler.GetBookTitles(request, response);
            break;

        case '/getBooksByAuthor':
            jsonHandler.GetBooksByAuthor(request, response);
            break;
        case '/getBook':
            jsonHandler.GetBook(request, response);
            break;
        case '/addBook':
            jsonHandler.AddBook(request, response);
            break;
        case '/addRead':
            jsonHandler.AddRead(request, response);
            break;
        
         
    }
}

const getIndex = (response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(index);
    response.end();
}
const getStyle = (response) => {
    response.writeHead(200, { 'Content-Type': 'text/css' });
    response.write(css);
    response.end();
}



http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
});
