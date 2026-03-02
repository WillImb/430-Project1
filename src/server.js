const query = require('querystring');
const http = require('http');
const jsonHandler = require('./jsonHandler.js');
const htmlHandler = require('./htmlHandler');



const port = process.env.PORT || process.env.NODE_PORT || 3000;




//parse our data from forms from posts
const parseBody = (request, response, callback) => {
    const body = [];

    request.on('error', (err) => {
        response.statusCode = 400;
        response.end();
    });

    request.on('data', (chunk) => {
        body.push(chunk);
    })

    request.on('end', () => {
        const bodyString = Buffer.concat(body).toString();
        const type = request.headers['content-type'];
        if (type === 'application/x-www-form-urlencoded') {
            request.body = query.parse(bodyString);
        }
        else if (type === 'application/json') {
            request.body = JSON.parse(bodyString);
        }
        else {
            response.writeHead(400, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify({ error: 'invalid data format' }));
            return response.end();
        }

        callback(request,response);

    });

}


const onRequest = (request, response) => {


    const protocol = request.connection.encrypted ? 'https' : 'http';
    const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);


    //big switch that routes user requests
    switch (parsedUrl.pathname) {
        case '/':
            htmlHandler.getIndex(response);
            break;
         case '/bookStack.png':
            htmlHandler.getImage(response);
            break;
         case '/docs':
            htmlHandler.getDocs(response);
            break;
        case '/style.css':
            htmlHandler.getStyle(response);
            break;

        case '/getAll':
            jsonHandler.GetAllBooks(request, response);
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
            parseBody(request, response, jsonHandler.addBook);
            break;
        case '/addRead':
            parseBody(request, response, jsonHandler.addRead);
            break;
        default:
            jsonHandler.nonExistent(request, response);


    }
}





http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
});
