import http from 'http';
const hostname = '127.0.0.1';
const port = 3000;

const items = [
  {id: 1, name: 'Item1'},
  {id: 2, name: 'Item2'},
];

const server = http.createServer((req, res) => {
  console.log(`HTTP Request: ${req.method} ${req.url}`);

  // GET all items
  if (req.method === 'GET' && req.url === '/items') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(items));
    // GET item by id
  } else if (req.method === 'GET' && req.url.split('/')[1] === 'items') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    const requestedId = req.url.split('/')[2];
    //TODO: use requested id to find item from items array and add it to the response
    //TODO2: response 404 if object with requested id is not found
    res.end('{"requestedId": ' + requestedId + '}');
    // POST new item
  } else if (req.method === 'POST' && req.url === '/items') {
    let body = [];
    req
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        // at this point, `body` has the entire request body stored in it as a string
        console.log('req body', body);
        const newItem = JSON.parse(body);
        // check latest item ID and add 1
        newItem.id = items[items.length - 1].id + 1;
        items.push(newItem);
        res.statusCode = 201;
        res.end();
      });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
