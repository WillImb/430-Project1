const fs = require('fs');

let booksJson = fs.readFileSync(`${__dirname}/../data/books.json`);


const handleResponse = () => {

}

const GetAll = (response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(booksJson);
    response.end();
}

module.exports = {
    handleResponse,
    GetAll,
};