const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const FILES_DIR = path.join(__dirname, 'files');

// Create files directory if it doesn't exist
if (!fs.existsSync(FILES_DIR)) {
    fs.mkdirSync(FILES_DIR);
}

const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    const filePath = path.join(FILES_DIR, url.pathname.slice(1));

    // Ensure the file path is within the files directory
    if (!filePath.startsWith(FILES_DIR)) {
        res.writeHead(403);
        res.end('Access denied');
        return;
    }

    switch (req.method) {
        case 'GET':
            if (url.pathname === '/') {
                // List all files
                fs.readdir(FILES_DIR, (err, files) => {
                    if (err) {
                        res.writeHead(500);
                        res.end('Error reading directory');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(files));
                });
            } else {
                // Read specific file
                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        res.writeHead(404);
                        res.end('File not found');
                        return;
                    }
                    res.writeHead(200);
                    res.end(data);
                });
            }
            break;

        case 'POST':
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                fs.writeFile(filePath, body, err => {
                    if (err) {
                        res.writeHead(500);
                        res.end('Error creating file');
                        return;
                    }
                    res.writeHead(201);
                    res.end('File created successfully');
                });
            });
            break;

        case 'DELETE':
            fs.unlink(filePath, err => {
                if (err) {
                    res.writeHead(404);
                    res.end('File not found');
                    return;
                }
                res.writeHead(200);
                res.end('File deleted successfully');
            });
            break;

        default:
            res.writeHead(405);
            res.end('Method not allowed');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
}); 