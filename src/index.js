import http from 'http';
const hostname = '127.0.0.1';
const port = 3000;

const items = [
  {id: 1, name: 'Item1'},
  {id: 2, name: 'Item2'},
];

const server = http.createServer((req, res) => {
  console.log(`HTTP Request: ${req.method} ${req.url}`);
  // Root endpoint
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'Server is running'}));
    // GET all items
  } else if (req.method === 'GET' && req.url === '/items') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(items));
    // GET item by id
  } else if (req.method === 'GET' && req.url.split('/')[1] === 'items') {
    const requestedId = req.url.split('/')[2];
    // Use requested id to find item from items array and add it to the response
    // Response 404 if object with requested id is not found
    const item = items.find((item) => item.id === parseInt(requestedId));
    if (item) {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(item));
    } else {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({error: `Item with id ${requestedId} not found`}));
    }
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
    // PUT update item by id
  } else if (req.method === 'PUT' && req.url.startsWith('/items/')) {
    const id = parseInt(req.url.split('/')[2]);
    let body = [];

    req
      .on('data', (chunk) => body.push(chunk))
      .on('end', () => {
        body = Buffer.concat(body).toString();
        let updatedItem = JSON.parse(body);

        try {
          updatedItem = JSON.parse(body);
        } catch (err) {
          console.error(err);
          res.writeHead(400, {'Content-Type': 'application/json'});
          return res.end(JSON.stringify({error: 'Invalid JSON'}));
        }

        const item = items.find((i) => i.id === id);

        if (item) {
          item.name = updatedItem.name || item.name;
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(item));
        } else {
          res.writeHead(404, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({error: `Item with id ${id} not found`}));
        }
      });
    // DELETE item by id
  } else if (req.method === 'DELETE' && req.url.startsWith('/items/')) {
    const id = parseInt(req.url.split('/')[2]);
    const itemIndex = items.findIndex((i) => i.id === id);

    if (itemIndex !== -1) {
      items.splice(itemIndex, 1);
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({error: `Item with id ${id} not found`}));
    }
    // GET number of items
  } else if (req.method === 'GET' && req.url === '/stats') {
    const totalItems = items.length;
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({totalItems}));
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
