const fs = require('fs');


const index = fs.readFileSync(`${__dirname}/../client/index.html`);
const documentation = fs.readFileSync(`${__dirname}/../client/documentation.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const png = fs.readFileSync(`${__dirname}/../client/bookStack.png`);

const getIndex = (response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(index);    
    response.end();
}
const getDocs = (response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(documentation);
    response.end();
}
const getStyle = (response) => {
    response.writeHead(200, { 'Content-Type': 'text/css' });
    response.write(css);
    response.end();
}
const getImage= (response) => {
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.write(png);    
    response.end();
}


module.exports = {
    getIndex,
    getStyle,
    getDocs,
    getImage,
    
}